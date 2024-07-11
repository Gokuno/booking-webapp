"use client";

import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';

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
      <h2 className='font-bold text-2xl'>Detalles</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4 mt-5'>
        <div className='col-span-3'>
          {doctor && (
            <div>
              <p>{doctor.name}</p>
              {/* Render other doctor details as needed */}
            </div>
          )}
        </div>
        <div>
          {/* Placeholder for doctor suggestions */}
        </div>
      </div>
    </div>
  );
}

export default Details;