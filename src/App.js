//dependencies
import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

//static files
import './index.css';
import apiKey from './config.js';

//components
import SearchBar from './components/SearchBar';
import PhotoContainer from './components/PhotoContainer';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Home from './components/Home';

/*** 
 MAIN COMPONENT
****/
class App extends React.Component {
    constructor(){
      super()
      this.state = {
        photos: [],
        loading: true
      }
    }

    /*** 
     * only starts a search in case someone pastes in a url that correctly uses the path '/search/:search'
     ****/
    
    componentDidMount(){
      if (this.props.history.location.pathname.startsWith('/search/') && this.props.history.location.pathname.length > 8){this.performSearch()}
    }

    /*** 
     * executes the data fetching for all searches
     ****/
    
    performSearch(searchTerm=this.props.history.location.pathname.slice(8)) {
      let tag= searchTerm;
      let api_key = apiKey;
      let amountOfPictures = 24;
      /* the following line is the flickr endpoint that delivers a defined amount of pictures matching a tag */
      let flickrAPI = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tag}&per_page=${amountOfPictures}&page=1&format=json&nojsoncallback=1`;
      
      /* makes sure loading is set to true even if it has previously been set to false (after a completed search)*/
      this.setState({
        loading: true
      })

      fetch(flickrAPI)
          .then(data => data.json())
          .then(data => this.newObjectInState(data))
          .then(()=>{this.props.history.push(`/search/${tag}`)})
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
          photos: prevState.photos.concat(photoObjects),
          loading: false
        }))
    }

  render(){
    return(
      
      <React.Fragment>
        <div className="container">
          <SearchBar performSearch={this.performSearch.bind(this)}/>
          <Nav performSearch={this.performSearch.bind(this)}/>
        </div>
          <Switch>
            <Route exact path='/' component={Home}/>
            {(this.state.loading)
            ?<Route path='/search/:search' render ={() => <p>LOADING...</p>}/>
            :<Route path='/search/:search' render ={() => <PhotoContainer photos={this.state.photos} search={this.props.history.location.pathname.slice(8)}/>}/>
            }
            <Route component={NotFound}/>
        </Switch>
        </React.Fragment>
      
    ) 
  }
}

export default withRouter(App);


