import React, { useState } from 'react';
import { Button } from '../ui/button';

export const Modal = ({ open, setOpen, children }:{
    open: boolean,
    setOpen: (open: boolean) => void,
    children: React.ReactNode
}) => {

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
            <div className='absolute h-screen w-screen top-0 left-0' onClick={()=>(setOpen(false))} />
          <div className=" rounded-lg shadow-lg z-50">
            <div className="bg-background opacity-95 rounded-xl">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

