'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from 'next-themes'
import { useEffect, useState, useMemo } from 'react'

interface VehicleAnalyticsProps {
    vehicleId: string
}

const generateDynamicData = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const multiplier = 0.7 + (Math.abs(hash) % 60) / 100; // 0.7 to 1.3

    const mileageData = [
        { month: 'Jan', mileage: Math.round(1200 * multiplier) },
        { month: 'Feb', mileage: Math.round(1450 * multiplier) },
        { month: 'Mar', mileage: Math.round(1800 * multiplier) },
        { month: 'Apr', mileage: Math.round(1600 * multiplier) },
        { month: 'May', mileage: Math.round(2100 * multiplier) },
        { month: 'Jun', mileage: Math.round(1950 * multiplier) },
    ]

    const fuelConsumptionData = [
        { week: 'W1', consumption: Math.round(35 * multiplier), cost: Math.round(120 * multiplier) },
        { week: 'W2', consumption: Math.round(42 * multiplier), cost: Math.round(145 * multiplier) },
        { week: 'W3', consumption: Math.round(38 * multiplier), cost: Math.round(130 * multiplier) },
        { week: 'W4', consumption: Math.round(45 * multiplier), cost: Math.round(155 * multiplier) },
    ]
    return { mileageData, fuelConsumptionData }
}

const maintenanceData = [
    { task: 'Oil Change', status: 'Completed', date: '2024-01-15' },
    { task: 'Tire Rotation', status: 'Pending', date: '2024-03-20' },
    { task: 'Brake Service', status: 'Completed', date: '2024-02-10' },
    { task: 'Filter Replacement', status: 'Upcoming', date: '2024-04-01' },
]

export function VehicleAnalytics({ vehicleId }: VehicleAnalyticsProps) {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    
    const { mileageData, fuelConsumptionData } = useMemo(() => generateDynamicData(vehicleId), [vehicleId])

    const isDark = mounted ? theme !== 'light' : true
    const textColor = isDark ? '#94a3b8' : '#64748b'
    const gridColor = isDark ? '#334155' : '#e2e8f0'
    const tooltipBg = isDark ? '#1e293b' : '#ffffff'
    const tooltipBorder = isDark ? '#475569' : '#e2e8f0'

    return (
        <div className="space-y-6">
            {/* Mileage Trend */}
            <Card className="p-6 bg-card border-border shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Mileage Trend (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mileageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis stroke={textColor} />
                        <YAxis stroke={textColor} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: tooltipBg,
                                border: `1px solid ${tooltipBorder}`,
                                borderRadius: '8px',
                                color: isDark ? '#f8fafc' : '#0f172a'
                            }}
                            cursor={{ stroke: 'var(--chart-1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="mileage"
                            stroke="var(--chart-1)"
                            strokeWidth={2}
                            dot={{ fill: 'var(--chart-1)', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Fuel Consumption & Cost */}
            <Card className="p-6 bg-card border-border shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Fuel Consumption & Cost</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fuelConsumptionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis stroke={textColor} />
                        <YAxis stroke={textColor} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: tooltipBg,
                                border: `1px solid ${tooltipBorder}`,
                                borderRadius: '8px',
                                color: isDark ? '#f8fafc' : '#0f172a'
                            }}
                        />
                        <Legend wrapperStyle={{ color: textColor }} />
                        <Bar dataKey="consumption" fill="var(--chart-1)" name="Liters" />
                        <Bar dataKey="cost" fill="var(--chart-3)" name="Cost ($)" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Maintenance Schedule */}
            <Card className="p-6 bg-card border-border shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Maintenance Schedule</h3>
                <div className="space-y-3">
                    {maintenanceData.map((item, idx) => {
                        const statusColor = {
                            Completed: 'bg-green-500/10 text-green-500 border-green-500/30',
                            Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
                            Upcoming: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
                        }[item.status] || 'bg-muted/50 text-muted-foreground border-border'

                        return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                                <div>
                                    <p className="font-medium text-foreground">{item.task}</p>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
                                    {item.status}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}
