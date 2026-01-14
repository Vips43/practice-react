import { create } from "zustand";

const API_KEY = `15df07cabb8e9d8449809ef48d3acc33`;
const useApiStore = create((set) => ({
  popular: [],
  topRated: [],
  trending: [],
  movieDetail: [],
  tvDetail: [],
  casts: [],
  searchResults: [],

  loadingPopular: false,
  loadingTopRated: false,
  loadingTrending: false,
  toggle: false,

  searchtype: "movie",
  directorInfo: { name: "", jobs: "", topCrew: [] },

  err: null,
  query: null,

  setToggle: () => set({ toggle: true }),
  setDirectorInfo: (payload) => set({ directorInfo: payload }),
  setSearchType: (type) => set({ searchtype: type }),
  setQuery: (q) => set({ query: q }),

  searchMovie: async (q, type) => {
    set({ isLoading: true })

    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${q}&api_key=${API_KEY}`)
      const data = await res.json();
      console.log("searched for ", type, data)
      setTimeout(() => {
        set({ searchResults: data, isLoading: false, err: null })
      }, 2000);
    } catch (error) {
      set({ isLoading: false, err: error })
    }
  },

  fetchPopular: async (type, status) => {
    try {
      set({ loadingPopular: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${status}?api_key=${API_KEY}`
      );
      const data = await res.json();
      const filtered = data?.results?.filter(
        (m) => m.poster_path && m.backdrop_path
      );
      console.log(filtered)
      set({ popular: filtered || [], loadingPopular: false });
    } catch (err) {
      set({ loadingPopular: false, err });
    }
  },

  fetchTopRated: async (type) => {
    try {
      set({ loadingTopRated: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/top_rated?api_key=${API_KEY}`
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

  fetchTrending: async (time = "day") => {
    try {
      set({ loadingTrending: true });
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/${time}?api_key=${API_KEY}`
      );
      const data = await res.json();
      const filtered = data?.results?.filter(
        (m) => m.poster_path && m.backdrop_path
      );
      set({ trending: filtered || [], loadingTrending: false });
    } catch (err) {
      set({ loadingTrending: false, err });
    }
  },
  setMovieDetail: async (id, type = "movie") => {
    if (!id) return;
    console.log(type)
    set({ isLoading: true })
    try {
      const endpoint =
        type === "tv"
          ? `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const res = await fetch(endpoint);
      const data = await res.json();

      console.log(data)

      set({ [type === "tv" ? "tvDetail" : "movieDetail"]: data, isLoading: false, err: null });
    } catch (err) {
      console.error("Movie detail fetch error:", err);
      set({ movieDetail: null, err: err });
    }
  },

  setCasts: async (id, type) => {

    set({ isLoading: true });

    const url = `https://api.themoviedb.org/3/${type}/${id}/aggregate_credits?api_key=${API_KEY}&language=en-US`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);

      set({ casts: data, isLoading: false, err: null });

    } catch (error) {
      set({ isLoading: false, err: error });
    }
  }

}));

export default useApiStore;
// https://api.themoviedb.org/3/movie/1242898/credits?api_key=15df07cabb8e9d8449809ef48d3acc33&language=en-US