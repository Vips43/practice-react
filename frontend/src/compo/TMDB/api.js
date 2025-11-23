const TMDB_Key = `9d2ac0e411cefe72dbf19a4500943adb`;

const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}

export default movieAPI