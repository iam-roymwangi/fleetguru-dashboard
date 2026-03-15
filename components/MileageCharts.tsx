'use client'

import { Vehicle } from '@/lib/vehicleData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'

interface MileageChartsProps {
    vehicles: Vehicle[]
}

const CHART_COLORS = ['#2cb89c', '#1a69a4', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4']

export function MileageCharts({ vehicles }: MileageChartsProps) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    const gridColor   = isDark ? '#334155' : '#e2e8f0'
    const axisColor   = isDark ? '#94a3b8' : '#64748b'
    const tooltipBg   = isDark ? '#1e293b' : '#ffffff'
    const tooltipBorder = isDark ? '#475569' : '#e2e8f0'
    const tooltipText = isDark ? '#f1f5f9' : '#0f172a'

    const tooltipStyle = {
        backgroundColor: tooltipBg,
        border: `1px solid ${tooltipBorder}`,
        borderRadius: '8px',
        color: tooltipText,
    }

    const trendData = vehicles
        .filter(v => v.mileageRecords && v.mileageRecords.length > 0)
        .map(v => ({
            name: v.displayName,
            currentMileage: v.currentMileage || 0,
            avgMonthly: v.mileageRecords?.[v.mileageRecords.length - 1]?.estimatedMonthlyAverage || 0,
        }))
        .sort((a, b) => b.currentMileage - a.currentMileage)
        .slice(0, 8)

    const mileageDistribution = [
        { range: '0-20k km',  count: vehicles.filter(v => (v.currentMileage || 0) < 20000).length },
        { range: '20-40k km', count: vehicles.filter(v => { const m = v.currentMileage || 0; return m >= 20000 && m < 40000 }).length },
        { range: '40-60k km', count: vehicles.filter(v => { const m = v.currentMileage || 0; return m >= 40000 && m < 60000 }).length },
        { range: '60k+ km',   count: vehicles.filter(v => (v.currentMileage || 0) >= 60000).length },
    ]

    const monthlyUsageData = vehicles
        .filter(v => v.mileageRecords && v.mileageRecords.length > 0)
        .map(v => ({
            name: v.displayName.split(' ')[0],
            usage: v.mileageRecords?.[v.mileageRecords.length - 1]?.estimatedMonthlyAverage || 0,
            mileage: v.currentMileage || 0,
        }))
        .sort((a, b) => b.usage - a.usage)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Mileage by Vehicle (Top 8)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: tooltipText }} />
                        <Bar dataKey="currentMileage" radius={[4, 4, 0, 0]} name="Current Mileage (km)">
                            {trendData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card className="bg-card border-border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Mileage Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mileageDistribution} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="range" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: tooltipText }} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Number of Vehicles">
                            {mileageDistribution.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card className="bg-card border-border p-6 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Usage vs Current Mileage</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis type="number" dataKey="usage" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} name="Monthly Usage (km)" />
                        <YAxis type="number" dataKey="mileage" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} name="Current Mileage (km)" />
                        <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: tooltipText }} cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Vehicles" data={monthlyUsageData} fill="#2cb89c" />
                    </ScatterChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
