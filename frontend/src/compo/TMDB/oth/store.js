import { create } from "zustand";

const API_KEY = `15df07cabb8e9d8449809ef48d3acc33`;
const useApiStore = create((set) => ({
  popular: [],
  topRated: [],
  trendingAll: [],
  movieDetail: [],
  casts: [],
  searchResults: [],

  loadingPopular: false,
  loadingTopRated: false,
  loadingTrending: false,

  searchtype: "movie",
  
  err: null,
  query: null,

  setSearchType: (type) => set({ searchtype: type }),
  setQuery: (q) => set({ query: q }),

  searchMovie: async (q , type) => {
    set({ isLoading: true })

    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${q}&api_key=${API_KEY}`)
      const data = await res.json();
      console.log(data)
      setTimeout(() => {
        set({ searchResults: data, isLoading: false, err: null })
      }, 2000);
    } catch (error) {
      set({ isLoading: false, err: error })
    }
  },

  fetchPopular: async () => {
    try {
      set({ loadingPopular: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await res.json();
      const filtered = data?.results?.filter(
        (m) => m.poster_path && m.backdrop_path
      );
      set({ popular: filtered || [], loadingPopular: false });
    } catch (err) {
      set({ loadingPopular: false, err });
    }
  },

  fetchTopRated: async () => {
    try {
      set({ loadingTopRated: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      const data = await res.json();
      const filtered = data?.results?.filter(
        (m) => m.poster_path && m.backdrop_path
      );
      set({ topRated: filtered || [], loadingTopRated: false });
    } catch (err) {
      set({ loadingTopRated: false, err });
    }
  },

  fetchTrendingAll: async () => {
    try {
      set({ loadingTrending: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      const filtered = data?.results?.filter(
        (m) => m.poster_path && m.backdrop_path
      );
      set({ trendingAll: filtered || [], loadingTrending: false });
    } catch (err) {
      set({ loadingTrending: false, err });
    }
  },
  setMovieDetail: async (id, type = "movie") => {
    if (!id) return;
    set({ isLoading: true })
    try {
      const endpoint =
        type === "tv"
          ? `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const res = await fetch(endpoint);
      const data = await res.json();
      set({ movieDetail: data, isLoading: false, err: null });
    } catch (err) {
      console.error("Movie detail fetch error:", err);
      set({ movieDetail: null, err: err });
    }
  },

  setCasts: async (id) => {
    set({ isLoading: true })
    const url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${API_KEY}&language=en-US`
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      setTimeout(() => {
        set({ casts: data, isLoading: false })
      }, 3000);
    } catch (error) {
      set({ isLoading: false, err: error })
    }
  }

}));

export default useApiStore;