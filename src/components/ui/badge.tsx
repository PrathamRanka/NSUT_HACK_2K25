import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Risk severity badges
        critical: "border-[hsl(0,84%,60%)]/50 bg-[hsl(0,84%,60%)]/20 text-[hsl(0,84%,60%)]",
        high: "border-[hsl(25,95%,53%)]/50 bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]",
        medium: "border-[hsl(45,93%,47%)]/50 bg-[hsl(45,93%,47%)]/20 text-[hsl(45,93%,47%)]",
        low: "border-[hsl(142,71%,45%)]/50 bg-[hsl(142,71%,45%)]/20 text-[hsl(142,71%,45%)]",
        info: "border-[hsl(199,89%,48%)]/50 bg-[hsl(199,89%,48%)]/20 text-[hsl(199,89%,48%)]",
        // Status badges
        active: "border-[hsl(142,71%,45%)]/50 bg-[hsl(142,71%,45%)]/20 text-[hsl(142,71%,45%)]",
        monitoring: "border-[hsl(45,93%,47%)]/50 bg-[hsl(45,93%,47%)]/20 text-[hsl(45,93%,47%)]",
        investigating: "border-[hsl(25,95%,53%)]/50 bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]",
        flagged: "border-[hsl(0,84%,60%)]/50 bg-[hsl(0,84%,60%)]/20 text-[hsl(0,84%,60%)]",
        // Transaction type badges
        payment: "border-[hsl(199,89%,48%)]/50 bg-[hsl(199,89%,48%)]/20 text-[hsl(199,89%,48%)]",
        contract: "border-[hsl(262,83%,58%)]/50 bg-[hsl(262,83%,58%)]/20 text-[hsl(262,83%,58%)]",
        approval: "border-[hsl(142,71%,45%)]/50 bg-[hsl(142,71%,45%)]/20 text-[hsl(142,71%,45%)]",
        amendment: "border-[hsl(45,93%,47%)]/50 bg-[hsl(45,93%,47%)]/20 text-[hsl(45,93%,47%)]",
        advance: "border-[hsl(0,84%,60%)]/50 bg-[hsl(0,84%,60%)]/20 text-[hsl(0,84%,60%)]",
        milestone: "border-[hsl(199,89%,48%)]/50 bg-[hsl(199,89%,48%)]/20 text-[hsl(199,89%,48%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
