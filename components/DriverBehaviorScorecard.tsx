'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { ShieldCheck, AlertTriangle, PiggyBank, Award, AlertCircle } from 'lucide-react'

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
    { behavior: 'Rapid Accel', severity: 18 },
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
      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <div className="text-sm font-medium text-muted-foreground">Fleet Safety Score</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">86.8</div>
            <div className="text-xs text-emerald-500 font-medium">+3.2 pts this week</div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <div className="text-sm font-medium text-muted-foreground">Total Incidents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">26</div>
            <div className="text-xs text-emerald-500 font-medium">-12% from last week</div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="w-4 h-4 text-primary" />
            <div className="text-sm font-medium text-muted-foreground">Fuel Cost Savings</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-500 tracking-tight mb-2">$8.5K</div>
            <div className="text-xs text-muted-foreground font-medium">From safe driving habits</div>
          </div>
        </Card>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column: Charts Span 2 */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-foreground">Driver Safety Scores</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={defaultDriverData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar yAxisId="left" dataKey="score" name="Safety Score" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar yAxisId="right" dataKey="incidents" name="Incidents" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-foreground">Unsafe Driving Behaviors Breakdown</h3>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={defaultBehaviorData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="behavior"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 'auto']}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Incident Severity"
                  dataKey="severity"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.4}
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
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Right Column: Lists Span 1 */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="p-6 bg-card border-border flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6 text-emerald-500">
              <Award className="w-5 h-5" />
              <h3 className="text-base font-semibold text-foreground">Top Performers</h3>
            </div>
            <div className="space-y-4 flex-1">
              {topDrivers.map((driver, idx) => (
                <div key={idx} className="group p-4 bg-muted/40 rounded-xl border border-transparent hover:border-border transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm text-foreground">{driver.name}</div>
                      <div className="text-xs text-emerald-500 font-medium">{driver.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">{driver.score}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{driver.incidents} Incidents</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Fuel Savings</span>
                    <span className="text-sm font-semibold text-emerald-500">{driver.fuelSavings}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Full Width Section */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-6 text-amber-500">
          <AlertCircle className="w-5 h-5" />
          <h3 className="text-base font-semibold text-foreground">Needs Improvement Watchlist</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concernedDrivers.map((driver, idx) => (
            <div key={idx} className="group flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-transparent hover:border-destructive/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-1.5 h-12 rounded-full ${driver.risk === 'High' ? 'bg-destructive' : 'bg-amber-500'}`} />
                <div>
                  <div className="font-semibold text-sm text-foreground">{driver.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{driver.status}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden sm:block text-right">
                  <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${driver.risk === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                    {driver.risk}
                  </span>
                </div>
                <div className="text-right w-16">
                  <div className="text-xl font-bold text-foreground">{driver.score}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{driver.incidents} Incidents</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}
