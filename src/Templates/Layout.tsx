import { useEffect, useRef } from 'react'

export const Layout = ({
  children,
  scrollOnNav = false,
  width
}: {
  children: React.ReactNode
  scrollOnNav?: boolean
  width?: string
}) => {
  useEffect(() => {
    scrollOnNav && scrollToTop()
  }, [children, scrollOnNav])

  const isBrowser = () => typeof window !== 'undefined'

  const scrollToTop = () => {
    if (!isBrowser()) return
    scrollContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }

  const scrollContainer = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 bg-[#bebdbd] transition-opacity">
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
          <div className="circle hidden md:block" />
        </div>

        <div className="fixed inset-0 z-10 overflow-y-auto md:backdrop-blur-3xl">
          <div
            ref={scrollContainer}
            className="flex min-h-full items-center justify-center py-7 text-center"
          >
            <>
              <div className={`overflowX-hidden relative mx-2 w-full transform rounded-2xl bg-background p-4 text-left shadow-2xl transition-all mb-10 md:mx-8 md:max-w-[${ width ? `${width}px` : '1000px'}] md:p-8 opacity-70`}>
                {children}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  )
}
