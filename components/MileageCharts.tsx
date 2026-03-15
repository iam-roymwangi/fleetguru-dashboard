'use client'

import { Vehicle } from '@/lib/vehicleData'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { Card } from '@/components/ui/card'

interface MileageChartsProps {
    vehicles: Vehicle[]
}

export function MileageCharts({ vehicles }: MileageChartsProps) {
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
        {
            range: '0-20k km',
            count: vehicles.filter(v => (v.currentMileage || 0) < 20000).length,
        },
        {
            range: '20-40k km',
            count: vehicles.filter(v => {
                const m = v.currentMileage || 0
                return m >= 20000 && m < 40000
            }).length,
        },
        {
            range: '40-60k km',
            count: vehicles.filter(v => {
                const m = v.currentMileage || 0
                return m >= 40000 && m < 60000
            }).length,
        },
        {
            range: '60k+ km',
            count: vehicles.filter(v => (v.currentMileage || 0) >= 60000).length,
        },
    ]

    const monthlyUsageData = vehicles
        .filter(v => v.mileageRecords && v.mileageRecords.length > 0)
        .map((v, idx) => ({
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
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Bar dataKey="currentMileage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Current Mileage (km)" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card className="bg-card border-border p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Mileage Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mileageDistribution} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" opacity={0.8} radius={[4, 4, 0, 0]} name="Number of Vehicles" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card className="bg-card border-border p-6 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Usage vs Current Mileage</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" dataKey="usage" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} name="Monthly Usage (km)" />
                        <YAxis type="number" dataKey="mileage" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} name="Current Mileage (km)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                            cursor={{ strokeDasharray: '3 3' }}
                        />
                        <Scatter name="Vehicles" data={monthlyUsageData} fill="hsl(var(--primary))" />
                    </ScatterChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
