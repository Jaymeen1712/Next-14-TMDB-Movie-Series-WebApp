import { Button } from "@nextui-org/react";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Logo from "./logo";
import Link from "next/link";

const DashboardContainer = () => {
  return (
    <div className="my-12 flex w-[40%] flex-col items-center justify-center rounded-3xl bg-sky-900 p-12">
      <div className="mb-6">
        <Logo size={72}/>
      </div>
      <Button className={"bg-primary p-8 my-6"}>
        <Link
          href={"/home"}
          className="flex items-center justify-center text-lg"
        >
          Browse All Movies & Series <FaArrowRight className="ml-4" />
        </Link>
      </Button>
    </div>
  );
};

export default DashboardContainer;
