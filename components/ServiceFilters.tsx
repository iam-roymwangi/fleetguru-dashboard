'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

interface ServiceFiltersProps {
    onFilterChange: (filters: {
        priority: string[]
        status: string[]
        serviceType: string[]
        dateRange: string
    }) => void
}

export function ServiceFilters({ onFilterChange }: ServiceFiltersProps) {
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([])
    const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([])
    const [dateRange, setDateRange] = useState('all')

    const priorities = ['Critical', 'High', 'Medium', 'Low']
    const statuses = ['Overdue', 'Due Soon', 'Scheduled', 'In Progress']
    const serviceTypes = ['Maintenance', 'Inspection', 'Repair', 'Oil Change', 'Tire Rotation']
    const dateRanges = [
        { label: 'All', value: 'all' },
        { label: 'This Week', value: 'week' },
        { label: 'This Month', value: 'month' },
        { label: 'Next 3 Months', value: 'quarter' },
    ]

    const handlePriorityChange = (priority: string) => {
        const updated = selectedPriorities.includes(priority)
            ? selectedPriorities.filter((p) => p !== priority)
            : [...selectedPriorities, priority]
        setSelectedPriorities(updated)
        onFilterChange({ priority: updated, status: selectedStatus, serviceType: selectedServiceTypes, dateRange })
    }

    const handleStatusChange = (status: string) => {
        const updated = selectedStatus.includes(status)
            ? selectedStatus.filter((s) => s !== status)
            : [...selectedStatus, status]
        setSelectedStatus(updated)
        onFilterChange({ priority: selectedPriorities, status: updated, serviceType: selectedServiceTypes, dateRange })
    }

    const handleServiceTypeChange = (type: string) => {
        const updated = selectedServiceTypes.includes(type)
            ? selectedServiceTypes.filter((t) => t !== type)
            : [...selectedServiceTypes, type]
        setSelectedServiceTypes(updated)
        onFilterChange({ priority: selectedPriorities, status: selectedStatus, serviceType: updated, dateRange })
    }

    const handleDateRangeChange = (range: string) => {
        setDateRange(range)
        onFilterChange({ priority: selectedPriorities, status: selectedStatus, serviceType: selectedServiceTypes, dateRange: range })
    }

    const clearAllFilters = () => {
        setSelectedPriorities([])
        setSelectedStatus([])
        setSelectedServiceTypes([])
        setDateRange('all')
        onFilterChange({ priority: [], status: [], serviceType: [], dateRange: 'all' })
    }

    const totalFilters = selectedPriorities.length + selectedStatus.length + selectedServiceTypes.length + (dateRange !== 'all' ? 1 : 0)

    return (
        <Card className="p-6 border-border bg-card space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Filters</h3>
                {totalFilters > 0 && (
                    <button
                        onClick={clearAllFilters}
                        className="text-xs text-primary hover:text-primary/80 transition flex items-center gap-1"
                    >
                        <X className="w-3 h-3" />
                        Clear all
                    </button>
                )}
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">Priority</label>
                    <div className="flex flex-wrap gap-2">
                        {priorities.map((priority) => (
                            <button
                                key={priority}
                                onClick={() => handlePriorityChange(priority)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${selectedPriorities.includes(priority)
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-foreground border-border hover:bg-muted'
                                    }`}
                            >
                                {priority}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">Status</label>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${selectedStatus.includes(status)
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-foreground border-border hover:bg-muted'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">Service Type</label>
                    <div className="flex flex-wrap gap-2">
                        {serviceTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleServiceTypeChange(type)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${selectedServiceTypes.includes(type)
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-foreground border-border hover:bg-muted'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">Time Range</label>
                    <div className="flex flex-wrap gap-2">
                        {dateRanges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => handleDateRangeChange(range.value)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${dateRange === range.value
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-transparent text-foreground border-border hover:bg-muted'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}
