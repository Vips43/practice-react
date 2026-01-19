import { create } from "zustand";

const TMDB_Key = import.meta.env.VITE_TMDB_KEY;

const useNavStore = create((set) => ({
    selected: "",

    country: [],
    providers: [],
    genres:[],

    loading: false,

    setSelected: (val) => set({ selected: val }),

    setCountry: (countries) =>
        set(() => ({
            country: countries,
            selected:
                countries.find((c) => c.iso_3166_1 === "IN")?.iso_3166_1 || "",
        })),

    setProviders: async (val) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${TMDB_Key}`
        );
        const data = await res.json();  
        const logo = data.results.filter(i=> i.display_priorities[val])
        set({ providers: logo });
    },
    setGenres: async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?language=en?api_key=${TMDB_Key}`
        );
        const data = await res.json();
        set({ genres: data });
    },

}));

export default useNavStore;
