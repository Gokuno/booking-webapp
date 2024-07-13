import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import BookAppointment from './BookAppointment';


function DoctorDetail({ doctor }) {
  const socialMediaList = [
    {
      id: 1,
      icon: '/youtube.svg',
      url: '',
    },
    {
      id: 2,
      icon: '/linkedin.svg',
      url: '',
    },
    {
      id: 3,
      icon: '/twitter.svg',
      url: '',
    },
    {
      id: 4,
      icon: '/facebook.svg',
      url: '',
    },
  ];

  // Function to extract text from the nested structure
  const extractText = (content) => {
    if (!Array.isArray(content)) return '';

    return content
      .map((item) => {
        if (item.type === 'paragraph' && Array.isArray(item.children)) {
          return item.children
            .map((child) => (child.type === 'text' ? child.text : ''))
            .join(' ');
        }
        return '';
      })
      .join(' ');
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
        {/* Doctor Image */}
        <div>
          <Image
            src={doctor.attributes?.image?.data?.attributes?.url || '/default-doctor-image.jpg'}
            width={200}
            height={200}
            alt='doctor-image'
            className='rounded-lg w-full h-[280px] object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 px-10 col-span-2 mt-5 items-baseline'>
          <h2 className='font-bold text-2xl'>{doctor.attributes?.Name || 'Doctor Name'}</h2>
          <h2 className='font-bold text-[14px] bg-violet-100 p-1 rounded-full px-2 text-primary mb-2'>
            {doctor.attributes?.categories?.data[0]?.attributes?.Name || 'Category'}
          </h2>
          <h2 className='flex gap-2 text-gray-800 text-md'>
            <GraduationCap />
            <span>{doctor.attributes?.Years_of_Experience || 'Years of Experience'}</span>
          </h2>
          <h2 className='flex gap-2 text-gray-800 text-md'>
            <MapPin />
            <span>{doctor.attributes?.Address || 'Address'}</span>
          </h2>
          <div className='flex flex-row gap-4 mt-5 mb-5'>
            {socialMediaList.map((item, index) => (
              <Image
                src={item.icon}
                key={index}
                width={30}
                height={30}
                alt={`social-icon-${index}`}
              />
            ))}
          </div>
          <BookAppointment doctor={doctor} /> 
        </div>
      </div>
      <div className='p-4 border-[1px] rounded-lg mt-5'>
        <h2 className='font-bold text-[20px]'>Experiencia</h2>
        <p className='text-gray-800 tracking-wider leading-[1.7rem] mt-4'>{extractText(doctor.attributes?.About) || 'No information available.'}</p>
      </div>
  
    </>
  );
}

export default DoctorDetail;