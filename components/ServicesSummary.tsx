'use client'

import { Card } from '@/components/ui/card'
import { UpcomingService } from '@/lib/upcomingServicesData'
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react'

interface ServicesSummaryProps {
    services: UpcomingService[]
}

export function ServicesSummary({ services }: ServicesSummaryProps) {
    const criticalCount = services.filter((s) => s.priority === 'Critical').length
    const highCount = services.filter((s) => s.priority === 'High').length
    const overdue = services.filter((s) => s.status === 'Overdue').length
    const dueSoon = services.filter((s) => s.status === 'Due Soon').length
    const totalCost = services.reduce((sum, s) => sum + s.estimatedCost, 0)

    const summaryCards = [
        {
            label: 'Critical Priority',
            value: criticalCount,
            icon: AlertTriangle,
            color: 'text-red-400 bg-red-500/10',
            borderColor: 'border-red-500/30',
        },
        {
            label: 'High Priority',
            value: highCount,
            icon: Clock,
            color: 'text-orange-400 bg-orange-500/10',
            borderColor: 'border-orange-500/30',
        },
        {
            label: 'Overdue Services',
            value: overdue,
            icon: AlertTriangle,
            color: 'text-red-400 bg-red-500/10',
            borderColor: 'border-red-500/30',
        },
        {
            label: 'Due Soon',
            value: dueSoon,
            icon: Clock,
            color: 'text-yellow-400 bg-yellow-500/10',
            borderColor: 'border-yellow-500/30',
        },
        {
            label: 'Total Services',
            value: services.length,
            icon: CheckCircle,
            color: 'text-green-400 bg-green-500/10',
            borderColor: 'border-green-500/30',
        },
        {
            label: 'Estimated Cost',
            value: `$${totalCost}`,
            icon: TrendingUp,
            color: 'text-primary bg-primary/10',
            borderColor: 'border-primary/30',
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {summaryCards.map((card) => {
                const Icon = card.icon
                return (
                    <Card
                        key={card.label}
                        className={`p-4 border ${card.borderColor} bg-card hover:bg-muted/50 transition`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">{card.label}</p>
                                <p className="text-2xl font-bold text-foreground mt-2">{card.value}</p>
                            </div>
                            <div className={`p-2 rounded-lg ${card.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
