"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {LogoutLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

function Header() {
    const Menu=[
        {
            id: 1,
            name: 'Incio',
            path: '/'
        },
        {
            id: 2,
            name: 'Explora',
            path: '/'
        },
        {
            id: 3,
            name: 'Contactanos',
            path: '/'
        }
    ]

    const {user} = useKindeBrowserClient();

    useEffect(() => {
        console.log(user);
    },[user])

  return (
    <div className='flex items-center justify-between p-5 shadow-sm'>
        <div className='flex items-center gap-10'>
           <Image 
                src='/logo.svg' 
                alt='logo' 
                width={180} 
                height={80} 
            />

            <ul className='md:flex gap-8 hidden'>
                {Menu.map((item, index) => (
                    <Link href={item.path}>
                    <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
        {user?
            <Image src={user?.picture} alt='profile-image'
            width={50}
            height={50} />
            //<LoginLink><Button>Empieza hoy</Button></LoginLink>
            :
            <LogoutLink><Button variant="outline">Salir</Button></LogoutLink>
        }
        
        
    </div>
  )
}

export default Header