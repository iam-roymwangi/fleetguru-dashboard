'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MileageFiltersProps {
    onFilterChange: (filters: {
        search: string
        vehicleType: string
        fuelType: string
        mileageMin: number
        mileageMax: number
    }) => void
}

export function MileageFilters({ onFilterChange }: MileageFiltersProps) {
    const [search, setSearch] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [fuelType, setFuelType] = useState('')
    const [mileageMin, setMileageMin] = useState(0)
    const [mileageMax, setMileageMax] = useState(100000)

    const handleFilterChange = () => {
        onFilterChange({
            search,
            vehicleType,
            fuelType,
            mileageMin,
            mileageMax,
        })
    }

    const handleReset = () => {
        setSearch('')
        setVehicleType('')
        setFuelType('')
        setMileageMin(0)
        setMileageMax(100000)
        onFilterChange({
            search: '',
            vehicleType: '',
            fuelType: '',
            mileageMin: 0,
            mileageMax: 100000,
        })
    }

    return (
        <div className="space-y-4 p-5 bg-card/50 backdrop-blur rounded-xl border border-border">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Filters</h3>
                {(search || vehicleType || fuelType || mileageMin > 0 || mileageMax < 100000) && (
                    <Button
                        onClick={handleReset}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-3 h-3 mr-1" />
                        Reset
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Search Vehicle</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="License plate or name..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                handleFilterChange()
                            }}
                            className="pl-9 bg-background border-border text-foreground text-sm focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vehicle Type</label>
                    <select
                        value={vehicleType}
                        onChange={(e) => {
                            setVehicleType(e.target.value)
                            handleFilterChange()
                        }}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                        <option value="">All Types</option>
                        <option value="Passenger car">Passenger Car</option>
                        <option value="Light commercial vehicle / van">Van</option>
                        <option value="Electric scooter">Scooter</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Fuel Type</label>
                    <select
                        value={fuelType}
                        onChange={(e) => {
                            setFuelType(e.target.value)
                            handleFilterChange()
                        }}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                        <option value="">All Fuels</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        Mileage Range: <span className="text-primary font-bold">{mileageMin.toLocaleString()} - {mileageMax.toLocaleString()} km</span>
                    </label>
                    <div className="space-y-4 pt-2 px-1">
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={mileageMin}
                            onChange={(e) => {
                                const val = Math.min(Number(e.target.value), mileageMax)
                                setMileageMin(val)
                                handleFilterChange()
                            }}
                            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={mileageMax}
                            onChange={(e) => {
                                const val = Math.max(Number(e.target.value), mileageMin)
                                setMileageMax(val)
                                handleFilterChange()
                            }}
                            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
