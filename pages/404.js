import React from 'react';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Image
      
        src="/images/404.jpg"
        alt="404"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: '#ffffff', // added color to text for better visibility
        }}
      >
      
      </div>
    </div>
  );
};

export default Custom404;
