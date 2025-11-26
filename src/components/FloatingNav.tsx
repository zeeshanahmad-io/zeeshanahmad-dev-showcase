import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FileText, Mail, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingNav = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', icon: Home, href: '/' },
        { name: 'Portfolio', icon: Briefcase, href: '/portfolio' },
        { name: 'Resume', icon: FileText, href: '/resume' },
        { name: 'Blog', icon: BookOpen, href: '/blog' },
        { name: 'Contact', icon: Mail, href: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center justify-between px-6 py-4 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl"
            >
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all duration-300 relative group",
                                active ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground hover:scale-105"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-colors",
                                active ? "bg-primary/10" : "group-hover:bg-muted"
                            )}>
                                <item.icon className={cn("w-5 h-5", active && "fill-current")} />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide opacity-80">{item.name}</span>

                            {active && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default FloatingNav;
