'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils'; 
import Button from '@/components/button';

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
            <Logo 
                width={45} 
                height={40} 
                alt="Logo" 
                href="/assets/images/globe.svg" 
                className="max-sm:hidden"
                color="transparent"
              />
            <span className="font-bold text-xl text-foreground">PKA</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="ml-6">
          <NavigationMenuList>
            {/* Home Link */}
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Dashboard Link */}
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Pricing Link */}
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Features Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-600 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                        href="/features"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          Features Overview
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Discover how Adbot powers your business with AI-driven chatbots.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        )}
                        href="/features/chatbot"
                      >
                        <div className="text-sm font-medium leading-none">Chatbot</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Build intelligent, conversational AI for customer support.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        )}
                        href="/features/analytics"
                      >
                        <div className="text-sm font-medium leading-none">Analytics</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Track chatbot performance and user engagement.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        )}
                        href="/features/integrations"
                      >
                        <div className="text-sm font-medium leading-none">Integrations</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Connect Adbot with your favorite tools.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login Button */}
        <div className="ml-auto">
          <Link href="/login">
                <Button variant="secondary" size="sm">  
                  Sign in
                 </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">  
               Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}