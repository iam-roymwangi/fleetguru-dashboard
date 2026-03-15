'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    FileText, Download, ClipboardList, Wrench, MapPin, Fuel, Car, BarChart3, Radio, CircleDashed,
    Timer, PlugZap, CheckCircle, AlertTriangle, TrendingUp, Cloud, Settings, Shield, Zap,
    ScrollText, User, BadgeCheck, DollarSign
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const reports = {
    all: [
        // Vehicles
        {
            category: 'Vehicles',
            reports: [
                { id: 1, title: 'General vehicle report', description: 'Premium standard report', icon: ClipboardList, href: '/reports/vehicle-report' },
                { id: 2, title: 'Upcoming services report', description: 'Premium standard report', icon: Wrench, href: '/reports/upcoming-services' },
                { id: 3, title: 'Vehicle mileage report', description: 'Premium standard report', icon: MapPin, href: '/reports/vehicle-mileage' },
                { id: 4, title: 'Vehicle fillups report', description: 'Premium standard report', icon: Fuel },
                { id: 5, title: 'Insurance claims report', description: 'Premium standard report', icon: FileText },
                { id: 6, title: 'Vehicle trips report', description: 'Premium standard report', icon: Car },
                { id: 7, title: 'Main KPIs report', description: 'Premium standard report', icon: BarChart3 },
                { id: 8, title: 'Telimus', description: 'Organization-wide custom report', icon: Radio },
                { id: 9, title: 'Vehicle tires report', description: 'Premium standard report', icon: CircleDashed, href: '/reports/vehicle-tires' },
                { id: 10, title: 'Mileage', description: 'Organization-wide custom report', icon: Timer },
                { id: 11, title: 'EV charges report', description: 'Premium standard report', icon: PlugZap },
                { id: 12, title: 'Vehicle checkups report', description: 'Premium standard report', icon: CheckCircle },
                { id: 13, title: 'Alerts report', description: 'Premium standard report', icon: AlertTriangle },
                { id: 14, title: 'Vehicle status report', description: 'Premium standard report', icon: TrendingUp },
                { id: 15, title: 'CO2 report', description: 'Premium standard report', icon: Cloud },
                { id: 16, title: 'Vehicle engine hours report', description: 'Premium standard report', icon: Settings, href: '/reports/engine-hours' },
                { id: 17, title: 'Insurance coverage report', description: 'Premium standard report', icon: Shield },
                { id: 18, title: 'Vehicle issues report', description: 'Premium standard report', icon: Zap },
                { id: 19, title: 'Leasing and rental contracts report', description: 'Premium standard report', icon: ScrollText },
            ]
        },
        // Persons
        {
            category: 'Persons',
            reports: [
                { id: 20, title: 'Persons report', description: 'Premium standard report', icon: User },
                { id: 21, title: 'Concluded agreements', description: 'Premium standard report', icon: BadgeCheck },
            ]
        },
        // Costs
        {
            category: 'Costs',
            reports: [
                { id: 22, title: 'Vehicle costs report', description: 'Premium standard report', icon: DollarSign },
            ]
        },
    ]
}

interface ReportCard {
    id: number
    title: string
    description: string
    icon: React.ElementType
    href?: string
}

interface Category {
    category: string
    reports: ReportCard[]
}

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState('all')

    const getReportsByTab = () => {
        if (activeTab === 'all') {
            return reports.all
        }

        const categoryMap: Record<string, string> = {
            vehicles: 'Vehicles',
            persons: 'Persons',
            costs: 'Costs',
            suppliers: 'Suppliers',
            rental: 'Rental Management',
        }

        const categoryName = categoryMap[activeTab]
        return reports.all.filter(section => section.category === categoryName)
    }

    const ReportCard = ({ report }: { report: ReportCard }) => {
        const IconComponent = report.icon
        const isLinkedToVehicleReport = report.id === 1
        const isLinkedToUpcomingServices = report.id === 2
        const isLinkedToTiresReport = report.id === 9
        const isLinkedToMileageReport = report.id === 3

        const linkedHref =
            report.href ??
            (isLinkedToVehicleReport ? '/reports/vehicle-report' :
            isLinkedToUpcomingServices ? '/reports/upcoming-services' :
            isLinkedToTiresReport ? '/reports/vehicle-tires' :
            isLinkedToMileageReport ? '/reports/vehicle-mileage' :
            null)

        return (
            <Card className="bg-card border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer p-5 flex flex-col h-full">
                <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                        <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-foreground font-semibold mb-1">{report.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-1">{report.description}</p>

                        {linkedHref ? (
                            <Link href={linkedHref} className="w-full sm:w-auto">
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full">
                                    <FileText className="w-4 h-4" />
                                    View Report
                                </Button>
                            </Link>
                        ) : (
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 self-start">
                                <Download className="w-4 h-4" />
                                Generate
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        )
    }

    const displayReports = getReportsByTab()

    return (
        <div className="flex-1 flex flex-col bg-background min-h-screen">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur border-b border-border px-6 py-8 sticky top-0 z-10 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
                    </div>
                </div>

                {/* Tab Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto w-full justify-start gap-2">
                        <TabsTrigger
                            value="all"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground"
                        >
                            All reports
                        </TabsTrigger>
                        <TabsTrigger
                            value="vehicles"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground"
                        >
                            Vehicles
                        </TabsTrigger>
                        <TabsTrigger
                            value="persons"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground"
                        >
                            Persons
                        </TabsTrigger>
                        <TabsTrigger
                            value="costs"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground"
                        >
                            Costs
                        </TabsTrigger>
                        <TabsTrigger
                            value="suppliers"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground"
                        >
                            Suppliers
                        </TabsTrigger>
                        <TabsTrigger
                            value="rental"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground"
                        >
                            Rental management
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {displayReports.map((section) => (
                        <TabsContent key={section.category} value={section.category.toLowerCase()} className="space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground mb-4">{section.category}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {section.reports.map((report) => (
                                        <ReportCard key={report.id} report={report} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    ))}

                    {/* All reports tab content */}
                    <TabsContent value="all" className="space-y-8">
                        {displayReports.map((section) => (
                            <div key={section.category}>
                                <h2 className="text-xl font-semibold text-foreground mb-4">{section.category}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {section.reports.map((report) => (
                                        <ReportCard key={report.id} report={report} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
