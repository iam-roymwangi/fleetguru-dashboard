'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface DriverBehaviorScorecardProps {
  driverData?: Array<{ name: string; score: number; incidents: number }>
  behaviorData?: Array<{ behavior: string; severity: number }>
}

export function DriverBehaviorScorecard({ driverData, behaviorData }: DriverBehaviorScorecardProps) {
  const defaultDriverData = driverData || [
    { name: 'Driver A', score: 92, incidents: 2 },
    { name: 'Driver B', score: 78, incidents: 8 },
    { name: 'Driver C', score: 88, incidents: 4 },
    { name: 'Driver D', score: 95, incidents: 1 },
    { name: 'Driver E', score: 81, incidents: 6 },
    { name: 'Driver F', score: 85, incidents: 5 },
  ]

  const defaultBehaviorData = [
    { behavior: 'Harsh Braking', severity: 24 },
    { behavior: 'Rapid Acceleration', severity: 18 },
    { behavior: 'Idling Time', severity: 32 },
    { behavior: 'Speeding', severity: 15 },
    { behavior: 'Sharp Turns', severity: 11 },
  ]

  const topDrivers = [
    { name: 'Driver D', score: 95, status: 'Excellent', incidents: 1, fuelSavings: '$2,450' },
    { name: 'Driver A', score: 92, status: 'Great', incidents: 2, fuelSavings: '$2,120' },
    { name: 'Driver C', score: 88, status: 'Good', incidents: 4, fuelSavings: '$1,890' },
  ]

  const concernedDrivers = [
    { name: 'Driver B', score: 78, status: 'Needs Improvement', incidents: 8, risk: 'High' },
    { name: 'Driver E', score: 81, status: 'Needs Improvement', incidents: 6, risk: 'Medium' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Fleet Safety Score</div>
          <div className="text-3xl font-bold text-blue-400">86.8</div>
          <div className="text-xs text-yellow-400 mt-1">↑ 3.2 pts this week</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Total Incidents</div>
          <div className="text-3xl font-bold text-red-400">26</div>
          <div className="text-xs text-red-400 mt-1">↓ 12% from last week</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Fuel Cost Savings</div>
          <div className="text-3xl font-bold text-green-400">$8.5K</div>
          <div className="text-xs text-green-400 mt-1">From safe driving habits</div>
        </Card>
      </div>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Driver Safety Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={defaultDriverData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Bar dataKey="score" fill="#10b981" name="Safety Score" />
            <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Unsafe Driving Behaviors</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={defaultBehaviorData}>
            <PolarGrid stroke="#475569" />
            <PolarAngleAxis dataKey="behavior" stroke="#94a3b8" />
            <PolarRadiusAxis stroke="#94a3b8" />
            <Radar name="Incidents" dataKey="severity" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6 bg-muted border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-green-400">Top Performers</h3>
          <div className="space-y-3">
            {topDrivers.map((driver, idx) => (
              <div key={idx} className="p-3 bg-accent rounded-lg border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-foreground">{driver.name}</div>
                    <div className="text-sm text-green-400">{driver.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">{driver.score}</div>
                    <div className="text-xs text-muted-foreground">{driver.incidents} incident(s)</div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Fuel savings: <span className="text-green-400 font-semibold">{driver.fuelSavings}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-muted border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-orange-400">Needs Improvement</h3>
          <div className="space-y-3">
            {concernedDrivers.map((driver, idx) => (
              <div key={idx} className="p-3 bg-accent rounded-lg border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-foreground">{driver.name}</div>
                    <div className="text-sm text-orange-400">{driver.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-400">{driver.score}</div>
                    <div className="text-xs text-muted-foreground">{driver.incidents} incident(s)</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Level:</span>
                  <span className={`text-sm font-semibold ${driver.risk === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {driver.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
