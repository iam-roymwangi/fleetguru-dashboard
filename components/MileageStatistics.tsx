'use client'

import { Vehicle } from '@/lib/vehicleData'
import { TrendingUp, Gauge, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface MileageStatisticsProps {
    vehicles: Vehicle[]
}

export function MileageStatistics({ vehicles }: MileageStatisticsProps) {
    const totalMileage = vehicles.reduce((sum, v) => sum + (v.currentMileage || 0), 0)
    const avgMileage = vehicles.length > 0 ? Math.round(totalMileage / vehicles.length) : 0
    const maxMileage = Math.max(...vehicles.map(v => v.currentMileage || 0))
    const minMileage = Math.min(...vehicles.map(v => v.currentMileage || 0))

    const avgMonthlyMileage = vehicles.length > 0
        ? Math.round(
            vehicles.reduce((sum, v) => {
                const lastRecord = v.mileageRecords?.[v.mileageRecords.length - 1]
                return sum + (lastRecord?.estimatedMonthlyAverage || 0)
            }, 0) / vehicles.length
        )
        : 0

    const stats = [
        {
            label: 'Total Fleet Mileage',
            value: totalMileage.toLocaleString(),
            unit: 'km',
            icon: Gauge,
            color: 'from-blue-500 to-blue-600',
        },
        {
            label: 'Average Vehicle Mileage',
            value: avgMileage.toLocaleString(),
            unit: 'km',
            icon: TrendingUp,
            color: 'from-emerald-500 to-emerald-600',
        },
        {
            label: 'Highest Mileage Vehicle',
            value: maxMileage.toLocaleString(),
            unit: 'km',
            icon: Calendar,
            color: 'from-orange-500 to-orange-600',
        },
        {
            label: 'Avg Monthly Usage',
            value: avgMonthlyMileage.toLocaleString(),
            unit: 'km/month',
            icon: TrendingUp,
            color: 'from-purple-500 to-purple-600',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                    <Card key={idx} className="bg-card border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className={`h-1.5 bg-gradient-to-r ${stat.color}`} />
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                                <Icon className="w-5 h-5 text-primary opacity-20" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm font-medium text-muted-foreground">{stat.unit}</p>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
