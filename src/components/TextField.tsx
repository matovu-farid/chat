import React from 'react'
interface Props {
  value: string,
  setValue: (string:string)=>void,
  placeholder: string,
  className?: string
}

const TextField = ({value,setValue,placeholder='',className}:Props) => {
  return (
    <input
    className={className + '  w-full max-w-md py-2 px-3 border-none bg-gray-700 outline-none text-white rounded-lg'}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
  )
}

export default TextField