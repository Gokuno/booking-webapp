import { Button } from '@/components/ui/button'
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


function DoctorDetail({doctor}) {
    const socialMediaList=[
        {
            id:1,
            icon:'/youtube.svg',
            url:''
        },
        {
            id:2,
            icon:'/linkedin.svg',
            url:''
        },
        {
            id:3,
            icon:'/twitter.svg',
            url:''
        },
        {
            id:4,
            icon:'/facebook.svg',
            url:''
        }
    ]
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'>
          {/* Doctor Image  */}
          <div>
              <Image src={doctor.attributes?.image?.data?.attributes?.url}
              width={200}
              height={200}
              alt='doctor-image'
              className='rounded-lg w-full h-[280px] object-cover'
              />
          </div>
         
               

         
        </div>
         <div className='p-3 border-[1px] rounded-lg mt-5'>
         <h2 className='font-bold text-[20px]'>About Me</h2>
    
       </div>
       </>
  )
}

export default DoctorDetail