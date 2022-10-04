import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center p-3'>
      <div className='animate-spin rounded-full border-b-2 border-red-700 h-32 w-32'> </div>
    </div>
  );
}
export default Loader;