'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { vehicles, Vehicle } from '@/lib/vehicleData'
import { TireFilters, TireFilterState } from '@/components/TireFilters'
import { TireVisualization } from '@/components/TireVisualization'
import { TireStatistics } from '@/components/TireStatistics'
import { TireConditionIndicator } from '@/components/TireConditionIndicator'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Search, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const ITEMS_PER_PAGE = 5

export default function VehicleTiresPage() {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles.filter((v: Vehicle) => v.tires && v.tires.length > 0)[0])
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState<TireFilterState>({
        conditions: [],
        tireTypes: [],
        status: 'all',
        minTreadDepth: null,
    })

    // Get vehicles with tires
    const vehiclesWithTires = useMemo(() => {
        return vehicles
            .filter((v: Vehicle) => v.tires && v.tires.length > 0)
            .filter((v: Vehicle) => {
                const query = searchQuery.toLowerCase()
                return (
                    v.displayName.toLowerCase().includes(query) ||
                    v.licensePlate.toLowerCase().includes(query) ||
                    v.make.toLowerCase().includes(query) ||
                    v.model.toLowerCase().includes(query)
                )
            })
    }, [searchQuery])

    // Filter tires based on selected filters
    const filteredTires = useMemo(() => {
        if (!selectedVehicle.tires) return []

        return selectedVehicle.tires.filter((tire: any) => {
            // Status filter
            if (filters.status !== 'all' && tire.status !== filters.status) {
                return false
            }

            // Condition filter
            if (filters.conditions.length > 0 && !filters.conditions.includes(tire.condition)) {
                return false
            }

            // Tire type filter
            if (filters.tireTypes.length > 0 && !filters.tireTypes.includes(tire.type)) {
                return false
            }

            // Tread depth filter
            if (filters.minTreadDepth !== null && tire.treadDepth !== null && tire.treadDepth < filters.minTreadDepth) {
                return false
            }

            return true
        })
    }, [selectedVehicle, filters])

    const totalPages = Math.ceil(vehiclesWithTires.length / ITEMS_PER_PAGE)
    const paginatedVehicles = vehiclesWithTires.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    // Count vehicles that match current filters (for filter sidebar)
    const matchingVehicleCount = useMemo(() => {
        return vehiclesWithTires.filter((v: Vehicle) => {
            if (!v.tires) return false
            return v.tires.some((tire: any) => {
                if (filters.status !== 'all' && tire.status !== filters.status) return false
                if (filters.conditions.length > 0 && !filters.conditions.includes(tire.condition)) return false
                if (filters.tireTypes.length > 0 && !filters.tireTypes.includes(tire.type)) return false
                if (filters.minTreadDepth !== null && tire.treadDepth !== null && tire.treadDepth < filters.minTreadDepth) return false
                return true
            })
        }).length
    }, [vehiclesWithTires, filters])

    return (
        <div className="w-full min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur border-b border-border sticky top-0 z-10 px-6 py-4">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Link href="/reports" className="hover:text-foreground transition-colors">Reports</Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-foreground font-medium">Vehicle Tires Report</span>
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Vehicle Tires Report</h1>
                            <p className="text-muted-foreground mt-1">Monitor and manage tire conditions across your fleet</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Vehicle Selection & Filters */}
                    <div className="space-y-6">
                        {/* Vehicle Search & Selection */}
                        <Card className="bg-card border-border p-4">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search vehicles..."
                                        value={searchQuery}
                                        onChange={e => {
                                            setSearchQuery(e.target.value)
                                            setCurrentPage(1)
                                        }}
                                        className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                                    />
                                </div>

                                <div className="space-y-2">
                                    {paginatedVehicles.map(vehicle => (
                                        <button
                                            key={vehicle.vin}
                                            onClick={() => setSelectedVehicle(vehicle)}
                                            className={`w-full text-left p-3 rounded-lg transition-colors border ${selectedVehicle.vin === vehicle.vin
                                                    ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20'
                                                    : 'bg-muted/50 border-border text-foreground hover:bg-muted'
                                                }`}
                                        >
                                            <p className="font-semibold text-sm">{vehicle.displayName}</p>
                                            <p className="text-xs opacity-75">{vehicle.licensePlate || vehicle.model}</p>
                                            <p className="text-xs mt-1">
                                                {vehicle.tires?.length || 0} tire{(vehicle.tires?.length || 0) !== 1 ? 's' : ''}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Filters */}
                        <TireFilters filters={filters} onFiltersChange={setFilters} vehicleCount={matchingVehicleCount} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {selectedVehicle && selectedVehicle.tires && selectedVehicle.tires.length > 0 ? (
                            <>
                                {/* Vehicle Header */}
                                <Card className="bg-card border-border p-6 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-foreground">{selectedVehicle.displayName}</h2>
                                            <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">License Plate</p>
                                                    <p className="text-foreground font-semibold">{selectedVehicle.licensePlate || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Make/Model</p>
                                                    <p className="text-foreground font-semibold">
                                                        {selectedVehicle.make} {selectedVehicle.model}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Status</p>
                                                    <p className="text-foreground font-semibold">{selectedVehicle.vehicleStatus}</p>
                                                </div>
                                                {selectedVehicle.vehicleManager && (
                                                    <div>
                                                        <p className="text-muted-foreground">Vehicle Manager</p>
                                                        <p className="text-foreground font-semibold">{selectedVehicle.vehicleManager}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {filteredTires.length > 0 ? (
                                    <>
                                        {/* Tire Visualization */}
                                        <TireVisualization tires={filteredTires} vehicleModel={selectedVehicle.model} />

                                        {/* Tire Statistics */}
                                        <TireStatistics tires={filteredTires} />
                                    </>
                                ) : (
                                    <Card className="bg-card border-border p-8 text-center bg-muted/20">
                                        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-muted-foreground">No tires match the selected filters.</p>
                                    </Card>
                                )}
                            </>
                        ) : (
                            <Card className="bg-card border-border p-8 text-center bg-muted/20">
                                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                <p className="text-muted-foreground">Select a vehicle to view tire information.</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
