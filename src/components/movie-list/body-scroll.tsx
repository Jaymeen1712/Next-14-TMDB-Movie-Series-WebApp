import React from "react";
import MovieCard from "../movie-card";
import { CommonCardType } from "@/types";
import { Pagination, PaginationProps } from "@nextui-org/react";

interface MovieListBodyScrollProps {
  data: CommonCardType[];
  pagination: boolean;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
}

const MovieListBodyScroll = ({
  data,
  pagination,
  setCurrentPage,
}: MovieListBodyScrollProps) => {
  const renderList = data.map((subData) => {
    return <MovieCard key={subData.id} data={subData} />;
  });

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    if (setCurrentPage) setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex min-h-[968px] flex-wrap justify-start gap-1">
        <>{renderList}</>
      </div>
      {pagination && (
        <div className="mt-12 flex w-full items-center justify-center">
          <Pagination
            total={500}
            initialPage={1}
            onChange={handlePageChange}
            radius="sm"
            classNames={{
              wrapper: "gap-4 items-center",
              item: "text-large w-fit bg-white/20 text-white pl-4 pr-4 h-10 hover:text-primary",
              cursor: "text-large w-fit bg-primary text-black pl-4 pr-4 h-10",
            }}
            // @ts-ignore
            variant=""
          />
        </div>
      )}
    </div>
  );
};

export default MovieListBodyScroll;
