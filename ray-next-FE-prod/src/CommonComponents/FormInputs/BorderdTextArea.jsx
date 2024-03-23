import React from 'react'

const BorderdTextArea = ({rows=4,...rest}) => {
  return (
    <div className=' h-full   border-[1.5px] w-full overflow-hidden flex items-center gap-3  focus-within:ring-[2px] focus-within:ring-blue transition-all border-border-gray rounded-xl  '>
        <textarea {...rest} rows={rows}  className='resize-none h-full text-lg outline-none p-4 w-full'></textarea>
    </div>
  )
}

export default BorderdTextArea