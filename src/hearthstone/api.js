const headers = new Headers();
headers.append('x-rapidapi-host', 'omgvamp-hearthstone-v1.p.rapidapi.com');
headers.append('x-rapidapi-key', 'c9fbb1ccecmsh2b6c1c24edefc43p148354jsnd3eaa4dfbe8e');

async function getEndpoint(url) {
    try {
        const response = await fetch(url, { method: 'GET', headers });
        const apiData = await response.json();
        return apiData;
    } catch (err) {
        console.log('fetch failed', err);
    }
}
export { getEndpoint };