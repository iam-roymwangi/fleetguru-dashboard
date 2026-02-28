'use client'

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

interface FleetStatusChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

export function FleetStatusChart({ data }: FleetStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="p-4 bg-card border-border h-full flex flex-col">
      <h3 className="text-base font-semibold text-foreground mb-2">Fleet Status Overview</h3>

      <div className="flex-1 flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={24}
              iconSize={8}
              formatter={(value, entry: any) => (
                <span className="text-[11px] text-muted-foreground ml-1">
                  {entry.payload.name} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {data.map((item) => (
            <div key={item.name} className="text-center bg-muted/30 rounded-lg p-2">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.name}</span>
              </div>
              <p className="text-lg font-bold text-foreground leading-tight">{item.value}</p>
              <p className="text-[10px] text-muted-foreground">
                {((item.value / total) * 100).toFixed(0)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
