'use client'

import { Vehicle } from '@/lib/vehicleData'
import { Activity, Gauge, TrendingUp, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface EngineHoursStatisticsProps {
  vehicles: Vehicle[]
  filteredVehicles: Vehicle[]
}

export function EngineHoursStatistics({ filteredVehicles }: EngineHoursStatisticsProps) {
  const totalEngineHours = filteredVehicles.reduce((sum, v) => sum + (v.currentEngineHours || 0), 0)
  const averageEngineHours =
    filteredVehicles.length > 0 ? Math.round(totalEngineHours / filteredVehicles.length) : 0
  const highestUsageVehicle = [...filteredVehicles].sort((a, b) => (b.currentEngineHours || 0) - (a.currentEngineHours || 0))[0]
  const averageMonthlyUsage =
    filteredVehicles.reduce((sum, v) => {
      const records = v.engineHoursRecords || []
      if (records.length > 0) return sum + (records[records.length - 1]?.estimatedMonthlyAverage || 0)
      return sum
    }, 0) / Math.max(filteredVehicles.length, 1)

  const stats = [
    { label: 'Total Engine Hours', value: totalEngineHours.toLocaleString(), icon: Gauge },
    { label: 'Average Engine Hours', value: averageEngineHours.toLocaleString(), icon: Activity },
    { label: 'Highest Usage', value: (highestUsageVehicle?.currentEngineHours || 0).toLocaleString(), icon: TrendingUp },
    { label: 'Avg Monthly Usage', value: averageMonthlyUsage.toFixed(0), icon: AlertCircle },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
