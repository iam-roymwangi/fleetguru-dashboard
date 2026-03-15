'use client'

import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface EngineHoursFiltersProps {
  vehicles: Array<{ displayName: string; licensePlate: string; vehicleType: string }>
  onFiltersChange: (filters: FilterState) => void
}

export interface FilterState {
  searchQuery: string
  vehicleType: string | null
  engineHealthFilter: string | null
  hoursRange: [number, number]
}

export function EngineHoursFilters({ vehicles, onFiltersChange }: EngineHoursFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    vehicleType: null,
    engineHealthFilter: null,
    hoursRange: [0, 3000] as [number, number],
  })

  const vehicleTypes = [...new Set(vehicles.map((v) => v.vehicleType))]
  const healthStatuses = ['excellent', 'good', 'fair', 'warning']

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  return (
    <div className="w-full lg:w-64 space-y-4">
      <Card className="p-4 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h3>

        <div className="space-y-4">
          {/* Search */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Search Vehicle</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Name or license plate"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                className="pl-8 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Vehicle Type</label>
            <select
              value={filters.vehicleType || ''}
              onChange={(e) => handleFilterChange({ vehicleType: e.target.value || null })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground"
            >
              <option value="">All Types</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Engine Health */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Engine Health</label>
            <select
              value={filters.engineHealthFilter || ''}
              onChange={(e) => handleFilterChange({ engineHealthFilter: e.target.value || null })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground"
            >
              <option value="">All Status</option>
              {healthStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Engine Hours Range */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-3 block">
              Engine Hours: {filters.hoursRange[0]} - {filters.hoursRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="3000"
              value={filters.hoursRange[1]}
              onChange={(e) => handleFilterChange({ hoursRange: [0, parseInt(e.target.value)] as [number, number] })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Reset Button */}
          <Button
            onClick={() => {
              const newFilters = {
                searchQuery: '',
                vehicleType: null,
                engineHealthFilter: null,
                hoursRange: [0, 3000] as [number, number],
              }
              setFilters(newFilters)
              onFiltersChange(newFilters)
            }}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted"
          >
            Reset Filters
          </Button>
        </div>
      </Card>
    </div>
  )
}
