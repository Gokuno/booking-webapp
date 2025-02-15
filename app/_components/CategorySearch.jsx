"use client";
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    });
  };

  return (
    <div className='flex flex-col px-5 items-center gap-2 mb-10'>
      <h2 className='font-bold text-4xl tracking-wide'>
        Buscar
        <span className='text-primary'> Doctores</span>
      </h2>
      <h2 className='text-gray-600 text-xl'>
        Busca a tu Doctor y Aparta una Consulta
      </h2>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
        <Input type="text" placeholder="Buscar..." />
        <Button type="submit">
          <Search className='h-4 w-4 mr-2' />
          Buscar
        </Button>
      </div>

      {/* Display List of Category  */}
      <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6'>
        {categoryList.length > 0 ? categoryList.map((item, index) => index < 6 && (
          <Link
            href={'/search/' + item.attributes.Name}
            key={item.id} // Use item.id as key
            className='flex flex-col text-center items-center p-5 bg-slate-100 m-2 rounded-lg cursor-pointer gap-2 hover:scale-110 transition-all ease-in-out'
          >
            <Image
              src={item.attributes?.Icon?.data.attributes?.url}
              alt='icon'
              width={40}
              height={40}
            />
            <label className='text-primary text-sm'>{item?.attributes?.Name}</label>
          </Link>
        ))
          :
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index} // Still need key for this fallback
              className='bg-slate-200 m-2 w-[130px] h-[120px] rounded-lg animate-pulse'
            >
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CategorySearch;