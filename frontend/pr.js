// async function ftch() {
//     const res = await fetch(`https://dummyjson.com/products`)
//     const data = await res.json()
//     console.log(data)
// }
// ftch()

const obj = { name: false, age: true, colg: false }

const o = Object.fromEntries(Object.entries(obj).map(([key,value]) => [key, value]));

console.log(o)