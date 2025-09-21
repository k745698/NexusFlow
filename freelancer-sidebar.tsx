"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckCircle, Receipt, Settings, LogOut, Briefcase, Laptop } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CardanoLogo from './icons/cardano-logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/freelancer/dashboard', icon: Laptop, label: 'Assigned Projects' },
  { href: '/freelancer/dashboard/past-projects', icon: CheckCircle, label: 'Past Projects' },
  { href: '/freelancer/dashboard/transaction-history', icon: Receipt, label: 'Transactions' },
  { href: '/freelancer/dashboard/settings', icon: Settings, label: 'Settings' },
];

const NavLink = ({ item }: { item: typeof navItems[0] }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 ease-in-out hover:bg-primary/10 hover:text-primary hover:scale-110",
            isActive && "bg-primary text-primary-foreground scale-110 hover:bg-primary/90"
          )}
        >
          <item.icon className="h-6 w-6" />
          <span className="sr-only">{item.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-card/80 backdrop-blur-xl border-border/50 shadow-lg">
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
};


export default function FreelancerSidebar() {
  return (
    <TooltipProvider>
      <aside className="sticky top-0 left-0 flex h-screen w-20 flex-col border-r bg-background/50 backdrop-blur-xl p-2">
        <nav className="flex flex-col items-center gap-4 py-3">
            <Link
              href="/freelancer/dashboard"
              className="group flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full bg-card text-lg font-semibold text-primary-foreground"
            >
              <CardanoLogo className="h-8 w-8 text-primary transition-all group-hover:scale-110" />
              <span className="sr-only">VaultPay</span>
            </Link>
            <div className="h-px w-full bg-border my-2"></div>
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 py-3">
          <Tooltip>
            <TooltipTrigger asChild>
               <Link
                href="/"
                className="flex h-12 w-12 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:bg-destructive/10 hover:text-destructive hover:scale-110"
              >
                <LogOut className="h-6 w-6" />
                <span className="sr-only">Logout</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card/80 backdrop-blur-xl border-border/50 shadow-lg">
                Logout
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
