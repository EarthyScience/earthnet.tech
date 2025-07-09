import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Separator } from "@/components/ui/separator"

type MenuItem = {
  text: string
  link?: string
  description?: string
  items?: MenuItem[]
  isHome?: boolean
  name?: string
}

type MobileMenuProps = {
  items: MenuItem[]
  onLinkClick?: () => void
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { onLinkClick?: () => void }
>(({ className, title, children, onLinkClick, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={props.href ?? "#"}
      className={cn(
        "block select-none rounded-md p-3 text-sm no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={onLinkClick}
      {...props}
    >
      <div className="font-medium text-foreground">{title}</div>
      {children && (
        <p className="text-sm text-muted-foreground">
          {children}
        </p>
      )}
    </Link>
  )
})
ListItem.displayName = "ListItem"

const MobileMenu = ({ items, onLinkClick }: MobileMenuProps) => {
  return (
    <div className="px-4 py-2">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          item.items ? (
            <AccordionItem key={item.text} value={`item-${index}`}>
              <AccordionTrigger className="text-sm px-2 py-3">
                {item.text}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {item.isHome && item.description && (
                    <Link
                      href={item.link || '/'}
                      onClick={onLinkClick}
                      className="mb-4 rounded-lg bg-muted p-4 hover:bg-accent hover:text-accent-foreground"
                    >
                      <h3 className="mb-2 text-sm font-medium">
                        {item.name || item.text}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  )}
                  {item.items.map((subItem) => (
                    <ListItem
                      key={subItem.text}
                      href={subItem.link || '#'}
                      title={subItem.text}
                      onLinkClick={onLinkClick}
                    >
                      {subItem.description}
                    </ListItem>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ) : (
            <div key={item.text} className="py-1">
              <Link
                href={item.link || '#'}
                className="block rounded-md px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={onLinkClick}
              >
                {item.text}
              </Link>
              <div className="pt-1">
                <Separator />
              </div>
            </div>
          )
        ))}
      </Accordion>
    </div>
  )
}
export default MobileMenu