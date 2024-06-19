// src/components/VideoPlayer.jsx

import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="">
      <div className="">
        <video className="w-full" controls loop={true}>
          <source src='/main.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
