const Loading = () => {
  return (
    <div className="flex min-h-full items-center justify-center bg-neutral-900">
      {/* Logo Animation */}
      <div className="flex items-center justify-center text-7xl">
        <span className="font-bold text-primary ">V</span>
        <span className="ml-1 animate-pulse font-bold -tracking-widest text-white">
          HD
        </span>
      </div>
    </div>
  );
};

export default Loading;
