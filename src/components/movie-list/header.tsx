import React from "react";

interface MovieListHeaderProps {
  title: string;
  headerRight?: React.ReactNode;
}

const MovieListHeader = ({ title, headerRight }: MovieListHeaderProps) => {
  return (
    <div>
      <div className="flex space-x-8 items-center">
        <h1 className="text-white font-bold text-2xl">{title}</h1>
        <div className="flex justify-center items-center">{headerRight}</div>
      </div>
    </div>
  );
};

export default MovieListHeader;
