'use client'

import { Vehicle } from '@/lib/vehicleData'
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'

interface EngineHoursChartsProps {
  filteredVehicles: Vehicle[]
}

export function EngineHoursCharts({ filteredVehicles }: EngineHoursChartsProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const gridColor = isDark ? '#334155' : '#e2e8f0'
  const axisColor = isDark ? '#94a3b8' : '#64748b'
  const tooltipBg = isDark ? '#1e293b' : '#ffffff'
  const tooltipBorder = isDark ? '#475569' : '#e2e8f0'
  const tooltipText = isDark ? '#e2e8f0' : '#0f172a'

  const tooltipStyle = {
    backgroundColor: tooltipBg,
    border: `1px solid ${tooltipBorder}`,
    borderRadius: '8px',
    color: tooltipText,
  }

  const vehicleEngineHours = filteredVehicles.map((v) => ({
    name: v.displayName.length > 15 ? v.displayName.substring(0, 12) + '...' : v.displayName,
    hours: v.currentEngineHours || 0,
  }))

  const engineHealthDistribution = [
    { name: 'Excellent', value: filteredVehicles.filter((v) => v.engineHoursRecords?.some((r) => r.engineHealth === 'excellent')).length },
    { name: 'Good', value: filteredVehicles.filter((v) => v.engineHoursRecords?.some((r) => r.engineHealth === 'good')).length },
    { name: 'Fair', value: filteredVehicles.filter((v) => v.engineHoursRecords?.some((r) => r.engineHealth === 'fair')).length },
    { name: 'Warning', value: filteredVehicles.filter((v) => v.engineHoursRecords?.some((r) => r.engineHealth === 'warning')).length },
  ].filter((d) => d.value > 0)

  const hoursDistribution = [
    { range: '0-500h', count: filteredVehicles.filter((v) => (v.currentEngineHours || 0) < 500).length },
    { range: '500-1000h', count: filteredVehicles.filter((v) => (v.currentEngineHours || 0) >= 500 && (v.currentEngineHours || 0) < 1000).length },
    { range: '1000-1500h', count: filteredVehicles.filter((v) => (v.currentEngineHours || 0) >= 1000 && (v.currentEngineHours || 0) < 1500).length },
    { range: '1500-2000h', count: filteredVehicles.filter((v) => (v.currentEngineHours || 0) >= 1500 && (v.currentEngineHours || 0) < 2000).length },
    { range: '2000h+', count: filteredVehicles.filter((v) => (v.currentEngineHours || 0) >= 2000).length },
  ]

  const utilizationData = filteredVehicles.map((v) => ({
    vehicle: v.displayName.substring(0, 10),
    currentHours: v.currentEngineHours || 0,
    monthlyAverage: v.engineHoursRecords?.[v.engineHoursRecords.length - 1]?.estimatedMonthlyAverage || 0,
  }))

  const colors = ['#3b82f6', '#10b981', '#f97316', '#f59e0b', '#ef4444']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engine Hours by Vehicle</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vehicleEngineHours}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={axisColor} style={{ fontSize: '12px' }} />
            <YAxis stroke={axisColor} style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
              {vehicleEngineHours.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engine Health Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engineHealthDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={axisColor} style={{ fontSize: '12px' }} />
            <YAxis stroke={axisColor} style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Hours Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hoursDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="range" stroke={axisColor} style={{ fontSize: '12px' }} />
            <YAxis stroke={axisColor} style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Utilization vs Monthly Average</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="currentHours" stroke={axisColor} style={{ fontSize: '12px' }} name="Current Hours" />
            <YAxis dataKey="monthlyAverage" stroke={axisColor} style={{ fontSize: '12px' }} name="Monthly Average" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Vehicles" data={utilizationData} fill="#f59e0b" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
