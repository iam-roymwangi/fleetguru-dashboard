'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export interface TireFilterState {
    conditions: string[]
    tireTypes: string[]
    status: string
    minTreadDepth: number | null
}

interface TireFiltersProps {
    filters: TireFilterState
    onFiltersChange: (filters: TireFilterState) => void
    vehicleCount: number
}

export function TireFilters({ filters, onFiltersChange, vehicleCount }: TireFiltersProps) {
    const conditions = ['excellent', 'good', 'fair', 'poor', 'unknown']
    const tireTypes = ['summer', 'winter', 'non-studded', 'all-terrain', 'studded']
    const statuses = ['all', 'mounted', 'stored']

    const toggleCondition = (condition: string) => {
        const updated = filters.conditions.includes(condition)
            ? filters.conditions.filter(c => c !== condition)
            : [...filters.conditions, condition]
        onFiltersChange({ ...filters, conditions: updated })
    }

    const toggleTireType = (type: string) => {
        const updated = filters.tireTypes.includes(type)
            ? filters.tireTypes.filter(t => t !== type)
            : [...filters.tireTypes, type]
        onFiltersChange({ ...filters, tireTypes: updated })
    }

    const resetFilters = () => {
        onFiltersChange({
            conditions: [],
            tireTypes: [],
            status: 'all',
            minTreadDepth: null,
        })
    }

    const hasActiveFilters = filters.conditions.length > 0 || filters.tireTypes.length > 0 || filters.status !== 'all' || filters.minTreadDepth !== null

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Filters</h3>
                {hasActiveFilters && (
                    <button onClick={resetFilters} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        Clear
                    </button>
                )}
            </div>

            <Card className="bg-card border-border p-4 space-y-4 shadow-sm">
                {/* Tire Status */}
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tire Status</p>
                    <div className="space-y-2">
                        {statuses.map(status => (
                            <label key={status} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value={status}
                                    checked={filters.status === status}
                                    onChange={() => onFiltersChange({ ...filters, status })}
                                    className="w-4 h-4 rounded accent-primary"
                                />
                                <span className="text-sm text-foreground capitalize">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tire Condition */}
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tire Condition</p>
                    <div className="space-y-2">
                        {conditions.map(condition => (
                            <label key={condition} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.conditions.includes(condition)}
                                    onChange={() => toggleCondition(condition)}
                                    className="w-4 h-4 rounded accent-primary"
                                />
                                <span className="text-sm text-foreground capitalize">{condition}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tire Type */}
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tire Type</p>
                    <div className="space-y-2">
                        {tireTypes.map(type => (
                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.tireTypes.includes(type)}
                                    onChange={() => toggleTireType(type)}
                                    className="w-4 h-4 rounded accent-primary"
                                />
                                <span className="text-sm text-foreground capitalize">{type.replace('-', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Minimum Tread Depth */}
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Min Tread Depth</p>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={filters.minTreadDepth || 0}
                            onChange={e => onFiltersChange({ ...filters, minTreadDepth: e.target.value ? parseFloat(e.target.value) : null })}
                            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-sm text-foreground min-w-fit">{filters.minTreadDepth || 0}mm</span>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                    {vehicleCount} vehicle{vehicleCount !== 1 ? 's' : ''} with tires
                </p>
            </Card>
        </div>
    )
}
