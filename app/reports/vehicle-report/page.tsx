'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { vehicles, Vehicle } from '@/lib/vehicleData'
import { VehicleCard } from '@/components/VehicleCard'
import { VehicleAnalytics } from '@/components/VehicleAnalytics'
import { VehicleDetails } from '@/components/VehicleDetails'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Search, Download, Filter, ChevronRight, ChevronLeft } from 'lucide-react'

const ITEMS_PER_PAGE = 5

export default function VehicleReportPage() {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[0])
    const [searchQuery, setSearchQuery] = useState('')
    const [fuelTypeFilter, setFuelTypeFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)

    const fuelTypes = Array.from(new Set(vehicles.map((v) => v.fuelType)))
    const statuses = Array.from(new Set(vehicles.map((v) => v.vehicleStatus)))

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            const matchesSearch =
                vehicle.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.licensePlate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesFuel = fuelTypeFilter === 'all' || vehicle.fuelType === fuelTypeFilter
            const matchesStatus = statusFilter === 'all' || vehicle.vehicleStatus === statusFilter

            return matchesSearch && matchesFuel && matchesStatus
        })
    }, [searchQuery, fuelTypeFilter, statusFilter])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, fuelTypeFilter, statusFilter])

    const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE)
    const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className="w-full bg-background min-h-screen">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur border-b border-border sticky top-0 z-10 px-6 py-4">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Link href="/reports" className="hover:text-foreground transition-colors">Reports</Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-foreground font-medium">Vehicle Report</span>
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Vehicle Report</h1>
                            <p className="text-muted-foreground text-sm mt-1">Comprehensive fleet vehicle analytics and details</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <Button className="bg-primary hover:bg-primary/90 gap-2">
                                <Download className="w-4 h-4" />
                                Export Report
                            </Button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search by name, license plate, make, or model..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground w-full"
                                />
                            </div>
                            <Button
                                variant={showFilters ? "default" : "outline"}
                                onClick={() => setShowFilters(!showFilters)}
                                className={`shrink-0 ${!showFilters ? 'bg-card text-foreground border-border' : ''}`}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                        </div>

                        {showFilters && (
                            <div className="flex gap-3 flex-wrap p-4 bg-muted/20 border border-border rounded-lg animate-in fade-in slide-in-from-top-2">
                                <select
                                    value={fuelTypeFilter}
                                    onChange={(e) => setFuelTypeFilter(e.target.value)}
                                    className="px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm hover:bg-accent transition"
                                >
                                    <option value="all">All Fuel Types</option>
                                    {fuelTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm hover:bg-accent transition"
                                >
                                    <option value="all">All Status</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left: Vehicle List */}
                    <div className="space-y-3 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">Fleet Vehicles</h2>
                            <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                                {filteredVehicles.length} vehicles
                            </span>
                        </div>
                        <div className="space-y-2">
                            {paginatedVehicles.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle.vin}
                                    vehicle={vehicle}
                                    isSelected={selectedVehicle.vin === vehicle.vin}
                                    onSelect={setSelectedVehicle}
                                />
                            ))}
                        </div>

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

                    {/* Right: Vehicle Details & Analytics */}
                    <div className="space-y-6 lg:col-span-3">
                        {/* Vehicle Header Card */}
                        <Card className="p-6 bg-card border-border overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Vehicle Image Placeholder */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-5xl opacity-80 mb-2">🚗</div>
                                            <p className="text-xs text-muted-foreground font-medium">{selectedVehicle.make}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Info */}
                                <div className="flex-1">
                                    <div className="mb-4">
                                        <h2 className="text-3xl font-bold text-foreground">
                                            {selectedVehicle.displayName || `${selectedVehicle.make} ${selectedVehicle.model}`}
                                        </h2>
                                        <p className="text-muted-foreground mt-1 font-medium">License Plate: {selectedVehicle.licensePlate || 'N/A'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
                                        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Fuel Type</p>
                                            <p className="text-sm font-semibold text-foreground">{selectedVehicle.fuelType}</p>
                                        </div>
                                        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Transmission</p>
                                            <p className="text-sm font-semibold text-foreground">{selectedVehicle.transmissionType}</p>
                                        </div>
                                        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Status</p>
                                            <p className="text-sm font-semibold text-green-500">{selectedVehicle.vehicleStatus}</p>
                                        </div>
                                        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Body Type</p>
                                            <p className="text-sm font-semibold text-foreground">{selectedVehicle.bodyType}</p>
                                        </div>
                                        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Possession</p>
                                            <p className="text-sm font-semibold text-foreground">{selectedVehicle.possession}</p>
                                        </div>
                                        {selectedVehicle.assignedPerson && (
                                            <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Assigned To</p>
                                                <p className="text-sm font-semibold text-foreground">{selectedVehicle.assignedPerson}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* <Button className="bg-primary hover:bg-primary/90 mt-2">View Full Details</Button> */}
                                </div>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Analytics Section */}
                            <div className="space-y-6 xl:col-span-2">
                                <h3 className="text-lg font-bold text-foreground">Analytics & Performance</h3>
                                <VehicleAnalytics vehicleId={selectedVehicle.vin} fuelType={selectedVehicle.fuelType} />
                            </div>

                            {/* Details Grid Section */}
                            <div className="space-y-4 xl:col-span-1">
                                <h3 className="text-lg font-bold text-foreground">Vehicle Details</h3>
                                <VehicleDetails vehicle={selectedVehicle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
