import { create } from "zustand";

const useApiStore = create((set) => ({
  movieDetail: null,


  setMovieDetail: async (id) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWRmMDdjYWJiOGU5ZDg0NDk4MDllZjQ4ZDNhY2MzMyIsIm5iZiI6MTc2MzAzOTE5Ny43NjcsInN1YiI6IjY5MTVkN2RkNTc5YjMyNWFiNjNhNDRhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CHspmbtF7ndXliVl5HxPrba8Dl8dZcLjRTKFM7UqLh8'
        }
      };

      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
      if (!res.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await res.json();
      console.log(data);
      set({ movieDetail: data });
    } catch (err) {
      console.error("Movie detail fetch error:", err);
      set({ movieDetail: null });
    }
  }
}))


export default useApiStore;