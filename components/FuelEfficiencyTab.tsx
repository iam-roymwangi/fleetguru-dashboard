'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface FuelEfficiencyTabProps {
  fuelData?: Array<{ name: string; mpg: number; liters: number }>
  emissionsData?: Array<{ name: string; co2: number; evPower: number }>
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
    { name: 'Mon', co2: 1200, evPower: 450 },
    { name: 'Tue', co2: 1450, evPower: 520 },
    { name: 'Wed', co2: 1100, evPower: 480 },
    { name: 'Thu', co2: 1900, evPower: 610 },
    { name: 'Fri', co2: 2100, evPower: 680 },
    { name: 'Sat', co2: 1800, evPower: 500 },
    { name: 'Sun', co2: 1600, evPower: 420 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border flex flex-col justify-between group hover:shadow-sm transition-all">
          <div className="text-sm font-medium text-muted-foreground mb-4">Fleet Avg MPG</div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">22.2</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
              <span><span className="text-emerald-500 font-medium">5.2%</span> from last week</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between group hover:shadow-sm transition-all">
          <div className="text-sm font-medium text-muted-foreground mb-4">Avg Liters/100km</div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">10.6</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
              <span><span className="text-emerald-500 font-medium">2.1%</span> from last week</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between group hover:shadow-sm transition-all">
          <div className="text-sm font-medium text-muted-foreground mb-4">Weekly CO₂ Emissions</div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">11.2<span className="text-xl text-muted-foreground ml-1">T</span></div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5 text-red-500 mr-1.5" />
              <span><span className="text-red-500 font-medium">8.3%</span> from last week</span>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border flex flex-col justify-between group hover:shadow-sm transition-all md:col-span-3 lg:col-span-1">
          <div className="text-sm font-medium text-muted-foreground mb-4">EV Power Consumption</div>
          <div>
            <div className="flex items-center text-4xl font-bold text-foreground tracking-tight mb-2">
              <Zap className="w-8 h-8 text-blue-500 mr-2" />
              3.6<span className="text-xl text-muted-foreground ml-1">MWh</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3.5 h-3.5 text-red-500 mr-1.5" />
              <span><span className="text-red-500 font-medium">12.4%</span> from last week</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-base font-semibold text-foreground mb-6">Efficiency Across Fleet</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defaultFuelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="mpg" name="MPG" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="liters" name="L/100km" fill="#f97316" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h3 className="text-base font-semibold text-foreground mb-6">Emissions Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={defaultEmissionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dx={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="co2"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--card))', stroke: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
                name="CO₂ (kg)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="evPower"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--card))', stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
                name="EV Power (kWh)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
