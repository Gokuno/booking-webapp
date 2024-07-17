import React from 'react'
import Image from 'next/image'
import moment from 'moment/moment'
import 'moment/locale/es'  // without this line it didn't work
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

moment.locale('es')


function BookingList({ bookingList, expired, updateRecord }) {

  const onDeleteBooking = (item) => {
    console.log(item);
    GlobalApi.deleteBooking(item.id).then(resp => {
      console.log(resp);
      if (resp) {
        toast('La cita selecionada ha sido eliminada!');
        updateRecord();
      }
    }).catch(error => {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking. Please try again.");
    });
  };

  return (
    <div>
      {bookingList && bookingList.map((item, index) => (
        <div className='flex gap-4 items-center border p-5 m-5 rounded-lg' key={index}>
          <Image src={item.attributes.doctor.data.attributes?.image?.data?.attributes?.url}
            className='rounded-full h-[100] w-[100] object-cover'
            width={100}
            height={100}
            alt='foto-de-doctor'
          />
          <div className='flex flex-col gap-3 w-full'>
            <h2 className='font-bold text-[18px] items-center flex justify-between mb-2'>
              {item.attributes.doctor.data.attributes.Name}
              {!expired && <CancelAppointment onContinueClick={() => onDeleteBooking(item)} />}
            </h2>
            <h2 className='flex gap-2 font-bold'>
              <Calendar className='text-primary h-5 w-5' />
              Dia: {moment(item.attributes.Date).format('LL')}
            </h2>
            <h2 className='flex gap-2 font-bold'>
              <Clock className='text-primary h-5 w-5' />
              Hora: {item.attributes.Time}
            </h2>
            <h2 className='flex gap-2 text-gray-800'>
              <MapPin className='text-primary h-5 w-5' />
              {item.attributes.doctor.data.attributes.Address}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;