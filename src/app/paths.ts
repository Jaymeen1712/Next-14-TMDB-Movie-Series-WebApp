const paths = {
  dashboard() {
    return "/";
  },
  home() {
    return "/home";
  },
  movies() {
    return "/movies";
  },
  movie(movieId: string) {
    return `/movie/${movieId}`;
  },
  tvSeries() {
    return "/tv-series"
  }
};

export default paths;
