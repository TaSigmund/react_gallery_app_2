import NoResults from './NoResults'

/*** 
 * returnes the list items that contain the pictures
 ***/
function PhotoContainer(props){
  //if no pictures can be found it renders the NoResults component
  if (props.photos.length === 0) {
    return < NoResults />;
  } 
  //otherwise it renders the pictures
  else {
    return (
     <div className="photo-container">
        <h2>Results for {props.search}</h2>
        <ul>
          {props.photos.map(photo => <li key={photo.key}><img src={photo.url} alt={photo.title}/></li>)}
        </ul>
      </div>
     )
  }
}
 
 export default PhotoContainer
 