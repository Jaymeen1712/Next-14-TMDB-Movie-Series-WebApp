import { DefaultContext } from "@/context";
import { Button } from "@nextui-org/react";
import React, { MouseEventHandler } from "react";
import { IconType } from "react-icons";

interface CarouselPaginationButtonProps {
  Icon: IconType;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const CarouselPaginationButton = ({
  Icon,
  handleClick,
}: CarouselPaginationButtonProps) => {
  return (
    <Button
      className="w-fit bg-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-30 group"
      size="md"
      radius="full"
      isIconOnly
      onClick={handleClick}
    >
      <Icon
        size={20}
        className={`text-white group-hover:text-primary`}
      />
    </Button>
  );
};

export default CarouselPaginationButton;
