const TMDB_Key = `9d2ac0e411cefe72dbf19a4500943adb`;

const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();
    const fdata = data?.results?.filter(
        (m) => m.poster_path !== null && m.backdrop_path !== null
    );
    return fdata;
}

export default movieAPI

export const keywords = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}
// keywords(66732)
export const videos = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}
// videos(66732)
export const fetchReviews = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${TMDB_Key}`)
    const data = await res.json();
    console.log(data)
    return data.results;
}
// reviews(66732)

export const fetchCast = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${TMDB_Key}`)
    const data = await res.json();
    console.log(data)
    return data.results;
}
// fetchCast(95479)