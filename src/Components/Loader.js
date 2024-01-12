import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({isLoading}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-25 flex justify-center items-center">
      <ClipLoader
        color={'#fc7b03'}
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
