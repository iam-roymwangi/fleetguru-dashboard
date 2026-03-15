'use client'

import { useState, useMemo } from 'react'
import { upcomingServices } from '@/lib/upcomingServicesData'
import { ServiceTimeline } from '@/components/ServiceTimeline'
import { ServiceFilters } from '@/components/ServiceFilters'
import { ServicesSummary } from '@/components/ServicesSummary'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench, Calendar, ChevronRight, ChevronLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { exportToExcel } from '@/lib/exportToExcel'

const ITEMS_PER_PAGE = 5

export default function UpcomingServicesPage() {
    const [filters, setFilters] = useState({
        priority: [] as string[],
        status: [] as string[],
        serviceType: [] as string[],
        dateRange: 'all',
    })

    const filteredServices = useMemo(() => {
        return upcomingServices.filter((service) => {
            if (filters.priority.length > 0 && !filters.priority.includes(service.priority)) {
                return false
            }
            if (filters.status.length > 0 && !filters.status.includes(service.status)) {
                return false
            }
            if (filters.serviceType.length > 0 && !filters.serviceType.includes(service.serviceType)) {
                return false
            }

            // Date range filtering
            if (filters.dateRange !== 'all') {
                const daysUntilDue = service.daysUntilDue
                switch (filters.dateRange) {
                    case 'week':
                        if (daysUntilDue > 7) return false
                        break
                    case 'month':
                        if (daysUntilDue > 30) return false
                        break
                    case 'quarter':
                        if (daysUntilDue > 90) return false
                        break
                }
            }

            return true
        })
    }, [filters])

    // Sort by priority and days until due
    const sortedServices = useMemo(() => {
        const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
        return [...filteredServices].sort((a, b) => {
            const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
            if (priorityDiff !== 0) return priorityDiff
            return a.daysUntilDue - b.daysUntilDue
        })
    }, [filteredServices])

    const [currentPage, setCurrentPage] = useState(1)

    const handleExport = () => {
        const data = sortedServices.map(s => ({
            'Vehicle': s.vehicleName,
            'Service Name': s.serviceName,
            'Service Type': s.serviceType,
            'Due Date': s.dueDate,
            'Days Until Due': s.daysUntilDue,
            'Priority': s.priority,
            'Status': s.status,
            'Estimated Cost ($)': s.estimatedCost,
            'Assigned Technician': s.assignedTechnician ?? '',
            'Notes': s.notes ?? '',
        }))
        exportToExcel(data, 'upcoming-services-report', 'Services')
    }

    // Reset pagination when filters change
    useMemo(() => {
        setCurrentPage(1)
    }, [filters])

    const totalPages = Math.ceil(sortedServices.length / ITEMS_PER_PAGE)
    const paginatedServices = sortedServices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className="w-full bg-background min-h-screen">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur border-b border-border sticky top-0 z-10 px-6 py-4">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 border border-primary/30 rounded-lg">
                                <Wrench className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                {/* Breadcrumbs */}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1 mt-1">
                                    <Link href="/reports" className="hover:text-foreground transition-colors">Reports</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-foreground font-medium">Upcoming Services</span>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground">Upcoming Services</h1>
                                <p className="text-sm text-muted-foreground mt-1">Manage and track vehicle maintenance schedules</p>
                            </div>
                        </div>
                        <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 gap-2">
                            <Download className="w-4 h-4" />
                            Export to Excel
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 max-w-[1600px] mx-auto">
                {/* Summary Cards */}
                <div className="mb-8">
                    <ServicesSummary services={upcomingServices} />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 xl:col-span-1">
                        <div className="sticky top-24">
                            <ServiceFilters onFilterChange={setFilters} />
                        </div>
                    </div>

                    {/* Services List */}
                    <div className="lg:col-span-3 xl:col-span-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground">Services</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {sortedServices.length} of {upcomingServices.length} services
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            {paginatedServices.length > 0 ? (
                                <div className="space-y-4">
                                    <ServiceTimeline services={paginatedServices} />

                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between pt-4 mt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="bg-card text-foreground"
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-1" />
                                                Previous
                                            </Button>
                                            <span className="text-xs text-muted-foreground">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="bg-card text-foreground"
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Card className="p-12 border-border bg-card text-center">
                                    <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">No services found</h3>
                                    <p className="text-sm text-muted-foreground">Try adjusting your filters to see more services</p>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
