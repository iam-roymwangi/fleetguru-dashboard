'use client'

import { Card } from '@/components/ui/card'
import { Vehicle } from '@/lib/vehicleData'
import { Truck, Zap } from 'lucide-react'

interface VehicleCardProps {
    vehicle: Vehicle
    isSelected: boolean
    onSelect: (vehicle: Vehicle) => void
}

export function VehicleCard({ vehicle, isSelected, onSelect }: VehicleCardProps) {
    const getFuelIcon = () => {
        if (vehicle.fuelType === 'Electric') {
            return <Zap className="w-4 h-4" />
        }
        return <Truck className="w-4 h-4" />
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-500/10 text-green-500 border-green-500/30'
            case 'Inactive':
                return 'bg-red-500/10 text-red-500 border-red-500/30'
            default:
                return 'bg-muted/50 text-muted-foreground border-border'
        }
    }

    return (
        <Card
            onClick={() => onSelect(vehicle)}
            className={`p-4 cursor-pointer transition-all duration-200 border-2 ${isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted'
                }`}
        >
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground truncate">
                            {vehicle.displayName || `${vehicle.make} ${vehicle.model}`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {vehicle.licensePlate || vehicle.vin.slice(0, 8)}
                        </p>
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(vehicle.vehicleStatus)}`}>
                        {vehicle.vehicleStatus}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        <p className="text-muted-foreground">Make</p>
                        <p className="text-foreground font-medium">{vehicle.make}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Model</p>
                        <p className="text-foreground font-medium">{vehicle.model}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Fuel</p>
                        <p className="text-foreground font-medium flex items-center gap-1">
                            {getFuelIcon()}
                            {vehicle.fuelType}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="text-foreground font-medium">{vehicle.transmissionType}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
