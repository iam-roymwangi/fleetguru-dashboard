'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface FuelEfficiencyTabProps {
  fuelData?: Array<{ name: string; mpg: number; liters: number }>
  emissionsData?: Array<{ name: string; co2: number }>
}

export function FuelEfficiencyTab({ fuelData, emissionsData }: FuelEfficiencyTabProps) {
  const defaultFuelData = fuelData || [
    { name: 'Vehicle 1', mpg: 22.5, liters: 10.5 },
    { name: 'Vehicle 2', mpg: 18.3, liters: 12.8 },
    { name: 'Vehicle 3', mpg: 24.1, liters: 9.7 },
    { name: 'Vehicle 4', mpg: 19.8, liters: 11.2 },
    { name: 'Vehicle 5', mpg: 26.2, liters: 8.9 },
  ]

  const defaultEmissionsData = emissionsData || [
    { name: 'Mon', co2: 1200 },
    { name: 'Tue', co2: 1450 },
    { name: 'Wed', co2: 1100 },
    { name: 'Thu', co2: 1900 },
    { name: 'Fri', co2: 2100 },
    { name: 'Sat', co2: 1800 },
    { name: 'Sun', co2: 1600 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Fleet Avg MPG</div>
          <div className="text-3xl font-bold text-blue-400">22.2</div>
          <div className="text-xs text-green-400 mt-1">↑ 5.2% from last week</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Avg Liters/100km</div>
          <div className="text-3xl font-bold text-orange-400">10.6</div>
          <div className="text-xs text-red-400 mt-1">↑ 2.1% from last week</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Weekly CO₂ Emissions</div>
          <div className="text-3xl font-bold text-green-400">11.2T</div>
          <div className="text-xs text-red-400 mt-1">↑ 8.3% from last week</div>
        </Card>
      </div>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Fuel Efficiency by Vehicle</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={defaultFuelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Bar dataKey="mpg" fill="#3b82f6" name="MPG" />
            <Bar dataKey="liters" fill="#f97316" name="L/100km" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly CO₂ Emissions Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={defaultEmissionsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2} name="CO₂ (kg)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
