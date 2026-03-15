'use client'

import { Tire } from '@/lib/vehicleData'
import { TireConditionIndicator } from './TireConditionIndicator'
import { Card } from '@/components/ui/card'

interface TireVisualizationProps {
    tires: Tire[]
    vehicleModel: string
}

export function TireVisualization({ tires, vehicleModel }: TireVisualizationProps) {
    const getTireByPosition = (position: string) => {
        return tires.find(t => t.position === position)
    }

    const mountedTires = tires.filter(t => t.status === 'mounted')
    const storedTires = tires.filter(t => t.status === 'stored')

    return (
        <div className="space-y-6">
            {mountedTires.length > 0 && (
                <Card className="bg-card border-border p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6 text-foreground">Mounted Tires - {vehicleModel}</h3>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Front axle */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Front Left</p>
                            {getTireByPosition('front-left') ? (
                                <TireTile tire={getTireByPosition('front-left')!} />
                            ) : (
                                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground">
                                    No tire
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Front Right</p>
                            {getTireByPosition('front-right') ? (
                                <TireTile tire={getTireByPosition('front-right')!} />
                            ) : (
                                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground">
                                    No tire
                                </div>
                            )}
                        </div>

                        {/* Rear axle */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rear Left</p>
                            {getTireByPosition('rear-left') ? (
                                <TireTile tire={getTireByPosition('rear-left')!} />
                            ) : (
                                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground">
                                    No tire
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rear Right</p>
                            {getTireByPosition('rear-right') ? (
                                <TireTile tire={getTireByPosition('rear-right')!} />
                            ) : (
                                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground">
                                    No tire
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            )}

            {storedTires.length > 0 && (
                <Card className="bg-card border-border p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Stored Tires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {storedTires.map(tire => (
                            <div key={tire.id} className="border border-border rounded-lg p-4 bg-muted/30">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="font-semibold text-foreground">{tire.type.replace('-', ' ').toUpperCase()}</p>
                                        <p className="text-sm text-muted-foreground">{tire.size}</p>
                                    </div>
                                    <TireConditionIndicator condition={tire.condition} treadDepth={tire.treadDepth} />
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>{tire.manufacturer} {tire.model}</p>
                                    {tire.storageLocation && <p className="text-xs">📍 {tire.storageLocation}</p>}
                                    {tire.lastInspection && <p className="text-xs">Last inspected: {tire.lastInspection}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    )
}

function TireTile({ tire }: { tire: Tire }) {
    return (
        <div className="border-2 border-border rounded-lg p-4 bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{tire.type.replace('-', ' ').toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground mt-1">{tire.size}</p>
                    </div>
                    <TireConditionIndicator condition={tire.condition} treadDepth={tire.treadDepth} />
                </div>
                <p className="text-xs text-muted-foreground">{tire.manufacturer}</p>
            </div>
        </div>
    )
}
