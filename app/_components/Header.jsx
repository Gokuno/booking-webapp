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
            name: 'Inicio',
            path: '/'
        },
        {
            id: 2,
            name: 'Explora',
            path: '/'
        },
        {
            id: 3,
            name: 'Contáctanos',
            path: '/'  // Ensure this is the correct path for your contact page
        }
    ];

    const { user } = useKindeBrowserClient();

    useEffect(() => {
        console.log('User:', user);
    }, [user]);

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getUserImage = () => {
        // Use default image if user.picture is not available or is blank
        return user?.picture && !user.picture.includes('blank') ? user.picture : '/user.png';
    };

    return (
        <div className='flex p-4 items-center justify-between shadow-sm'>
            <div className='flex items-center gap-10'>
                <Link href='/' onClick={handleLogoClick}>
                    <Image 
                        src='/logo.svg' 
                        alt='logo' 
                        width={200} 
                        height={120} 
                        className='cursor-pointer'
                    />
                </Link>

                <ul className='md:flex gap-8 hidden'>
                {Menu.filter(item => item.name !== 'Inicio' && item.name !== 'Explora' && item.name !== 'Contáctanos').map((item) => (
                        <Link key={item.id} href={item.path}>
                            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className='flex items-center gap-4'>
                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <Image 
                                src={getUserImage()} 
                                alt='profile-image'
                                width={40} 
                                height={40} 
                                className='rounded-full' 
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-44">
                            <ul className='flex flex-col gap-2'>
                                <Link href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Mi Agenda</Link>
                                <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                                    <LogoutLink> Salir </LogoutLink>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <LoginLink>
                        <Button className="transition transform hover:scale-105 duration-200">Empieza hoy</Button>
                    </LoginLink>
                )}
                <a href='https://1upwebdesigns.com/contacto/' target='_blank' rel='noopener noreferrer'>
                    <Button className='bg-white text-primary border border-primary hover:bg-primary-dark transition transform hover:scale-105 duration-200'>Contáctanos</Button>
                </a>
            </div>
        </div>
    );
}

export default Header;