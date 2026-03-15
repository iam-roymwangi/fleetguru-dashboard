'use client'

import { Vehicle } from '@/lib/vehicleData'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MileageDataTableProps {
    vehicles: Vehicle[]
}

export function MileageDataTable({ vehicles }: MileageDataTableProps) {
    const tableData = vehicles.map(v => {
        const currentMileage = v.currentMileage || 0
        const lastRecord = v.mileageRecords?.[v.mileageRecords.length - 1]
        const previousRecord = v.mileageRecords?.[v.mileageRecords.length - 2]

        const monthlyUsage = lastRecord?.estimatedMonthlyAverage || 0
        const mileageChange = previousRecord ? currentMileage - previousRecord.mileage : 0

        return {
            vehicle: v.displayName,
            licensePlate: v.licensePlate,
            make: `${v.make} ${v.model}`,
            currentMileage,
            monthlyUsage,
            mileageChange,
            lastUpdate: lastRecord?.date || 'N/A',
            manager: v.vehicleManager || 'Unassigned',
            fuelType: v.fuelType,
        }
    }).sort((a, b) => b.currentMileage - a.currentMileage)

    return (
        <Card className="bg-card border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="px-5 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-xs">Vehicle</th>
                            <th className="px-5 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-xs">License Plate</th>
                            <th className="px-5 py-4 text-right font-semibold text-muted-foreground uppercase tracking-wider text-xs">Current Mileage</th>
                            <th className="px-5 py-4 text-right font-semibold text-muted-foreground uppercase tracking-wider text-xs">Monthly Usage</th>
                            <th className="px-5 py-4 text-right font-semibold text-muted-foreground uppercase tracking-wider text-xs">Last Month Change</th>
                            <th className="px-5 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-xs">Fuel Type</th>
                            <th className="px-5 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-xs">Manager</th>
                            <th className="px-5 py-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-xs">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {tableData.map((row, idx) => (
                            <tr key={idx} className="group hover:bg-muted/50 transition-colors">
                                <td className="px-5 py-4 font-medium text-foreground">{row.vehicle}</td>
                                <td className="px-5 py-4 text-muted-foreground font-mono text-xs">{row.licensePlate}</td>
                                <td className="px-5 py-4 text-right font-bold text-foreground">
                                    {row.currentMileage.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">km</span>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="text-primary font-bold">{row.monthlyUsage.toLocaleString()}</span>
                                        <span className="text-muted-foreground text-xs">km</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {row.mileageChange > 0 ? (
                                            <TrendingUp className="w-4 h-4 text-amber-500" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-blue-500" />
                                        )}
                                        <span className={`font-medium ${row.mileageChange > 0 ? 'text-amber-500' : 'text-blue-500'}`}>
                                            {row.mileageChange > 0 ? '+' : ''}{row.mileageChange.toLocaleString()} km
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                                        {row.fuelType}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-muted-foreground">{row.manager}</td>
                                <td className="px-5 py-4 text-xs text-muted-foreground">{row.lastUpdate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
