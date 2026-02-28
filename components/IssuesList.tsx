'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Truck, ChevronRight } from 'lucide-react'

export type IssueImportance = 'high' | 'medium' | 'low'

export interface Issue {
    id: string
    title: string
    vehicle: string
    importance: IssueImportance
    status: 'open' | 'in_progress' | 'resolved'
    timeAgo: string
}

interface IssuesListProps {
    issues: Issue[]
}

const importanceConfig = {
    high: {
        label: 'High Priority',
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        indicator: 'bg-red-500'
    },
    medium: {
        label: 'Medium Priority',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        indicator: 'bg-amber-500'
    },
    low: {
        label: 'Low Priority',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        indicator: 'bg-blue-500'
    }
}

export function IssuesList({ issues }: IssuesListProps) {
    const getIssuesByImportance = (importance: IssueImportance) =>
        issues.filter(issue => issue.importance === importance)

    const titleLengthLimit = (title: string) => title.length > 28 ? title.substring(0, 28) + '...' : title

    const IssueCard = ({ issue }: { issue: Issue }) => {
        const config = importanceConfig[issue.importance]
        return (
            <div
                role="button"
                tabIndex={0}
                className="group relative flex flex-col p-3 rounded-xl border border-border bg-card/40 hover:bg-muted/60 transition-all cursor-pointer overflow-hidden hover:shadow-sm"
            >
                <div className={`absolute top-0 left-0 w-1 h-full ${config.indicator}`} />

                <div className="flex justify-between items-start mb-1.5 pl-2">
                    <Badge variant="outline" className={`${config.bg} ${config.color} ${config.border} border text-[10px] font-semibold px-1.5 py-0 h-4`}>
                        {issue.id}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {issue.timeAgo}
                    </span>
                </div>

                <h4 className="text-xs font-semibold text-foreground mb-1.5 pl-2 group-hover:text-primary transition-colors leading-snug pr-4">
                    {titleLengthLimit(issue.title)}
                </h4>

                <div className="flex items-center text-[10px] text-muted-foreground pl-2 mt-auto">
                    <Truck className="w-3 h-3 mr-1" />
                    <span className="truncate">{issue.vehicle}</span>
                </div>

                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
            </div>
        )
    }

    return (
        <Card className="p-4 bg-card border-border h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-foreground">Active Issues</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">By importance</p>
                </div>
                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 px-2 py-0.5">
                    {issues.length}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 overflow-auto pr-1">
                {(['high', 'medium', 'low'] as IssueImportance[]).map(importance => {
                    const config = importanceConfig[importance]
                    const columnIssues = getIssuesByImportance(importance)

                    return (
                        <div key={importance} className="flex flex-col gap-2 min-w-0">
                            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${config.indicator}`} />
                                    <span className="font-medium text-xs text-foreground">{config.label}</span>
                                </div>
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                                    {columnIssues.length}
                                </Badge>
                            </div>

                            <div className="flex flex-col gap-2 mt-1">
                                {columnIssues.slice(0, Math.min(columnIssues.length, 3)).map(issue => (
                                    <IssueCard key={issue.id} issue={issue} />
                                ))}
                                {columnIssues.length > 3 && (
                                    <div className="text-center text-[10px] text-muted-foreground py-1 bg-muted/20 rounded-lg border border-dashed border-border/50">
                                        +{columnIssues.length - 3} more
                                    </div>
                                )}
                                {columnIssues.length === 0 && (
                                    <div className="flex items-center justify-center p-4 border border-dashed rounded-xl border-border bg-muted/10 text-muted-foreground text-[10px]">
                                        None
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
