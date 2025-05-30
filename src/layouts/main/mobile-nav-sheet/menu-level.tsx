/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { TNavLink } from '../types'
import type { TDirection } from './types'
import { ChevronRight, X } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getItemUrl } from '../utils'
import { slideVariants } from './animate-variants'

type TProps = {
  navLinks: TNavLink[]
  onNavigate: (navLink: TNavLink) => void
  onBack: () => void
  canGoBack: boolean
  direction: TDirection
  levelKey: string
  title: string
  onClose?: () => void
}

export function MenuLevel({ canGoBack, direction, levelKey, navLinks, onBack, onNavigate, title, onClose }: TProps) {
  return (
    <motion.div
      key={levelKey}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 w-full"
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      <SheetHeader
        className="flex items-center justify-between flex-row relative py-2 border-b h-14"
      >
        {canGoBack
          ? (
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
              >
                <ChevronRight className="h-6 w-6 rotate-180 flex-shrink-0 text-muted-foreground" />
              </Button>
            )
          : <div />}
        <SheetTitle
          className="absolute left-1/2 -translate-x-1/2 text-center font-semibold text-xl"
        >
          {title}
        </SheetTitle>
        <SheetClose
          className={buttonVariants({
            variant: 'ghost',
            size: 'icon',
          })}
        >
          <X
            className="h-6 w-6 flex-shrink-0 text-muted-foreground"
          />
        </SheetClose>
      </SheetHeader>
      <div className="space-y-1 py-2">
        {navLinks.map((navLink) => {
          return (
            <button
              key={navLink.id}
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-full justify-between h-auto !p-0 font-normal ',
              })}
              type="button"
              onClick={onClose}
            >
              <Link
                prefetch
                href={getItemUrl(navLink)}
                className="text-left font-medium flex-1 px-4 py-2"

              >
                {navLink.label}
              </Link>
              {navLink.child_links && navLink.child_links.length > 0 && (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  className="px-4 py-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate(navLink)
                  }}
                >
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground " />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
