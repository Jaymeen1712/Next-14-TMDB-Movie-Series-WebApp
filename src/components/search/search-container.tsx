"use client";

import { CommonCardType } from "@/types";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import SearchList from "./search-list";

interface SearchContainerProps {
  data: CommonCardType[] | undefined;
  search: string;
}

const SearchContainer = ({ data, search }: SearchContainerProps) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(`/search?keyword=${search}`);
  };

  return (
    <>
      {data && (
        <div className="fixed mt-2 min-w-[600px] rounded-2xl border-2 border-white/50 bg-stone-900 px-6 py-4 shadow-xl backdrop-blur-xl">
          {data.slice(0, 5).map((subData) => (
            <div key={subData.id}>
              <SearchList data={subData} />
            </div>
          ))}
          <div>
            <Button
              fullWidth
              className="mt-4 bg-primary text-base"
              disableAnimation
              disableRipple
              onPress={handleViewMore}
            >
              View more
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchContainer;
