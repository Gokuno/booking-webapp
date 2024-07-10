"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogoutLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function Header() {
    const Menu = [
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

    const { user } = useKindeBrowserClient();

    useEffect(() => {
        console.log('User:', user);
    }, [user])

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
                    {Menu.map((item) => (
                        <Link key={item.id} href={item.path}>
                            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user ? (
                <>
                    <Popover>
                        <PopoverTrigger>
                            {user?.picture ? (
                                <Image 
                                    src={user.picture} 
                                    alt='profile-image'
                                    width={40}
                                    height={40}
                                    className='rounded-full' 
                                />
                            ) : (
                                <Image 
                                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' 
                                    alt='profile-image'
                                    width={40}
                                    height={40}
                                    className='rounded-full' 
                                />
                            )}
                        </PopoverTrigger>
                        <PopoverContent className="w-44">
                            <ul className='flex flex-col gap-2'>
                                <Link href='/my-booking' className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Mi reservacion</Link>
                                <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                                    <LogoutLink> Salir </LogoutLink>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </>
            ) : (
                <LoginLink>
                    <Button>Empieza hoy</Button>
                </LoginLink>
            )}
        </div>
    )
}

export default Header;