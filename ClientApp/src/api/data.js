export async function getMoviesFetch(term, page) {
  try {
    const apires = await fetch(`api/movies/?searchterm=${term}&page=${page}`);
    const data = await apires.json();
    return data;
  } catch (err) {
    console.log('getMoviesFetch error', err);
  }
}

export async function updateMoviesFetch(movieObj) {
  try {
    const apires = await fetch('api/movies/', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(movieObj),
    });
    const data = await apires.json();
    return data;
  } catch (err) {
    console.log('updateMoviesFetch error', err);
  }
}
