"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardanoLogo from "@/components/icons/cardano-logo";
import { PlusCircle } from "lucide-react";

interface ClientHeaderProps {
    onNewProjectClick?: () => void;
}

export default function ClientHeader({ onNewProjectClick }: ClientHeaderProps) {
  // Mock balance
  const walletBalance = 1234.56;

  return (
    <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between border-b bg-background/50 backdrop-blur-xl px-4 md:px-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <CardanoLogo className="h-6 w-6 text-primary" />
          <span className="text-lg">1,234.56</span>
          <Badge variant="secondary">ADA</Badge>
        </div>
      </div>
      {onNewProjectClick && (
        <Button onClick={onNewProjectClick} className="bg-gradient-to-r from-accent to-primary text-primary-foreground hover:shadow-lg hover:brightness-110 transition-all">
          <PlusCircle className="mr-2 h-5 w-5" />
          New Project
        </Button>
      )}
    </header>
  );
}
