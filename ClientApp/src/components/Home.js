import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useDataCtx } from '../store/dataProvider';
import { getMovies } from '../api/data';
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

  const getSearchedMovies = async (term) => {
    const moviesData = await getMovies(term, 1);
    // if (moviesData.Response === 'True') {
    dispatch({
      type: 'SET_MOVIES',
      payload: { data: moviesData },
    });
    setMovieTitle(term);
    setPage(1);
    // return;
    // }
    // alert('Something went wrong');
  };

  const nextPage = async () => {
    // REMOVE ERROR UPON REACHING A TOTAL NUMBER OF MOVIES
    try {
      const moviesData = await getMovies(movieTitle, page + 1);
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
    const moviesData = await getMovies(movieTitle, page - 1);
    dispatch({
      type: 'SET_MOVIES',
      payload: { data: moviesData },
    });
    setPage((prev) => prev - 1);
  };

  return (
    <Flex {...mainContainer} position={'relative'} direction="column">
      <Header />
      <SearchForm getSearchedMovies={getSearchedMovies} />
      <MoviesList
        data={data}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </Flex>
  );
};

export default Home;
