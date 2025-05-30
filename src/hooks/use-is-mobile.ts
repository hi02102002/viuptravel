import { useEffect, useState } from 'react'
import { useUserAgent } from '@/providers/user-agent-provider'

const MOBILE_BREAKPOINT = 768

export function useIsMobile(
  breakpoint: number = MOBILE_BREAKPOINT,
) {
  const { useragent } = useUserAgent()
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  const isMobileFromUserAgent = useragent.device.type === 'mobile' || useragent.device.type === 'tablet'

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    mql.addEventListener('change', onChange)
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIsMobile(window.innerWidth < breakpoint)
    return () => mql.removeEventListener('change', onChange)
  }, [breakpoint])

  return isMobile !== undefined ? isMobile : isMobileFromUserAgent
}
