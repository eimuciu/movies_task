import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import css from './MovieCard.module.css';

function SingleTodo({ movieObj }) {
  return (
    <Flex className={css.main}>
      <Box>
        <img
          src={movieObj.poster !== 'N/A' ? movieObj.poster : '/noimage.jpg'}
          alt={movieObj.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </Box>
      <Flex p="10px" className={css.textCont}>
        <Heading as="h3" size="md">
          {movieObj.title}
        </Heading>
        <Text mt="5px">Year: {movieObj.year}</Text>
        <Text mt="5px">Genre: {movieObj.genre}</Text>
        <Text mt="5px">Actors: {movieObj.actors}</Text>
      </Flex>
    </Flex>
  );
}

export default SingleTodo;
