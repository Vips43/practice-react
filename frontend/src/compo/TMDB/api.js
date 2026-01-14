const TMDB_Key = `9d2ac0e411cefe72dbf19a4500943adb`;

const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();

    const fdata = data?.results?.filter(
        (m) => m.poster_path !== null && m.backdrop_path !== null);
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
    if(!id || !type) return;
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

    const dir = data.crew.filter(c => c.job === "Director").slice(0, 1).map(m => m.name).join('')
    const topCrew = Array.from(
        new Map(
            data.crew.map(({ name, job }) => [name, { name, job }])
        ).values()
    ).slice(0, 3);

    const jobs = data.crew.filter(c => c.name === dir).map(j => j.job).join(", ")

    console.log(data, topCrew)
    return { data, dir, jobs, topCrew };
}
// fetchCast(238, 'movie', "credits")

export const fetchImages = async (id, type) => {
    if (!id || !type) return;

    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${TMDB_Key}`);
    const data = await res.json();
    console.log("fetchImages " + " for " + type, data)
    return data;
}
// export const fetchRandom = async (id, type, oth) => {
//     if (!id || !type || !oth) return;

//     const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/${oth}?api_key=${TMDB_Key}`);
//     const data = await res.json();
//     // console.log("fetchImages " + " for " + type, data)
//     return data;
// }
// fetchImages(550, "movie")
export const fetchContentRating = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${TMDB_Key}`)
    const data = await res.json();
    console.log(data)
    return data;
}
export const fetchGlobal = async (type, id, value) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/${value}?api_key=${TMDB_Key}`)
    const data = await res.json();
    // console.log(data)
    return data;
}
// fetchm()

export const duration = (runtime) => {
    let formattedTime;

    if (!runtime || runtime === 0) return formattedTime = "Runtime: N/A"

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    formattedTime = `${hours > 0 ? `${hours}h ` : ""} ${minutes}m`
    return formattedTime;

};