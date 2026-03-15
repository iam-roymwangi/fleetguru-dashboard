'use client'

import { Tire } from '@/lib/vehicleData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card } from '@/components/ui/card'

interface TireStatisticsProps {
    tires: Tire[]
}

export function TireStatistics({ tires }: TireStatisticsProps) {
    // Calculate tread depth statistics
    const mountedWithTread = tires.filter(t => t.status === 'mounted' && t.treadDepth !== null)
    const avgTreadDepth = mountedWithTread.length > 0 ? (mountedWithTread.reduce((sum, t) => sum + (t.treadDepth || 0), 0) / mountedWithTread.length).toFixed(1) : 0
    const minTreadDepth = mountedWithTread.length > 0 ? Math.min(...mountedWithTread.map(t => t.treadDepth || 0)).toFixed(1) : 0

    // Condition distribution
    const conditionDistribution = [
        { name: 'Excellent', value: tires.filter(t => t.condition === 'excellent').length, fill: '#22c55e' },
        { name: 'Good', value: tires.filter(t => t.condition === 'good').length, fill: '#10b981' },
        { name: 'Fair', value: tires.filter(t => t.condition === 'fair').length, fill: '#f59e0b' },
        { name: 'Poor', value: tires.filter(t => t.condition === 'poor').length, fill: '#ef4444' },
        { name: 'Unknown', value: tires.filter(t => t.condition === 'unknown').length, fill: '#6b7280' },
    ].filter(item => item.value > 0)

    // Type distribution
    const typeDistribution = [
        { name: 'Summer', value: tires.filter(t => t.type === 'summer').length },
        { name: 'Winter', value: tires.filter(t => t.type === 'winter').length },
        { name: 'Non-Studded', value: tires.filter(t => t.type === 'non-studded').length },
        { name: 'All-Terrain', value: tires.filter(t => t.type === 'all-terrain').length },
        { name: 'Studded', value: tires.filter(t => t.type === 'studded').length },
    ].filter(item => item.value > 0)

    // Tread depth by tire
    const treadData = mountedWithTread.map(tire => ({
        position: tire.position || 'Unknown',
        tread: tire.treadDepth,
        manufacturer: tire.manufacturer,
    }))

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-card border-border p-4 shadow-sm">
                    <p className="text-muted-foreground text-sm mb-1">Total Tires</p>
                    <p className="text-2xl font-bold text-foreground">{tires.length}</p>
                </Card>
                <Card className="bg-card border-border p-4 shadow-sm">
                    <p className="text-muted-foreground text-sm mb-1">Mounted</p>
                    <p className="text-2xl font-bold text-foreground">{tires.filter(t => t.status === 'mounted').length}</p>
                </Card>
                <Card className="bg-card border-border p-4 shadow-sm">
                    <p className="text-muted-foreground text-sm mb-1">Avg Tread Depth</p>
                    <p className="text-2xl font-bold text-foreground">{avgTreadDepth}mm</p>
                </Card>
                <Card className="bg-card border-border p-4 shadow-sm">
                    <p className="text-muted-foreground text-sm mb-1">Min Tread Depth</p>
                    <p className="text-2xl font-bold text-foreground">{minTreadDepth}mm</p>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Condition Distribution */}
                {conditionDistribution.length > 0 && (
                    <Card className="bg-card border-border p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Tire Condition Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={conditionDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {conditionDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                )}

                {/* Type Distribution */}
                {typeDistribution.length > 0 && (
                    <Card className="bg-card border-border p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-foreground">Tire Type Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={typeDistribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                )}
            </div>

            {/* Tread Depth Chart */}
            {treadData.length > 0 && (
                <Card className="bg-card border-border p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Tread Depth by Position</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={treadData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="position" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Tread Depth (mm)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="tread" fill="#10b981" name="Tread Depth (mm)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            )}
        </div>
    )
}
