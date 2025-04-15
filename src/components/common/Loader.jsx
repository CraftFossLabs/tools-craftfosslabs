import { LoaderPinwheel } from 'lucide-react';
import React from 'react';

const Loader = ({ text }) => {
  return (
    <span className="flex  w-full justify-center items-center">
      {text} <LoaderPinwheel className="text-purple-600 animate-slide-x " />{' '}
    </span>
  );
};

export default Loader;
