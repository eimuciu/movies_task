import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useDataCtx } from '../store/dataProvider';
import { getMoviesFetch, updateMoviesFetch } from '../api/data';
import Header from './Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesList from './MoviesList/MoviesList';

const mainContainer = {
  justify: 'center',
  align: 'center',
};

const Home = () => {
  const { data, dispatch } = useDataCtx();
  const [page, setPage] = useState(1);
  const [movieTitle, setMovieTitle] = useState('lego');
  console.log(data);

  const getSearchedMovies = async (term) => {
    const moviesData = await getMoviesFetch(term, 1);
    if (
      moviesData.response === 'False' &&
      moviesData.search === null &&
      moviesData.totalResults === null
    ) {
      alert('Movies not found');
    }
    // dispatch({
    //   type: 'SET_MOVIES',
    //   payload: { data: moviesData },
    // });
    // setMovieTitle(term);
    // setPage(1);
  };

  const nextPage = async () => {
    try {
      const moviesData = await getMoviesFetch(movieTitle, page + 1);
      if (
        moviesData.response === 'False' &&
        moviesData.search === null &&
        moviesData.totalResults === null
      ) {
        alert('You have reached a total number of movies');
        return;
      }
      dispatch({
        type: 'SET_MOVIES',
        payload: { data: moviesData },
      });
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const prevPage = async () => {
    if (page - 1 < 1) {
      return;
    }
    const moviesData = await getMoviesFetch(movieTitle, page - 1);
    dispatch({
      type: 'SET_MOVIES',
      payload: { data: moviesData },
    });
    setPage((prev) => prev - 1);
  };

  const updateMovie = async (movieObj) => {
    const movieData = await updateMoviesFetch(movieObj);
    dispatch({
      type: 'UPDATE_MOVIES',
      payload: { data: movieData },
    });
  };

  const moviesSlicer = (dataArr, page) => {
    const slicefrom = page * 10 - 10;
    const sliceto = page * 10;
    return dataArr.slice(slicefrom, sliceto);
  };

  return (
    <Flex {...mainContainer} position={'relative'} direction="column">
      <Header />
      <SearchForm getSearchedMovies={getSearchedMovies} />
      <MoviesList
        data={moviesSlicer(data, page)}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        updateMovie={updateMovie}
      />
    </Flex>
  );
};

export default Home;
