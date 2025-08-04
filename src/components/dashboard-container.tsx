"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import Logo from "./logo";

const DashboardContainer = () => {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/home");
  };

  return (
    <div className="mx-4 my-8 flex w-full max-w-sm flex-col items-center justify-center rounded-2xl bg-sky-900 p-6 sm:my-12 sm:max-w-md sm:rounded-3xl sm:p-8 lg:max-w-lg lg:p-12 xl:max-w-xl">
      <div className="mb-4 sm:mb-6">
        <Logo size={48} className="sm:size-16 lg:size-[72px]" />
      </div>
      <Button
        className={"my-4 w-full bg-primary p-6 sm:my-6 sm:p-8"}
        onPress={handleNavigateToHome}
      >
        <span className="flex items-center justify-center text-sm sm:text-base lg:text-lg">
          <span className="xs:inline hidden">Browse All Movies & Series</span>
          <span className="xs:hidden">Browse Movies & Series</span>
          <FaArrowRight className="ml-2 sm:ml-4" size={14} />
        </span>
      </Button>
    </div>
  );
};

export default DashboardContainer;
