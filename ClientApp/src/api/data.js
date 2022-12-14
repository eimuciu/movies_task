export async function getMoviesFetch(searchOptions, page) {
  const { title, genre, actors, year } = searchOptions;
  console.log(searchOptions);
  try {
    const apires = await fetch(
      `api/movies/?searchterm=${title}&page=${page}&genre=${genre}&actors=${actors}&year=${year}`,
    );
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
