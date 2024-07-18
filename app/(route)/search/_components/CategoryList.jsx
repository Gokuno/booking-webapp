"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const params = usePathname();
    const category = params.split('/')[2];
    
    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp => {
            console.log(resp.data.data);
            setCategoryList(resp.data.data);
        });
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <header>
                {/* Your header content */}
            </header>
            <main className='flex-grow'>
                <div className='h-screen fixed mt-5 flex flex-col'>
                    <Command>
                        <CommandInput placeholder="Buscar..." />
                        <CommandList className="overflow-visible">
                            <CommandEmpty>Resultado no encontrado.</CommandEmpty>
                            <CommandGroup heading="Categorias">
                                {categoryList && categoryList.map((item, index) => (
                                    <CommandItem key={index} className="p-0">
                                        <Link href={'/search/' + item?.attributes?.Name}
                                            className={`p-2 flex gap-2
                                            text-[14px]                                
                                            items-center
                                            rounded-md cursor-pointer w-full
                                            ${category == item.attributes.Name && 'bg-green-50'}`}>
                                            <Image src={item.attributes?.Icon?.data.attributes?.url}
                                                alt='icon'
                                                width={25}
                                                height={25} />
                                            <label className={`hover:text-primary ${category == item.attributes.Name ? 'text-primary' : 'text-gray-900'}`}>{item.attributes.Name}</label>
                                        </Link>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            </main>
        </div>
    );
}

export default CategoryList;