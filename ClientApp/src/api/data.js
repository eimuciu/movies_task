export async function getMovies(term, page) {
  try {
    const apires = await fetch(`api/movies/?searchterm=${term}&page=${page}`);
    const data = await apires.json();
    return data;
  } catch (err) {
    console.log('getMovies error', err);
  }
}
