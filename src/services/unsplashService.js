export async function getCityImage(cityName) {
    const query = encodeURIComponent(`${cityName} landscape`);
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}&orientation=landscape`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular;
    }

    return ""; // se não achar imagem
}
