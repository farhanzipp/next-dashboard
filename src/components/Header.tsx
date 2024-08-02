import { navigation } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function Header() {
    return (
        <header className="relative inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div>
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span>Your Company</span>
                        {/* <Image
                            alt=""
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                            fill
                        /> */}
                    </Link>
                </div>
                <div className="flex gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
