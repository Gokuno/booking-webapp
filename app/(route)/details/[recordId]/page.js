"use client";

import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import DoctorDetail from '../_components/DoctorDetail'; // Ensure the path is correct

function Details({ params }) {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (params.recordId) {
      GlobalApi.getDoctorById(params.recordId)
        .then(resp => {
          setDoctor(resp.data.data);
        })
        .catch(error => {
          console.error('Error fetching doctor details:', error);
        });
    }
  }, [params.recordId]);

  return (
    <div className='p-5 md:px-10'>
      <h2 className='font-bold text-[22px]'>Details</h2>

      <div className='grid grid-cols-1 lg:grid-cols-4 '>
        {/* Doctor Detail  */}
        <div className='col-span-3'>
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        {/* Doctor Suggestion  */}
      </div>
    </div>
  );
}

export default Details;