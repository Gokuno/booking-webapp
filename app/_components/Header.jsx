import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Header = () => {
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
        <Button>Empieza hoy</Button>
    </div>
  )
}

export default Header