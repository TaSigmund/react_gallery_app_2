/*** 
 * returnes the list items that contain the pictures
 ***/
function PhotoContainer(props){
    return (
     <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {props.photos.map(photo => <li key={photo.key}><img src={photo.url} alt={photo.title}/></li>)}
        </ul>
      </div>
     )
 }
 
 export default PhotoContainer
 