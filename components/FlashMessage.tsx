import React from 'react';
import Lottie from 'lottie-react';
import premium from '../assets/lottie/premium.json';

const FlashMessage = ({ data, id, deleteFlash }) => {
  const [type, content] = data;
  return (
    <div className="backdrop-blur-[10px] bg-[#ffffff33] w-full h-full z-10 rounded-2xl flex justify-center items-center p-4 mb-4">
      <Lottie
        className="w-14 h-14"
        animationData={premium}
        loop={true}
        autoPlay={true}
        autoplay={true}
      />
      <p className="text-white text-xl font-semibold pr-3">{content}</p>
    </div>
  );
};

export default FlashMessage;
