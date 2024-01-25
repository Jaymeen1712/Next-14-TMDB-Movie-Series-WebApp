import React from "react";

const Logo = ({ size = 48 }: { size?: 48 | 72 | 128 }) => {
  return (
    <div
      className={"flex items-center justify-center"}
      style={{
        fontSize: `${size}px`,
      }}
    >
      <span className={`font-bold text-primary subpixel-antialiased`}>V</span>
      <span className="ml-1 font-bold -tracking-widest text-white">HD</span>
    </div>
  );
};

export default Logo;
