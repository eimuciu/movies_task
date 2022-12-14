import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import css from './MovieCard.module.css';
import { EditIcon } from '@chakra-ui/icons';
import Modal from '../../Modal/Modal';
import useModalController from '../../Modal/useModalController';
import EditForm from '../../EditForm/EditForm';

function MovieCard({ movieObj, updateMovie }) {
  const { showModal, openModal, closeModal } = useModalController();
  return (
    <>
      <Modal showModal={showModal} closeModal={closeModal}>
        <EditForm
          movieObj={movieObj}
          updateMovie={updateMovie}
          closeModal={closeModal}
        />
      </Modal>

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
          <EditIcon className={css.editIcon} onClick={openModal} />
        </Flex>
      </Flex>
    </>
  );
}

export default MovieCard;
