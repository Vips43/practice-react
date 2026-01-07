const TMDB_Key = `9d2ac0e411cefe72dbf19a4500943adb`;

const movieAPI = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}`)
    const data = await res.json();
    return data;
}

export default movieAPI

const searchMovie= async(q)=>{
    const res= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_Key}&query=${q}`);
    const data = await res.json();
    console.log(data);
}
// searchMovie("Cinderella")
const pages=[2,4]
const dummy= async(q)=>{
    const req= pages.map(page=>fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_Key}&page=${page}`))
    const res = await Promise.all(req);
    const data = await Promise.all(res.map(r=> r.json()))
    console.log(data);
}
dummy()