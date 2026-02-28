'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react'

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
    { name: 'Oil Pressure', value: 48, status: 'good', range: '45-60' },
    { name: 'Coolant Temp', value: 92, status: 'good', range: '80-105' },
    { name: 'Battery Voltage', value: 13.8, status: 'good', range: '13.5-14.5' },
    { name: 'Fuel Efficiency', value: 22, status: 'warning', range: '24-28' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Avg Engine Hours</div>
          <div className="text-3xl font-bold text-blue-400">2,835</div>
          <div className="text-xs text-muted-foreground mt-1">Fleet average</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Critical Alerts</div>
          <div className="text-3xl font-bold text-red-400">2</div>
          <div className="text-xs text-red-400 mt-1">Require immediate action</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Maintenance Due Soon</div>
          <div className="text-3xl font-bold text-yellow-400">4</div>
          <div className="text-xs text-yellow-400 mt-1">Within 30 days</div>
        </Card>
        <Card className="p-4 bg-accent border-border">
          <div className="text-sm text-muted-foreground mb-1">Fleet Health</div>
          <div className="text-3xl font-bold text-green-400">94%</div>
          <div className="text-xs text-green-400 mt-1">↑ 2% from last week</div>
        </Card>
      </div>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engine Health Metrics Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Line type="monotone" dataKey="oilTemp" stroke="#ef4444" strokeWidth={2} name="Oil Temp (°C)" />
            <Line type="monotone" dataKey="enginePressure" stroke="#f97316" strokeWidth={2} name="Engine Pressure (PSI)" />
            <Line type="monotone" dataKey="batteryHealth" stroke="#10b981" strokeWidth={2} name="Battery Health (%)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Current Sensor Status</h3>
        <div className="space-y-3">
          {sensorStatus.map((sensor, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-accent rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {sensor.status === 'good' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <div className="font-semibold text-foreground">{sensor.name}</div>
                  <div className="text-xs text-muted-foreground">Range: {sensor.range}</div>
                </div>
              </div>
              <div className={`text-lg font-bold ${sensor.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}>
                {sensor.value}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Predictive Maintenance Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-muted-foreground">Vehicle</th>
                <th className="text-left py-2 px-3 text-muted-foreground">Part</th>
                <th className="text-left py-2 px-3 text-muted-foreground">Risk Level</th>
                <th className="text-left py-2 px-3 text-muted-foreground">Days Left</th>
                <th className="text-left py-2 px-3 text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {predictiveAlerts.map((alert) => (
                <tr key={alert.id} className="border-b border-border hover:bg-accent/50">
                  <td className="py-3 px-3 text-foreground">{alert.vehicle}</td>
                  <td className="py-3 px-3 text-muted-foreground">{alert.part}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      alert.risk === 'High' ? 'bg-red-900 text-red-200' :
                      alert.risk === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-green-900 text-green-200'
                    }`}>
                      {alert.risk}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-semibold">{alert.daysLeft}d</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <button className="text-blue-400 hover:text-blue-300 font-semibold text-xs">
                      {alert.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 bg-muted border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Fleet Engine Hours & Service History</h3>
        <div className="grid grid-cols-1 gap-3">
          {defaultEngineData.map((vehicle, idx) => (
            <div key={idx} className="p-4 bg-accent rounded-lg border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-foreground">{vehicle.vehicle}</div>
                  <div className="text-sm text-muted-foreground">Last service: {vehicle.lastService}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{vehicle.hours}</div>
                  <div className="text-xs text-muted-foreground">engine hours</div>
                </div>
              </div>
              <div className="mt-2 w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(vehicle.hours / 4000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
