import React from 'react'
import { DateRangePicker } from '../../../CommonComponents/FormInputs/DatePickers'

const DateSelect = () => {

  const isDate = JSON.parse(localStorage.getItem('peroid_date'))?true:false
 
  const handleChange = (e)=>{
          localStorage.setItem('peroid_date',JSON.stringify(e))
  }

  return (
    <div className='flex items-center gap-4 2xl:gap-6'>
        <div><p className='text-dark-color text-xs whitespace-nowrap 2xl:text-base'>Current period</p></div>
        <div className='max-w-[200px]'>
            <DateRangePicker  onChange={(_,date)=>handleChange(date)} />
        </div>
    </div>
  )
}

export default DateSelect