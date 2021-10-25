import './App.css';
import React, { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

function App() {
  const [searchValue, setSearchValue] = useState('');

  // const handleFormSubmit = (searchValue) =>{
  //   setSearchValue (searchValue)
  // }

  return (
    <div className="App">
      <Searchbar onSubmit={setSearchValue}></Searchbar>
      <ImageGallery searchValue={searchValue}></ImageGallery>
    </div>
  );
}

export default App;
