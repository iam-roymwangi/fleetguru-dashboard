'use client'

import { AlertCircle, AlertTriangle, Info, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

interface Alert {
  id: string
  message: string
  severity: 'critical' | 'warning' | 'info'
  timestamp: string
}

interface AlertPriorityProps {
  alerts: Alert[]
}

export function AlertPriority({ alerts }: AlertPriorityProps) {
  const [expanded, setExpanded] = useState(false)

  const critical = alerts.filter(a => a.severity === 'critical')
  const warning = alerts.filter(a => a.severity === 'warning')
  const info = alerts.filter(a => a.severity === 'info')

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/20 text-red-500'
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-500'
      case 'info':
        return 'bg-primary/10 border-primary/20 text-primary'
      default:
        return 'bg-muted border-border text-muted-foreground'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'info':
        return <Info className="w-4 h-4" />
      default:
        return null
    }
  }

  const displayAlerts = expanded ? alerts : alerts.slice(0, 3)

  return (
    <Card className="p-4 bg-card border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">Alert Priority</h3>
        <div className="flex gap-1.5">
          {critical.length > 0 && (
            <Badge variant="destructive" className="bg-red-500/20 text-red-500 border-red-500/30 text-[10px] px-1.5 py-0">
              {critical.length} Crit
            </Badge>
          )}
          {warning.length > 0 && (
            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px] px-1.5 py-0">
              {warning.length} Warn
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-auto pr-1">
        {displayAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${getSeverityColor(
              alert.severity
            )}`}
          >
            <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{alert.message}</p>
              <p className="text-[10px] opacity-75 mt-0.5">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {alerts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3 p-1.5 text-xs text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1.5 hover:bg-muted/50 rounded transition border border-transparent hover:border-border"
        >
          {expanded ? 'Show Less' : `Show ${alerts.length - 3} More`}
          <ChevronDown
            className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </Card>
  )
}
