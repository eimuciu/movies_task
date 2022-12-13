import MovieCard from './MovieCard/MovieCard';
import css from './MoviesList.module.css';
import { Heading, Box, Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function MoviesList({ data, page, nextPage, prevPage }) {
  return (
    <Box mt="50px" w="100%">
      <Heading as="h2" size="xl" mb="15px">
        My list
      </Heading>
      <Flex className={css.resultsBox}>
        <Flex className={css.iconsBox}>
          <ChevronLeftIcon onClick={prevPage} />
          <Text>{page}</Text>
          <ChevronRightIcon onClick={nextPage} />
        </Flex>
      </Flex>
      <Flex wrap="wrap">
        {data.map((mobj) => (
          <MovieCard
            key={mobj.Title + mobj.Poster + mobj.Year}
            movieObj={mobj}
          />
        ))}
      </Flex>
    </Box>
  );
}

export default MoviesList;
