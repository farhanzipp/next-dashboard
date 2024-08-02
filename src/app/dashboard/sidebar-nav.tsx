"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type NavChildItem = {
    href: string;
    title: string;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
        children?: NavChildItem[];
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                
                className
            )}
            {...props}
        >
            {items.map((item) => (
                item.children ? (
                    <Accordion type="single" collapsible key={item.href} className="w-full">
                        <AccordionItem value={item.title} className="border-b-0">
                            <AccordionTrigger
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    pathname === item.href
                                        ? "bg-muted hover:bg-muted"
                                        : "hover:bg-transparent hover:underline",
                                    "justify-between"
                                )}
                            >
                                {item.title}
                            </AccordionTrigger>
                            {item.children.map((item) => (
                                <AccordionContent key={item.title} className="pb-0">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            pathname === item.href
                                                ? "bg-muted hover:bg-muted"
                                                : "hover:bg-transparent hover:underline",
                                            "justify-start w-full pl-12"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline",
                            "justify-start w-full"
                        )}
                    >
                        {item.title}
                    </Link>

                )
            ))}
        </nav>
    )
}