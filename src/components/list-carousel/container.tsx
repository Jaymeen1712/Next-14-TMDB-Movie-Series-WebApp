import { CommonCardType } from "@/types";
import ListCarousel from "./carousel";

interface ListCarouselContainerProps {
  data: CommonCardType[];
  isLoading?: boolean;
}

const ListCarouselContainer = ({
  data,
  isLoading = false,
}: ListCarouselContainerProps) => {
  return (
    <div>
      {(data || isLoading) && (
        <ListCarousel data={data || []} isLoading={isLoading} />
      )}
    </div>
  );
};

export default ListCarouselContainer;
