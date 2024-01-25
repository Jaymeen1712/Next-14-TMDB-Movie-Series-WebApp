"use client";

import { getSearchMediaAPI } from "@/apis/common";
import useDebounce from "@/hooks/useDebounce";
import { CommonCardType } from "@/types";
import { Input, InputProps } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import SearchContainer from "./search-container";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, 1000);
  const pathname = usePathname();
  const [searchResults, setSearchResults] = useState<CommonCardType[] | null>(
    [],
  );
  const [showSearchContainer, setShowSearchContainer] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange: InputProps["onChange"] = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getSearchResults = async () => {
      if (debouncedValue) {
        const { response: searchMediaResponse, errors: searchMediaErrors } =
        await getSearchMediaAPI(debouncedValue);
        
        if (!searchMediaErrors) {
          console.log("🚀 ~ getSearchResults ~ searchMediaResponse:", searchMediaResponse)
          setSearchResults(searchMediaResponse.results);
        }
      }
    };
    getSearchResults();
  }, [debouncedValue]);

  useEffect(() => {
    setSearchResults([]);
    setInputValue("");
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        inputRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSearchContainer(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <>
      <Input
        ref={inputRef}
        size="sm"
        radius="sm"
        startContent={<FaSearch className="mx-1" />}
        placeholder="Search for movies or tv series"
        variant="faded"
        labelPlacement="outside"
        // classNames={{
        //   label: "text-black",
        //   // input: ["bg-neutral-700"],
        //   // mainWrapper: ["bg-neutral-700"]
        // }}
        className="min-w-[750px]"
        onChange={handleInputChange}
        value={inputValue}
        onFocus={() => setShowSearchContainer(true)}
      />
      {searchResults?.length && debouncedValue && showSearchContainer ? (
        <div ref={searchContainerRef}>
          <SearchContainer data={searchResults} search={debouncedValue} />
        </div>
      ) : null}
    </>
  );
};

export default Search;
