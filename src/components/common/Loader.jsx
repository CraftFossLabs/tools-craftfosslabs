import { Loader2, LoaderPinwheel, Waves } from 'lucide-react'
import React from 'react'

const Loader = ({text}) => {
  return (
    <span className='flex'>{text} <LoaderPinwheel className='animate-spin text-green-100'/> </span>
  )
}

export default Loader