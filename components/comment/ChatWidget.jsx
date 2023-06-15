import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/64d387a794cf5d49dc695fed/1h7d4jqle';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
    `;
    
    document.head.appendChild(s);
    
    return () => {
      // Clean up the added script when the component unmounts
      document.head.removeChild(s);
    };
  }, []);

  return (
    <div>
      {/* Your component's content */}
    </div>
  );
};

export default ChatWidget;
