const TMDB_Key = import.meta.env.VITE_TMDB_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;

console.log(TMDB_BEARER,TMDB_Key)

export const duration = (runtime) => {
    if (!runtime) return "Runtime: N/A";

    const h = Math.floor(runtime / 60);
    const m = runtime % 60;

    return `${h ? `${h}h ` : ""}${m}m`;
};


const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();

    const fdata = data?.results?.filter(
        (m) => m.poster_path !== null && m.backdrop_path !== null);
        console.log(fdata)
        
    return fdata;
}
export default movieAPI;

export const keywords = async (id, type) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log("keyword", data)
    return data;
}
// keywords(66732)
export const videos = async (id, type) => {
    if (!id || !type) return;
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}
// videos(66732)
export const fetchReviews = async (id, type) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log("fetchReviews",data)
    return data.results;
}
// reviews(66732)

export const fetchCast = async (id, type, s) => {
    if (!id || !type || !s) return;

    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/${s}?api_key=${TMDB_Key}`);
    const data = await res.json();

    const crew = data?.crew || [];

    const dir = crew
        .filter((c) => c.job === "Director")
        .map((m) => m.name)[0] || "";

    const topCrew = [...new Map(
        crew.map(({ name, job }) => [name, { name, job }])
    ).values()].slice(0, 3);

    const jobs = crew
        .filter((c) => c.name === dir)
        .map((j) => j.job)
        .join(", ");

    // console.log(data, topCrew)
    return { data, dir, jobs, topCrew };
}
// fetchCast(238, 'movie', "credits")

export const fetchImages = async (id, type) => {
    if (!id || !type) return;

    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${TMDB_Key}`);
    const data = await res.json();
    // console.log("fetchImages " + " for " + type, data)
    return data;
}
export const fetchContentRating = async (id) => {
    if (!id) return { data: [] }
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log(data)
    return data;
}
export const fetchGlobal = async (type, id, value) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/${value}?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log(data)
    return data;
}


export const fetchDummy = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/collection?api_key=${TMDB_Key}`)
    const data = await res.json();
    console.log("fetchDummy", data)
    return data;
}
// fetchDummy("The Housemaid Collection");

export const Auth = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TMDB_BEARER
        }
    };
    const url = `https://api.themoviedb.org/3/account/${id}`;
    const res = await fetch(url, options)
    const data = await res.json();
    console.log("Auth", data)
    return data;
}
Auth(22466989)