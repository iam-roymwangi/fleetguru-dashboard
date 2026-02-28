'use client'

import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface KPICardProps {
  title: string
  value: string | number
  change: number
  trend: Array<{ value: number }>
  icon?: React.ReactNode
  color?: string
}

export function KPICard({ title, value, change, trend, icon, color = 'bg-primary' }: KPICardProps) {
  const isPositive = change >= 0
  const trendColor = isPositive ? '#10b981' : '#ef4444'

  return (
    <Card className="p-6 bg-card border-border hover:border-border transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
        </div>
        {icon && (
          <div className={`${color} p-3 rounded-lg`}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={trend}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={trendColor}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </Card>
  )
}
