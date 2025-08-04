import React from "react";

interface MovieListHeaderProps {
  title: string;
  headerRight?: React.ReactNode;
}

const MovieListHeader = ({ title, headerRight }: MovieListHeaderProps) => {
  return (
    <div>
      <div className="xs:flex-row xs:items-center xs:space-y-0 xs:space-x-4 flex flex-col space-y-2 sm:space-x-8">
        <h1 className="xs:text-xl text-lg font-bold text-white sm:text-2xl">
          {title}
        </h1>
        <div className="xs:justify-center flex items-center justify-start">
          {headerRight}
        </div>
      </div>
    </div>
  );
};

export default MovieListHeader;
