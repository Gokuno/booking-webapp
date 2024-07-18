import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

function DoctorList({ doctorList, heading = 'Doctores Mas Frecuentados', useCarousel = true }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, //Increase the speed for a smoother transition
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in milliseconds
    cssEase: 'ease-in-out', // Use a smoother easing function
    responsive: [
      {
        breakpoint: 1024, // large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // medium screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // small screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderDoctor = (doctor, index) => (
    <div key={index} className='p-2'>
      <div className='border-[1px] rounded-lg p-2 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out'>
        <Image
          src={doctor.attributes?.image?.data?.attributes?.url}
          alt='doctor'
          width={500}
          height={200}
          className='h-[200px] w-full object-cover rounded-lg'
        />
        <div className='items-baseline flex flex-col gap-1'>
          <h2 className='font-medium text-[14px] bg-green-50 p-1 rounded-full px-2 text-primary'>
            {doctor.attributes?.categories?.data[0]?.attributes?.Name}
          </h2>
          <h2 className='font-semibold text-[14px]'>
            {doctor.attributes.Name}
          </h2>
          <h3 className='font-thin text-[12px] text-gray-700'>
            {doctor.attributes.Years_of_Experience}
          </h3>
          <Link href={`/details/${doctor?.id}`} className='w-full'>
          <h3 className='p-2 px-2 text-[12px] border-[1px] border-primary bg-primary text-white  rounded-full w-full text-center mt-2 cursor-pointer hover:bg-white hover:text-primary'>
            Reserva Consulta
          </h3>
          </Link> 
        </div>
      </div>
    </div>
  );

  return (
    <div className='mt-10 px-10 mb-20'>
      <h2 className='font-bold text-xl mb-5 text-center'>
        {heading}
      </h2>
      {useCarousel ? (
        <Slider {...settings}>
          {doctorList && doctorList.map(renderDoctor)}
        </Slider>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-4'>
          {doctorList && doctorList.map(renderDoctor)}
        </div>
      )}
    </div>
  );
}

export default DoctorList;