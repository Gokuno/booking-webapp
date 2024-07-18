import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function Hero() {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image
          alt="doctores"
          src="/doctores.jpg"
          width={800}
          height={800}
          className="absolute inset-0 h-full rounded-2xl w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Encuentra a 
            <span className='text-primary'> Doctores </span>Especialistas</h2>

        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
          eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius
          quidem quam repellat.
        </p>
        <a href='https://1upwebdesigns.com/contacto/' target='_blank' rel='noopener noreferrer'>
        <Button className='mt-10 transition transform hover:scale-105 duration-200'>
            Ver Mas
        </Button>
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero