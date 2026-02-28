'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface Metric {
  label: string
  value: string | number
  progress?: number
  change?: number
  unit?: string
}

interface MetricGridProps {
  metrics: Metric[]
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="p-4 bg-muted border-border hover:border-border transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            {metric.change !== undefined && (
              <div className="flex items-center gap-1">
                {metric.change >= 0 ? (
                  <ArrowUp className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-500" />
                )}
                <span className={metric.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(metric.change)}%
                </span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
            {metric.unit && <span className="text-sm text-muted-foreground">{metric.unit}</span>}
          </div>

          {metric.progress !== undefined && (
            <Progress value={metric.progress} className="h-1.5" />
          )}
        </Card>
      ))}
    </div>
  )
}
