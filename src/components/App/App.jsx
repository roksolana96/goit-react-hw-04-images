import React, { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchData } from 'api/pixabayApi';
import { SearchBar } from 'components/Searchbar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

import { Container } from './App.styled';

export const App = () =>{
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState(null);
    const [tags, setTags] = useState('');
  
    useEffect(()=>{
      if (!query) 
        return;
      fetchImages(query, page)
    }, [query, page]);
    
    const fetchImages = (query, page) => {
      const perPage = 12;
      setIsLoading(true);
    
  
    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);
  
    const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    });
  
    setImages(images => [...images, ...data]);
      setTotal(totalHits);
  
            if (hits.length === 0) {
              return toast.error('Sorry, no images found. Please, try again!');
            }
    
            if (page === 1) {
              toast.success(`Hooray! We found ${totalHits} images.`);
            }
    
            if (page === totalPages) {
              toast.info("You've reached the end of search results.");
            }
    
          })
          .catch(error => setError(error))
          .finally(() => setIsLoading(false));
        };
  
  const handleSearch = query => {
      // if (query) 
      //   return;
      // if (query === this.state.query) return;
      setQuery(query);
      setImages([]);
      setPage(1);
      setError(null);
  }
  const toggleModal = (largeImageURL, tags ) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };
  
  const onLoadMore = () => {
    setPage(page => page + 1)
        // setIsLoading(true);
      };
  
      const loadImages = images.length !== 0;
      const isLastPage = images.length === total;
      const loadMoreBtn = loadImages && !isLoading && !isLastPage;
  
      return (
        <Container>
          <SearchBar onSubmit={handleSearch} />
  
          {error && toast.error(error.message)}
  
          {isLoading && <Loader />}
  
          {loadImages && (
            <ImageGallery images={images} onClick={toggleModal} />
          )}
  
          {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}
  
          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
  
          <ToastContainer theme="colored" autoClose={2000} />
        </Container>
      );
  }
  


// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     query: '',
//     error: null,
//     page: 1,
//     showModal: false,
//     largeImageURL: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.query;
//     const nextQuery = this.state.query;
//     const { page } = this.state;

//     if (prevQuery !== nextQuery || (prevState.page !== page && page !== 1)) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = () => {
//     const { query, page } = this.state;
//     const perPage = 12;

//     this.setState({ isLoading: true });

//     fetchData(query, page, perPage)
//       .then(({ hits, totalHits }) => {
//         const totalPages = Math.ceil(totalHits / perPage);

//         if (hits.length === 0) {
//           return toast.error('Sorry, no images found. Please, try again!');
//         }

//         if (page === 1) {
//           toast.success(`Hooray! We found ${totalHits} images.`);
//         }

//         if (page === totalPages) {
//           toast.info("You've reached the end of search results.");
//         }

//         const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
//           return {
//             id,
//             webformatURL,
//             largeImageURL,
//             tags,
//           };
//         });
//         this.setState(({ images }) => ({
//           images: [...images, ...data],
//           // page: page + 1,
//           total: totalHits,
//         }));
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   handleSearch = query => {
//     if (query === this.state.query) return;
//     this.setState({
//       images: [],
//       query,
//       page: 1,
//       error: null,
//     });
//   };

//   onLoadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//       isLoading: true,
//     }));
//   };

//   toggleModal = largeImageURL => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//     this.setState({ largeImageURL: largeImageURL });
//   };

//   render() {
//     const { images, error, isLoading, showModal, largeImageURL, tags, total } =
//       this.state;
//     const loadImages = images.length !== 0;
//     const isLastPage = images.length === total;
//     const loadMoreBtn = loadImages && !isLoading && !isLastPage;

//     return (
//       <Container>
//         <SearchBar onSubmit={this.handleSearch} />

//         {error && toast.error(error.message)}

//         {isLoading && <Loader />}

//         {loadImages && (
//           <ImageGallery images={images} onClick={this.toggleModal} />
//         )}

//         {loadMoreBtn && <Button onClick={this.onLoadMore}>Load more</Button>}

//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}

//         <ToastContainer theme="colored" autoClose={2000} />
//       </Container>
//     );
//   }
// }
