import { CommonCardType } from "@/types";
import ListCarouselContainer from "../list-carousel/container";

interface MovieListBodyCarouselProps {
  data: CommonCardType[];
  isLoading?: boolean;
}

const MovieListBodyCarousel = ({
  data,
  isLoading = false,
}: MovieListBodyCarouselProps) => {
  return <ListCarouselContainer data={data} isLoading={isLoading} />;
};

export default MovieListBodyCarousel;
