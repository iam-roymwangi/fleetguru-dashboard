'use client'

import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'

interface TireConditionIndicatorProps {
    condition: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown'
    treadDepth: number | null
}

export function TireConditionIndicator({ condition, treadDepth }: TireConditionIndicatorProps) {
    const getColorClass = () => {
        switch (condition) {
            case 'excellent':
                return 'text-green-500 bg-green-500/10'
            case 'good':
                return 'text-emerald-500 bg-emerald-500/10'
            case 'fair':
                return 'text-yellow-500 bg-yellow-500/10'
            case 'poor':
                return 'text-red-500 bg-red-500/10'
            default:
                return 'text-slate-400 bg-slate-400/10'
        }
    }

    const getIcon = () => {
        switch (condition) {
            case 'excellent':
            case 'good':
                return <CheckCircle2 className="w-5 h-5" />
            case 'fair':
                return <AlertTriangle className="w-5 h-5" />
            case 'poor':
                return <AlertCircle className="w-5 h-5" />
            default:
                return null
        }
    }

    const getLabel = () => {
        switch (condition) {
            case 'excellent':
                return 'Excellent'
            case 'good':
                return 'Good'
            case 'fair':
                return 'Fair'
            case 'poor':
                return 'Poor'
            default:
                return 'Unknown'
        }
    }

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getColorClass()}`}>
            {getIcon()}
            <span>{getLabel()}</span>
            {treadDepth !== null && <span className="text-xs opacity-75">{treadDepth}mm</span>}
        </div>
    )
}
