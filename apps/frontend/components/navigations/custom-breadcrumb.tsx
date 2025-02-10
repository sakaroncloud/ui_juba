import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbList } from '@repo/ui/components/breadcrumb'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Props = {
    items: {
        href?: string,
        label: string
    }[]
}

export const CustomBreadCrumb = ({ items }: Props) => {
    items.unshift({ href: "/", label: "Home" })
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, i) =>
                    <BreadcrumbItem key={i} className='text__small'>
                        {item.href ? (
                            <>
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink >
                                <ChevronRight />
                            </>
                        ) :
                            <BreadcrumbPage key={i}>{item.label}</BreadcrumbPage>
                        }
                    </BreadcrumbItem>
                )}

            </BreadcrumbList>
        </Breadcrumb>
    )
}
