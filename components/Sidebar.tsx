'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutGrid, FileText, Menu, X, BarChart3, AlertTriangle, Settings, LogOut, ChevronLeft, ChevronRight, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const pathname = usePathname()

    const navItems = [
        {
            label: 'Dashboard',
            href: '/',
            icon: LayoutGrid,
        },
        {
            label: 'Reports',
            href: '/reports',
            icon: FileText,
        },
    ]

    const bottomItems = [
        {
            label: 'Settings',
            href: '/',
            icon: Settings,
        },
        {
            label: 'Logout',
            href: '/',
            icon: LogOut,
        },
    ]

    const isActive = (href: string) => pathname === href

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="fixed top-4 left-4 z-50 lg:hidden">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon"
                    variant="ghost"
                    className="bg-card/50 hover:bg-muted"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-40',
                    isCollapsed ? 'w-20' : 'w-64',
                    'lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Desktop Collapse Button */}
                <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    size="icon"
                    variant="ghost"
                    className="absolute -right-4 top-6 z-50 rounded-full border border-border bg-background hidden lg:flex h-8 w-8 hover:bg-muted focus:outline-none"
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : <ChevronLeft className="h-4 w-4 text-muted-foreground" />}
                </Button>

                {/* Logo/Brand */}
                <div className="p-6 border-b border-border min-h-[88px] flex items-center justify-center">
                    <Image
                        src="/images/fleet-logo.png"
                        alt="FleetGuru Logo"
                        width={150}
                        height={40}
                        className={cn("transition-all duration-300", isCollapsed ? "w-10 h-10 object-contain" : "w-auto h-8")}
                        priority
                    />
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href)
                        return (
                            <Link key={item.href} href={item.href} className="block">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'w-full flex items-center rounded-lg transition-colors duration-200',
                                        isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                                        active
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <Icon className={cn("w-5 h-5", isCollapsed ? "min-w-5 shrink-0" : "")} />
                                    {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                                </button>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Navigation */}
                <div className="p-4 border-t border-border space-y-2 overflow-x-hidden">
                    {bottomItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href)
                        return (
                            <Link key={item.href} href={item.href} className="block">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'w-full flex items-center rounded-lg transition-colors duration-200',
                                        isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                                        active
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <Icon className={cn("w-5 h-5", isCollapsed ? "min-w-5 shrink-0" : "")} />
                                    {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                                </button>
                            </Link>
                        )
                    })}
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Main Content Offset */}
            <div className={cn("hidden lg:block transition-all duration-300", isCollapsed ? "w-20" : "w-64")} />
        </>
    )
}
