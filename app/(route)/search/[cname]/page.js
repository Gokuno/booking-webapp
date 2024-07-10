"use client"
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

function Search({params}) {

  const [doctorList, setDoctorList] = useState([]);

  useEffect(()=> {
    console.log(params)
    getDoctors();
  },[])

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(params.cname).then(resp=>{

      setDoctorList(resp.data.data);
    })
  }

  const decodedCname = decodeURIComponent(params.cname);
  return (
    <div>
      <DoctorList 
        heading={decodedCname}
        doctorList={doctorList}
        useCarousel={false}  // Pass useCarousel as false
      />
    </div>
  )
}

export default Search