import React from 'react';
import { ReactSVG } from 'react-svg';


type Props = {
  prevPage: () => void;
  nextPage: () => void;
};


export const SliderButtons: React.FC<Props> = ({
   prevPage, nextPage,
}) => {
  return (
    <div>
      <button
        type='button'
        className='border border-[var(--text-gray)] p-2 mr-2 hover:scale-105 hover:bg-gray-100 transition-all duration-200'
        onClick={prevPage}
      >
        <ReactSVG src='/chevron-left.svg' />
      </button>

      <button
        type='button'
        className='border border-[var(--text-gray)] p-2 hover:scale-105 hover:bg-gray-100 transition-all duration-200'
        onClick={nextPage}
      >
        <ReactSVG src='/chevron-right.svg' />
      </button>
    </div>
  );
};
