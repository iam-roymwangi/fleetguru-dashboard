'use client'

import { useState } from 'react'
import { Truck, AlertCircle, Zap, Navigation } from 'lucide-react'
import { KPICard } from '@/components/KPICard'
import { FleetStatusChart } from '@/components/FleetStatusChart'
import { AlertPriority } from '@/components/AlertPriority'
import { TrendChart } from '@/components/TrendChart'
import { StatusBars } from '@/components/StatusBars'
import { MetricGrid } from '@/components/MetricGrid'
import { IssuesList } from '@/components/IssuesList'
import { FuelEfficiencyTab } from '@/components/FuelEfficiencyTab'
import { MaintenancePredictiveHub } from '@/components/MaintenancePredictiveHub'
import { DriverBehaviorScorecard } from '@/components/DriverBehaviorScorecard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data with static values to prevent hydration mismatch
const kpiTrendData = [
  { value: 15 },
  { value: 18 },
  { value: 22 },
  { value: 19 },
  { value: 25 },
  { value: 28 },
  { value: 32 },
]

const alertsTrendData = [
  { value: 12 },
  { value: 15 },
  { value: 18 },
  { value: 14 },
  { value: 20 },
  { value: 22 },
  { value: 24 },
]

const issuesTrendData = [
  { value: 5 },
  { value: 7 },
  { value: 6 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 4 },
]

const assignedTrendData = [
  { value: 0 },
  { value: 1 },
  { value: 0 },
  { value: 2 },
  { value: 1 },
  { value: 0 },
  { value: 0 },
]

const fleetStatusData = [
  { name: 'Active', value: 10, color: '#10b981' },
  { name: 'In Maintenance', value: 4, color: '#f59e0b' },
  { name: 'Idle', value: 8, color: '#6b7280' },
]

const co2TrendData = [
  { name: 'Mon', value: 1200 },
  { name: 'Tue', value: 1450 },
  { name: 'Wed', value: 1100 },
  { name: 'Thu', value: 1900 },
  { name: 'Fri', value: 2100 },
  { name: 'Sat', value: 1800 },
  { name: 'Sun', value: 1600 },
]

const vehicleStatusData = [
  { name: 'PEUGEOT 3008', value: 180 },
  { name: 'MERCEDES BENZ E-CLASS', value: 320 },
  { name: 'BMW 3 SERIES', value: 210 },
]

const tireStatusData = [
  { name: 'Summer Tires', value: 22 },
  { name: 'All-Season Tires', value: 18 },
  { name: 'Winter Tires', value: 14 },
]

const alerts = [
  {
    id: '1',
    message: 'Unusual driving alarm (low)',
    severity: 'info' as const,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    message: 'Compliance was exceeded (low)',
    severity: 'info' as const,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    message: 'Compliance has expired. Mandatory document',
    severity: 'critical' as const,
    timestamp: '1 day ago',
  },
  {
    id: '4',
    message: 'Compliance driving room. State vehicle inspection',
    severity: 'warning' as const,
    timestamp: '2 days ago',
  },
  {
    id: '5',
    message: 'Compliance has expired. Vehicle operating taxi',
    severity: 'critical' as const,
    timestamp: '3 days ago',
  },
  {
    id: '6',
    message: 'Device shutdown. Integrating due service',
    severity: 'warning' as const,
    timestamp: '4 days ago',
  },
  {
    id: '7',
    message: 'Device manual sleep job service',
    severity: 'critical' as const,
    timestamp: '5 days ago',
  },
  {
    id: '8',
    message: 'Brake pad life advisory',
    severity: 'info' as const,
    timestamp: '6 days ago',
  },
  {
    id: '9',
    message: 'Trailer card is expired',
    severity: 'critical' as const,
    timestamp: '1 week ago',
  },
  {
    id: '10',
    message: 'Trans waiting for driver confirmation',
    severity: 'warning' as const,
    timestamp: '1 week ago',
  },
]

const issuesData = [
  {
    id: 'ISS-001',
    title: 'Engine Coolant Low',
    vehicle: 'MERCEDES BENZ E-CLASS',
    importance: 'high' as const,
    status: 'open' as const,
    timeAgo: '10 mins ago',
  },
  {
    id: 'ISS-002',
    title: 'Brake Pad Replacement Required',
    vehicle: 'BMW 3 SERIES',
    importance: 'high' as const,
    status: 'open' as const,
    timeAgo: '2 hours ago',
  },
  {
    id: 'ISS-003',
    title: 'Tire Pressure Warning',
    vehicle: 'PEUGEOT 3008',
    importance: 'medium' as const,
    status: 'in_progress' as const,
    timeAgo: '1 day ago',
  },
  {
    id: 'ISS-004',
    title: 'Scheduled Oil Change',
    vehicle: 'FORD TRANSIT',
    importance: 'medium' as const,
    status: 'open' as const,
    timeAgo: '2 days ago',
  },
  {
    id: 'ISS-005',
    title: 'Minor Scratch on Side Door',
    vehicle: 'VOLKSWAGEN GOLF',
    importance: 'low' as const,
    status: 'open' as const,
    timeAgo: '5 days ago',
  },
  {
    id: 'ISS-006',
    title: 'Wiper Blade Replacement',
    vehicle: 'AUDI A4',
    importance: 'low' as const,
    status: 'resolved' as const,
    timeAgo: '1 week ago',
  }
]

const metrics = [
  { label: 'Vehicle Health Score', value: '92', progress: 92, change: 5, unit: '%' },
  { label: 'Compliance Rate', value: '87', progress: 87, change: -2, unit: '%' },
  { label: 'Avg Mileage per Vehicle', value: '235', change: 12, unit: 'km' },
  { label: 'Total Open Issues', value: 24, change: -8, unit: 'issues' },
]

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('month')
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Good morning, Roy! 👋</h1>
              <p className="text-muted-foreground mt-1">Fleet Performance Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground text-sm hover:bg-accent transition"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <ThemeToggle />
              <Button className="bg-primary hover:bg-primary/90">Refresh</Button>
              <Button variant="outline" className="border-border text-muted-foreground">
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card/50">
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-border rounded-none p-0 h-auto w-full justify-start">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="fuel"
                className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Consumption & Emissions
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Maintenance Predictive
              </TabsTrigger>
              <TabsTrigger
                value="driver"
                className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Driver Behavior
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Top Priority Section: Fleet Status, Alerts, Issues */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
              {/* Fleet Status */}
              <div className="xl:col-span-3">
                <FleetStatusChart data={fleetStatusData} />
              </div>

              {/* Alert Priority */}
              <div className="xl:col-span-3">
                <AlertPriority alerts={alerts} />
              </div>

              {/* Issues */}
              <div className="xl:col-span-6">
                <IssuesList issues={issuesData} />
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <KPICard
                title="Vehicles Total"
                value="10"
                change={0}
                trend={kpiTrendData}
                icon={<Truck className="w-6 h-6 text-foreground" />}
                color="bg-primary"
              />
              <KPICard
                title="Active Alerts"
                value="24"
                change={8}
                trend={alertsTrendData}
                icon={<AlertCircle className="w-6 h-6 text-foreground" />}
                color="bg-red-500"
              />
              <KPICard
                title="Vehicle Issues"
                value="4"
                change={-2}
                trend={issuesTrendData}
                icon={<Zap className="w-6 h-6 text-foreground" />}
                color="bg-amber-500"
              />
              <KPICard
                title="Issues Assigned to Me"
                value="0"
                change={0}
                trend={assignedTrendData}
                icon={<Navigation className="w-6 h-6 text-foreground" />}
                color="bg-green-500"
              />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Key Metrics</h3>
                <MetricGrid metrics={metrics} />
              </Card>
            </div>

            {/* Trend Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <TrendChart title="CO2 Footprint Trend" data={co2TrendData} color="#ef4444" unit=" kg" />
              <StatusBars title="Vehicle Mileage Overview" data={vehicleStatusData} color="#3b82f6" />
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Trip Confirmation</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Trips without assigned driver', status: 'critical' },
                    { label: 'Trips waiting for driver confirmation', status: 'warning' },
                    { label: 'Trips waiting for unit manager confirmation', status: 'info' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <div
                        className={`w-3 h-3 rounded-full ${item.status === 'critical'
                          ? 'bg-red-500'
                          : item.status === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-primary'
                          }`}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Tire Status</h3>
                <div className="space-y-3">
                  {tireStatusData.map((tire, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">{tire.name}</p>
                        <p className="text-xs text-muted-foreground">{tire.value} vehicles</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-muted-foreground">{tire.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>



            {/* Vehicle Health Checkups */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Vehicle Checkups</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'State pending checkups', count: 12, color: 'bg-red-500' },
                    { label: 'Scheduled routine checks', count: 8, color: 'bg-primary' },
                    { label: 'Recently completed', count: 28, color: 'bg-green-500' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Fuel Efficiency Tab */}
          <TabsContent value="fuel" className="space-y-8">
            <FuelEfficiencyTab />
          </TabsContent>

          {/* Maintenance Predictive Tab */}
          <TabsContent value="maintenance" className="space-y-8">
            <MaintenancePredictiveHub />
          </TabsContent>

          {/* Driver Behavior Tab */}
          <TabsContent value="driver" className="space-y-8">
            <DriverBehaviorScorecard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
