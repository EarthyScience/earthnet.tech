import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { withBasePath } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type MenuItem = {
  text: string
  link?: string
  description?: string
  items?: MenuItem[]
  isHome?: boolean
  name?: string
}

type NavigationProps = {
  items: MenuItem[]
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium mb-1 text-foreground">{title}</div>
          {children && (
            <p className="text-sm leading-snug text-muted-foreground -m-3">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const DesktopMenu = ({ items }: NavigationProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.text}>
            {item.items ? (
              <>
                <NavigationMenuTrigger>{item.text}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.isHome ? (
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={item.link || '/'}
                          >
                            <div className="mb-4 text-lg text-foreground">
                               <Image src={withBasePath("/logo.png")} alt="logo" width={64} height={64} className="mr-4"/>
                            </div>
                            <div className="mb-2 text-lg font-medium var(--accent-1)">
                              {item.name}
                            </div>
                            {item.description && (
                              <p className="text-sm leading-tight text-muted-foreground -m-3">
                              {item.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ul className="col-span-1 space-y-2">
                        {item.items.map((subItem) => (
                          <ListItem
                            key={subItem.text}
                            title={subItem.text}
                            href={subItem.link || '#'}
                          >
                            {subItem.description}
                          </ListItem>
                        ))}
                      </ul>
                    </ul>
                  ) : (
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.text}
                          title={subItem.text}
                          href={subItem.link || '#'}
                        >
                        {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  )}
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link 
                  href={item.link || '#'} 
                  className={navigationMenuTriggerStyle()}
                >
                  {item.text}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default DesktopMenu