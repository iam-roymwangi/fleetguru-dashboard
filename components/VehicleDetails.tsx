'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Vehicle } from '@/lib/vehicleData'
import { User, MapPin, Wrench } from 'lucide-react'

interface VehicleDetailsProps {
    vehicle: Vehicle
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
    const detailGroups = [
        {
            title: 'Vehicle Information',
            items: [
                { label: 'Make & Model', value: `${vehicle.make} ${vehicle.model}` },
                { label: 'Display Name', value: vehicle.displayName || 'N/A' },
                { label: 'VIN', value: vehicle.vin },
                { label: 'License Plate', value: vehicle.licensePlate || 'N/A' },
            ],
        },
        {
            title: 'Technical Details',
            items: [
                { label: 'Body Type', value: vehicle.bodyType },
                { label: 'Transmission', value: vehicle.transmissionType },
                { label: 'Fuel Type', value: vehicle.fuelType },
                { label: 'Spare Tire', value: vehicle.spareTire },
            ],
        },
        {
            title: 'Management',
            items: [
                { label: 'Vehicle Type', value: vehicle.vehicleType },
                { label: 'Possession', value: vehicle.possession },
                { label: 'Vehicle Group', value: vehicle.vehicleGroup || 'N/A' },
                { label: 'Status', value: vehicle.vehicleStatus },
            ],
        },
        {
            title: 'People',
            items: [
                { label: 'Assigned Person', value: vehicle.assignedPerson || 'Unassigned', icon: User },
                { label: 'Responsible Person', value: vehicle.responsiblePerson || 'N/A', icon: MapPin },
                { label: 'Vehicle Manager', value: vehicle.vehicleManager || 'N/A', icon: Wrench },
            ],
        },
    ]

    return (
        <div className="space-y-4">
            {detailGroups.map((group, idx) => (
                <Card key={idx} className="p-4 bg-muted/50 border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{group.title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {group.items.map((item, i) => (
                            <div key={i}>
                                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                                <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    )
}
