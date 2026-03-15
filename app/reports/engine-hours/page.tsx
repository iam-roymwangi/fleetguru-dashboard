'use client'

import { useState, useMemo } from 'react'
import { EngineHoursFilters, FilterState } from '@/components/EngineHoursFilters'
import { EngineHoursStatistics } from '@/components/EngineHoursStatistics'
import { EngineHoursCharts } from '@/components/EngineHoursCharts'
import { EngineHoursDataTable } from '@/components/EngineHoursDataTable'
import { vehicles } from '@/lib/vehicleData'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Activity, Download, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { exportToExcel } from '@/lib/exportToExcel'

export default function EngineHoursReport() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    vehicleType: null,
    engineHealthFilter: null,
    hoursRange: [0, 3000],
  })

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        if (!vehicle.displayName.toLowerCase().includes(query) && !vehicle.licensePlate.toLowerCase().includes(query)) {
          return false
        }
      }
      if (filters.vehicleType && vehicle.vehicleType !== filters.vehicleType) return false
      if (filters.engineHealthFilter) {
        const hasMatchingHealth = vehicle.engineHoursRecords?.some((r) => r.engineHealth === filters.engineHealthFilter)
        if (!hasMatchingHealth) return false
      }
      const engineHours = vehicle.currentEngineHours || 0
      if (engineHours < filters.hoursRange[0] || engineHours > filters.hoursRange[1]) return false
      return true
    })
  }, [filters])

  const handleExport = () => {
    const data = filteredVehicles.map((v) => {
      const last = v.engineHoursRecords?.[v.engineHoursRecords.length - 1]
      return {
        'Vehicle': v.displayName,
        'License Plate': v.licensePlate,
        'Vehicle Type': v.vehicleType,
        'Current Engine Hours': v.currentEngineHours ?? '',
        'Monthly Avg (h)': last?.estimatedMonthlyAverage ?? '',
        'Engine Health': last?.engineHealth ?? '',
        'Last Update': last?.date ?? '',
      }
    })
    exportToExcel(data, 'engine-hours-report', 'Engine Hours')
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur border-b border-border sticky top-0 z-10 px-6 py-4 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Link href="/reports" className="hover:text-foreground transition-colors">Reports</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground font-medium">Engine Hours</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Engine Hours Report</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 gap-2">
                <Download className="w-4 h-4" />
                Export to Excel
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <EngineHoursFilters vehicles={vehicles} onFiltersChange={setFilters} />
          <div className="flex-1">
            <EngineHoursStatistics vehicles={vehicles} filteredVehicles={filteredVehicles} />
            <EngineHoursCharts filteredVehicles={filteredVehicles} />
            <EngineHoursDataTable filteredVehicles={filteredVehicles} />
          </div>
        </div>
      </div>
    </div>
  )
}
