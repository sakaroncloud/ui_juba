"use client"
import { cn, generateSlug } from '@repo/ui/lib/utils'
import { ScrollArea, ScrollBar } from '@repo/ui/components/scroll-area'
import React from 'react'

type Props = {
    menus: {
        id: number,
        name: string
    }[],
    visibleMenu: string | number

}
export const SingleRestaurantMenuSidebar = ({ menus, visibleMenu }: Props) => {
    const MOBILE_BREAKPOINT = 1024
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
    const [isFixed, setIsFixed] = React.useState(false)
    const [lastScrollY, setLastScrollY] = React.useState(0) // To track scroll direction
    const sidebarRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

        mql.addEventListener("change", onResize)
        onResize() // Initial check

        return () => mql.removeEventListener("change", onResize)
    }, [])

    React.useEffect(() => {
        if (!isMobile) return

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (sidebarRef.current) {
                const { top } = sidebarRef.current.getBoundingClientRect()

                if (top <= 98 && currentScrollY > lastScrollY) {
                    setIsFixed(true) // Fix it when scrolling down past 98px
                } else if (currentScrollY < lastScrollY) {
                    setIsFixed(false) // Unfix it when scrolling up
                }

                setLastScrollY(currentScrollY)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isMobile, lastScrollY])

    return (
        <aside className='lg:w-[250px] w-full  relative'>
            <div
                ref={sidebarRef}
                className={cn(
                    "top-[98px] z-50 transition-all",
                    isMobile
                        ? isFixed
                            ? "fixed top-[80px]  bg-white shadow-md" // Stays fixed on scroll down
                            : "block" // Moves back to normal on scroll up
                        : "sticky"
                )}
            >
                <ScrollArea className='w-full'>
                    <div className='flex w-full lg:flex-col flex-row lg:px-0 '>
                        {menus?.map((menu, i) => {
                            const slug = generateSlug(menu.name)
                            return (
                                <a href={`#${slug}`} key={menu.id} className={cn('md:py-4 text__small w-fit lg:w-full shrink-0  bg-[#F9F8F6] lg:bg-white text-xs py-4 px-4 lg:border-b  lg:border-gray-200 hover:text-primary transition-all cursor-pointer  uppercase lg:font-semibold font-medium', i == menus.length - 1 && "border-b-0", i == 0 && "lg:pt-2", visibleMenu == slug && "text-primary")}>
                                    {menu.name}
                                </a>
                            )
                        }
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" hidden className='mt-1' />
                </ScrollArea>
            </div>
        </aside>
    )
}
