const TMDB_Key = `9d2ac0e411cefe72dbf19a4500943adb`;

const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}

export default movieAPI


const searchMovie = async (q) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_Key}&query=${q}`);
    const data = await res.json();
    console.log(data);
}
// searchMovie("1252037")
const fetchGenre = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWRmMDdjYWJiOGU5ZDg0NDk4MDllZjQ4ZDNhY2MzMyIsIm5iZiI6MTc2MzAzOTE5Ny43NjcsInN1YiI6IjY5MTVkN2RkNTc5YjMyNWFiNjNhNDRhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CHspmbtF7ndXliVl5HxPrba8Dl8dZcLjRTKFM7UqLh8'
        }
    };

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const data = await res.json();
    console.log(data);

}
// fetchGenre(1242898)