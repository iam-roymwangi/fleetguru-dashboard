'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertCircle, CheckCircle2, Clock, Activity, ShieldAlert, Wrench } from 'lucide-react'

interface MaintenancePredictiveHubProps {
  engineHoursData?: Array<{ vehicle: string; hours: number; lastService: string }>
  sensorData?: Array<{ name: string; value: number; status: string }>
}

export function MaintenancePredictiveHub({ engineHoursData, sensorData }: MaintenancePredictiveHubProps) {
  const defaultEngineData = engineHoursData || [
    { vehicle: 'PEUGEOT 3008', hours: 2450, lastService: '180 days ago' },
    { vehicle: 'MERCEDES BENZ', hours: 3120, lastService: '45 days ago' },
    { vehicle: 'BMW 3 SERIES', hours: 1890, lastService: '220 days ago' },
    { vehicle: 'AUDI A4', hours: 2680, lastService: '95 days ago' },
    { vehicle: 'VOLVO XC60', hours: 3450, lastService: '12 days ago' },
  ]

  const trendData = [
    { week: 'Week 1', oilTemp: 95, enginePressure: 45, batteryHealth: 92 },
    { week: 'Week 2', oilTemp: 98, enginePressure: 46, batteryHealth: 91 },
    { week: 'Week 3', oilTemp: 102, enginePressure: 47, batteryHealth: 89 },
    { week: 'Week 4', oilTemp: 106, enginePressure: 48, batteryHealth: 86 },
  ]

  const predictiveAlerts = [
    { id: 1, vehicle: 'PEUGEOT 3008', part: 'Oil Filter', risk: 'High', daysLeft: 8, action: 'Schedule Service' },
    { id: 2, vehicle: 'BMW 3 SERIES', part: 'Brake Pads', risk: 'Medium', daysLeft: 25, action: 'Monitor' },
    { id: 3, vehicle: 'AUDI A4', part: 'Air Filter', risk: 'High', daysLeft: 5, action: 'Replace Immediately' },
    { id: 4, vehicle: 'VOLVO XC60', part: 'Battery', risk: 'Low', daysLeft: 60, action: 'Plan Ahead' },
  ]

  const sensorStatus = [
    { name: 'Oil Pressure', value: 48, status: 'good', range: '45-60', unit: 'PSI' },
    { name: 'Coolant Temp', value: 92, status: 'good', range: '80-105', unit: '°C' },
    { name: 'Battery Voltage', value: 13.8, status: 'good', range: '13.5-14.5', unit: 'V' },
    { name: 'Fuel Efficiency', value: 22, status: 'warning', range: '24-28', unit: 'MPG' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm font-medium text-muted-foreground">Avg Engine Hours</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">2,835</div>
            <div className="text-xs text-muted-foreground">Fleet average</div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <div className="text-sm font-medium text-muted-foreground">Critical Alerts</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-500 tracking-tight mb-2">2</div>
            <div className="text-xs text-muted-foreground">Require immediate action</div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-4 h-4 text-amber-500" />
            <div className="text-sm font-medium text-muted-foreground">Maintenance Due</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-foreground tracking-tight mb-2">4</div>
            <div className="text-xs text-muted-foreground">Within 30 days</div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border flex flex-col justify-between hover:shadow-sm transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <div className="text-sm font-medium text-muted-foreground">Fleet Health</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-500 tracking-tight mb-2 flex items-baseline">
              94<span className="text-2xl ml-1">%</span>
            </div>
            <div className="text-xs text-muted-foreground">Strong operational status</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Spans 2 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-base font-semibold text-foreground mb-6">Engine Health Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="week"
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
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="oilTemp"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--card))', stroke: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--destructive))' }}
                  name="Oil Temp (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="batteryHealth"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--card))', stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                  name="Battery (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-foreground">Predictive Maintenance Alerts</h3>
            </div>

            <div className="space-y-3">
              {predictiveAlerts.map((alert) => (
                <div key={alert.id} className="group flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-transparent hover:border-border transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 rounded-full ${alert.risk === 'High' ? 'bg-red-500' :
                        alert.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{alert.vehicle}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.part} Issue Predicted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-medium text-foreground flex items-center justify-end gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        {alert.daysLeft} Days
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">Estimated timeline</div>
                    </div>
                    <button className="text-xs font-semibold px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-muted transition-colors whitespace-nowrap">
                      {alert.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Spans 1 */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-base font-semibold text-foreground mb-6">Current Sensor Status</h3>
            <div className="space-y-4">
              {sensorStatus.map((sensor, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {sensor.status === 'good' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className="text-sm font-medium text-foreground">{sensor.name}</span>
                    </div>
                    <span className={`text-sm font-bold ${sensor.status === 'good' ? 'text-foreground' : 'text-amber-500'}`}>
                      {sensor.value} <span className="text-xs text-muted-foreground font-medium">{sensor.unit}</span>
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden flex">
                    {/* Safe simulation of a range gauge, assuming roughly proportional limits for presentation */}
                    <div
                      className={`h-full ${sensor.status === 'good' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min((sensor.value / parseFloat(sensor.range.split('-')[1])) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-muted-foreground text-right">Target Range: {sensor.range}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-base font-semibold text-foreground mb-6">Engine Hours Hub</h3>
            <div className="space-y-4">
              {defaultEngineData.slice(0, 4).map((vehicle, idx) => (
                <div key={idx} className="flex flex-col gap-2 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm text-foreground">{vehicle.vehicle}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Serviced {vehicle.lastService}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-foreground">{vehicle.hours.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground">Hours</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${(vehicle.hours / 4000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
