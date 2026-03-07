'use client'

import { UpcomingService } from '@/lib/upcomingServicesData'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Clock, Wrench } from 'lucide-react'

interface ServiceTimelineProps {
    services: UpcomingService[]
}

export function ServiceTimeline({ services }: ServiceTimelineProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical':
                return 'bg-red-500/10 text-red-500 border border-red-500/30'
            case 'High':
                return 'bg-orange-500/10 text-orange-500 border border-orange-500/30'
            case 'Medium':
                return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
            case 'Low':
                return 'bg-green-500/10 text-green-500 border border-green-500/30'
            default:
                return 'bg-muted text-muted-foreground'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Overdue':
                return <AlertCircle className="w-5 h-5 text-red-500" />
            case 'Due Soon':
                return <Clock className="w-5 h-5 text-orange-500" />
            case 'In Progress':
                return <Wrench className="w-5 h-5 text-primary" />
            case 'Scheduled':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-3">
            {services.map((service) => (
                <Card key={service.id} className="p-4 hover:bg-muted/50 transition border-border bg-card">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="mt-1">{getStatusIcon(service.status)}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-semibold text-foreground">{service.serviceName}</h4>
                                    <Badge variant="outline" className="text-xs">
                                        {service.serviceType}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{service.vehicleName}</p>
                                {service.notes && <p className="text-xs text-muted-foreground/80 mt-1">{service.notes}</p>}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(service.priority)} mb-2`}>
                                {service.priority}
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                {service.daysUntilDue === 0 ? 'Today' : `${service.daysUntilDue}d`}
                            </p>
                            <p className="text-xs text-muted-foreground">{new Date(service.dueDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="text-sm">
                            {service.assignedTechnician && (
                                <p className="text-muted-foreground">
                                    <span className="text-muted-foreground/70">Assigned to:</span> {service.assignedTechnician}
                                </p>
                            )}
                            <p className="text-foreground font-semibold">${service.estimatedCost}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                                Details
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Schedule
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
