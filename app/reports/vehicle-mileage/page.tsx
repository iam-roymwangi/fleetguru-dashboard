'use client'

import { useState, useMemo } from 'react'
import { Gauge, Download } from 'lucide-react'
import { vehicles } from '@/lib/vehicleData'
import { MileageFilters } from '@/components/MileageFilters'
import { MileageStatistics } from '@/components/MileageStatistics'
import { MileageCharts } from '@/components/MileageCharts'
import { MileageDataTable } from '@/components/MileageDataTable'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { exportToExcel } from '@/lib/exportToExcel'

export default function VehicleMileageReport() {
    const [filters, setFilters] = useState({
        search: '',
        vehicleType: '',
        fuelType: '',
        mileageMin: 0,
        mileageMax: 100000,
    })

    const handleExport = () => {
        const data = filteredVehicles.map(v => ({
            'Vehicle Name': v.displayName,
            'License Plate': v.licensePlate,
            'Make': v.make,
            'Model': v.model,
            'Vehicle Type': v.vehicleType,
            'Fuel Type': v.fuelType,
            'Current Mileage (km)': v.currentMileage ?? '',
            'Status': v.vehicleStatus,
            'Possession': v.possession,
        }))
        exportToExcel(data, 'vehicle-mileage-report', 'Mileage')
    }

    const filteredVehicles = useMemo(() => {
        return vehicles.filter(v => {
            const matchesSearch = !filters.search ||
                v.displayName.toLowerCase().includes(filters.search.toLowerCase()) ||
                v.licensePlate.toLowerCase().includes(filters.search.toLowerCase())

            const matchesVehicleType = !filters.vehicleType || v.vehicleType === filters.vehicleType

            const matchesFuelType = !filters.fuelType || v.fuelType === filters.fuelType

            const matchesMileage =
                (v.currentMileage || 0) >= filters.mileageMin &&
                (v.currentMileage || 0) <= filters.mileageMax

            return matchesSearch && matchesVehicleType && matchesFuelType && matchesMileage
        })
    }, [filters])

    return (
        <div className="flex-1 flex flex-col bg-background min-h-screen">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur border-b border-border sticky top-0 z-10 px-6 py-6 transition-colors duration-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Gauge className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Vehicle Mileage Report</h1>
                            <p className="text-sm text-muted-foreground">Monitor vehicle mileage and usage patterns</p>
                        </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                        <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 gap-2">
                            <Download className="w-4 h-4" />
                            Export to Excel
                        </Button>
                        <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Active Vehicles</p>
                        <p className="text-3xl font-bold text-primary">{filteredVehicles.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <MileageFilters onFilterChange={setFilters} />
                    </div>

                    {/* Charts and Data */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Statistics */}
                        <MileageStatistics vehicles={filteredVehicles} />

                        {/* Charts */}
                        <MileageCharts vehicles={filteredVehicles} />

                        {/* Data Table */}
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-4">Vehicle Details</h2>
                            <MileageDataTable vehicles={filteredVehicles} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
