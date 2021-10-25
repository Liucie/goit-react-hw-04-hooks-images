import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PixabayFetch } from '../../services/pixabay';
import { ImageGalleryItem } from './ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

const base_url = 'https://pixabay.com/api/';
const api_key = '23237261-94e774dc3474a501c481a5592';

const newPixabayFetch = new PixabayFetch(base_url, api_key);

export function ImageGallery({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImage] = useState('');

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setIsLoading(true);
    newPixabayFetch.resetPage();
    newPixabayFetch.searchQuery = searchValue;
    newPixabayFetch
      .searchPhotos()
      .then(results => {
        setSearchResults(results);
        setIsLoading(false);
      })
      .catch(err => {
        alert('Error! Try again!');
        console.log(err);
      });
  }, [searchValue]);

  const handleClick = () => {
    setIsLoading(true);
    newPixabayFetch.page = 1;
    newPixabayFetch
      .searchPhotos()
      .then(results => {
        setIsLoading(false);
        setSearchResults(prevState => [...prevState, ...results]);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(err => {
        alert('Error! Try again!');
        console.log(err);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickImg = obj => {
    // console.log(obj)
    setCurrentImage(obj);
    toggleModal();
  };

  return (
    <>
      <ul className="ImageGallery">
        {searchResults.length > 0 &&
          searchResults.map(item => {
            return (
              <ImageGalleryItem key={item.id} obj={item} onClick={onClickImg} />
            );
          })}
      </ul>

      {isLoading && (
        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}

      {searchResults.length > 0 && <Button onClick={handleClick} />}

      {showModal && (
        <Modal
          onClose={toggleModal}
          src={currentImg.largeImageURL}
          alt={currentImg.tags}
        ></Modal>
      )}
    </>
  );
}
ImageGallery.propTypes = {
  searchValue: PropTypes.string,
};
