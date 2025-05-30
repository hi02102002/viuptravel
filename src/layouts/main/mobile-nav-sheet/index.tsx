'use client'

import type { TNavLink } from '../types'
import type { TNavigationState } from './types'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { getHeaderQueryOptions } from '@/libs/query-options'
import { MenuLevel } from './menu-level'

export function MobileNavSheet() {
  const { data: header } = useQuery(getHeaderQueryOptions)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const [navigationState, setNavigationState] = useState<TNavigationState>({
    path: [{
      id: 'root',
      label: 'Menu',
      blockType: 'nav-link-1',
      child_links: (header?.['nav-links'] as any) ?? [],
    }],
    direction: 'forward',
  })

  const currentLevel = navigationState.path[navigationState.path.length - 1]
  const currentItems = currentLevel.child_links || []
  const canGoBack = navigationState.path.length > 1

  const handleNavigate = useCallback((navLink: TNavLink) => {
    if (navLink.child_links && navLink.child_links.length > 0) {
      setNavigationState(prev => ({
        direction: 'forward',
        path: [...prev.path, navLink],
      }))
      return
    }
    setOpen(false)
  }, [])

  const handleBack = useCallback(() => {
    if (!canGoBack) {
      return
    }

    setNavigationState(prev => ({
      path: prev.path.slice(0, -1),
      direction: 'backward',
    }))
  }, [canGoBack])

  const resetNavigation = useCallback(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setNavigationState({
      direction: 'forward',
      path: [{
        id: 'root',
        label: 'Menu',
        blockType: 'nav-link-1',
        child_links: (header?.['nav-links'] ?? []) as any,
      }],
    })
  }, [header])

  const levelKey = useMemo(() => navigationState.path.map(item => item.id).join('-'), [navigationState.path])

  useEffect(() => {
    if (isMobile) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!open) {
      resetNavigation()
    }
  }, [open, resetNavigation])

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="p-1 !px-1 relative w-10 h-10 md:hidden"
          aria-label="Toggle main menu"
          aria-expanded={open}
        >
          <span className="sr-only">Open main menu</span>
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                open ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                open ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 overflow-hidden w-full sm:max-w-sm"
        close={null}
      >
        <div className="relative h-full overflow-hidden">
          <AnimatePresence
            custom={navigationState.direction}
          >
            <MenuLevel
              key={levelKey}
              onNavigate={handleNavigate}
              onBack={handleBack}
              canGoBack={canGoBack}
              title={currentLevel.label}
              direction={navigationState.direction}
              levelKey={levelKey}
              navLinks={currentItems as unknown as TNavLink[]}
              onClose={() => setOpen(false)}
            />
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  )
}
