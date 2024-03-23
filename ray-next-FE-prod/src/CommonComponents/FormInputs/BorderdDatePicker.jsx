import { DatePicker } from 'antd'
import React from 'react'
import './formInputStyle.scss'
const BorderdDatePicker = (props) => {
  return (
    <div className="h-[48px] border-[1.5px] w-full overflow-hidden flex items-center gap-3  focus-within:ring-[2px] focus-within:ring-blue transition-all border-border-gray rounded-xl ">
    <DatePicker {...props}  bordered={false} popupClassName='z-[99999]  '  className='w-full h-[48px] datepicker'/>
  </div>
  )
}

export default BorderdDatePicker