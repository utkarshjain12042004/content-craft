"use client";

import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import path from 'path'
import { usePathname } from 'next/navigation';
import UsageTrack from './UsageTrack';
import Link from 'next/link';

function SideNav() {
    const MenuList = [
        {
            name:'Home',
            icon:Home,
            path:'/dashboard'
        },
        {
            name:'History',
            icon:FileClock,
            path:'/dashboard/history'
        },
        // {
        //     name:'Billing',
        //     icon:WalletCards,
        //     path:'/dashboard/billing'
        // },
        {
            name:'Settings',
            icon:Settings,
            path:'/dashboard/settings'
        }
    ]

    const path = usePathname();

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
           <div className='flex justify-center'>
             <Image src={'/logo.svg'} alt='logo' width={120} height={100} />
            </div>
            <hr className='my-6 border'/>
            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <Link href={menu.path}>
                        <div 
                        className={`flex gap-2 mb-2 p-3 
                            hover:bg-purple-600 hover:text-white rounded-lg 
                            cursor-pointer items-center
                            ${path === menu.path && 'bg-purple-600 text-white'}
                            `}
                        >    
                            <menu.icon className='h-6 w-6'/>
                            <h2 className='text-lg'>{menu.name}</h2>
                            
                        </div>
                    </Link>
                ))}
            </div>

            {/* <div className='absolute bottom-10 left-0 w-full'>
                <UsageTrack/>
            </div> */}
        </div>
    )
}

export default SideNav