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
    <div className="my-12 flex w-[40%] flex-col items-center justify-center rounded-3xl bg-sky-900 p-12">
      <div className="mb-6">
        <Logo size={72} />
      </div>
      <Button className={"my-6 bg-primary p-8"} onPress={handleNavigateToHome}>
        <span className="flex items-center justify-center text-lg">
          Browse All Movies & Series <FaArrowRight className="ml-4" />
        </span>
      </Button>
    </div>
  );
};

export default DashboardContainer;
