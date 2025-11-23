const URL = `/colors.json`;

const colorsAPI = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    return data
}

export const randomColor = async () => {
    const color = await colorsAPI();
    const rand = Math.floor(Math.random() * color.length);
    const ranColorHex = color[rand].hex
    const ranColorName = color[rand].name
    return { ranColorHex, ranColorName }
}
export default colorsAPI;