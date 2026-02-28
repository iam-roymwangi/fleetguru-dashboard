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
        return 'bg-blue-500/10 border-blue-500/20 text-blue-500'
      default:
        return 'bg-slate-500/10 border-slate-500/20 text-muted-foreground'
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

  const displayAlerts = expanded ? alerts : alerts.slice(0, 5)

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Alert Priority</h3>
        <div className="flex gap-2">
          {critical.length > 0 && (
            <Badge variant="destructive" className="bg-red-500/20 text-red-500 border-red-500/30">
              {critical.length} Critical
            </Badge>
          )}
          {warning.length > 0 && (
            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
              {warning.length} Warning
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {displayAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border flex items-start gap-3 ${getSeverityColor(
              alert.severity
            )}`}
          >
            <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-75 mt-1">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {alerts.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 p-2 text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2 hover:bg-muted/50 rounded transition"
        >
          {expanded ? 'Show Less' : `Show ${alerts.length - 5} More`}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </Card>
  )
}
