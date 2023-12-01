import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { serviceSearch } from './Searchbar/Pixabay';
import css from './App.module.css'

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
const [tags, setTags] = useState('');
const [currentItem, setCurrentItem] = useState(null);


  const [error, setError] = useState('');
  useEffect(() => {
    
      setIsLoading(true);
      setIsSearchDisabled(true);
   
      serviceSearch(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            setError('Unfortunately, no images were found for your search query. Please try again.');
            return;
          }
            setImages((prev) => [...prev, ...hits]);
            setIsLoadMore(page < Math.ceil(totalHits / 12));        
            setError('');
        })
        .catch(error =>
          setError('Sorry, something went wrong. Please try again later.')
        )
        .finally(() => {
          setIsLoading(false);
          setIsSearchDisabled(false);
      });      
}, [query, page]);
  
 const handleSearch = obj => {
    if (obj.searchQuery.trim() === '') {      
        setError('What are you looking for?');      
      return;
    }
    if (query !== obj.searchQuery) {
      setQuery(obj.searchQuery);
      setPage(1);
      setImages([]);
      setIsLoadMore(false);
      setError('');
    }
  };

  const handleLoadMore = () => {

    setPage((prev) => prev + 1);
  };

 const handleOpenModal = largeImageURL=> {
  setLargeImageURL(largeImageURL);
  setIsModalOpen(true); 
  };


  const  closeModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };
   return (
      <div className={css.main}>
        <Searchbar onSubmit={handleSearch} />
        {error && <p>{error}</p>}
        <ImageGallery items={images} openModal={handleOpenModal} />
        {isLoading && <Loader />}
        {isLoadMore && <Button onClick={handleLoadMore} />}
        {isModalOpen && <Modal largeImageURL={largeImageURL} tags={tags} onClose={closeModal} />}
      </div>
    );
  }

