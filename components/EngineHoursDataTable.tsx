'use client'

import { Vehicle } from '@/lib/vehicleData'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface EngineHoursDataTableProps {
  filteredVehicles: Vehicle[]
}

export function EngineHoursDataTable({ filteredVehicles }: EngineHoursDataTableProps) {
  const getHealthClasses = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-500/10 text-green-500'
      case 'good':      return 'bg-emerald-500/10 text-emerald-500'
      case 'fair':      return 'bg-yellow-500/10 text-yellow-600'
      case 'warning':   return 'bg-red-500/10 text-red-500'
      default:          return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card className="p-6 bg-card border-border overflow-x-auto">
      <h3 className="text-lg font-semibold text-foreground mb-4">Vehicle Engine Hours Details</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Vehicle</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">License</th>
            <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Engine Hours</th>
            <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Monthly Avg</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Health</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle) => {
            const lastRecord = vehicle.engineHoursRecords?.[vehicle.engineHoursRecords.length - 1]
            const previousRecord = vehicle.engineHoursRecords?.[vehicle.engineHoursRecords.length - 2]
            const trend = (lastRecord?.estimatedMonthlyAverage || 0) > (previousRecord?.estimatedMonthlyAverage || 0)

            return (
              <tr key={vehicle.vin} className="border-b border-border hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3 text-foreground">{vehicle.displayName}</td>
                <td className="px-4 py-3 text-muted-foreground">{vehicle.licensePlate}</td>
                <td className="text-right px-4 py-3 text-foreground font-medium">{(vehicle.currentEngineHours || 0).toLocaleString()} h</td>
                <td className="text-right px-4 py-3 text-muted-foreground">
                  <div className="flex items-center justify-end gap-1">
                    {lastRecord?.estimatedMonthlyAverage || 0} h
                    {trend ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHealthClasses(lastRecord?.engineHealth || '')}`}>
                    {lastRecord?.engineHealth
                      ? lastRecord.engineHealth.charAt(0).toUpperCase() + lastRecord.engineHealth.slice(1)
                      : 'Unknown'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{lastRecord?.date || 'N/A'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}
