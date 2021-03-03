import React from 'react';
import './index.css';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import SearchBar from './components/SearchBar';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav';
import apiKey from './config.js';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        search: '',
        photos: []
      }
    }

    /*** 
     * sets the new search term and stores it in state
     ****/

    searchFor = async (searchTerm) => {
      const newSearchTerm = searchTerm;
      await this.setState({ search: newSearchTerm });
      this.performSearch(); //now that the search term is updated we can fetch the data
    }

    /*** 
     * executes the data fetching
     ****/
    performSearch() {
      let tag= this.state.search;
      let api_key = apiKey;
      let amountOfPictures = 24;
      /* the following line is the flickr endpoint that delivers a defined amount of pictures matching a tag */
      let flickrAPI = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tag}&per_page=${amountOfPictures}&page=1&format=json&nojsoncallback=1`;
      
      fetch(flickrAPI)
        .then(data => data.json())
        .then(data => this.newObjectInState(data))
    }

    /*** 
     * delivers the data in the desired format (i.e. key, url and title) and passes it to state 
     ***/
    newObjectInState(data){
      let photoObjects = [];
      data.photos.photo.map(photo => 
          photoObjects.push({
            key: `${photo.id}`,
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            title: `${photo.title}`
          })
      );

      /*** clear state ***/
      this.setState({
        photos: []
      })

      /*** fill state ***/
        this.setState(prevState => ({
          photos: prevState.photos.concat(photoObjects)
        }))
    }


  render(){
    return(
      <BrowserRouter>
      <div className="container">
      <SearchBar searchFor={this.searchFor.bind(this)}/>
      <Nav searchFor={this.searchFor.bind(this)}/>
      </div>
      <PhotoContainer photos={this.state.photos}/>
      </BrowserRouter>
    ) 
  }
}

export default App;


