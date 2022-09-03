// get location card
const Location = ({location}) => {
  const locationTerms = location.properties.locationName;

  return (
        
    <div className="col-12 col-md-6 item" key={location.id}>
      <div className="item-content">
        <img className="img-fluid" src={location.img.archiveImgAlt} alt={location.properties.title} />
        <div className="item-details">
          <h2>{location.properties.title}</h2>
          <div dangerouslySetInnerHTML={{__html: location.properties.address}} />
          <ul className="list-unstyled m-0">
            {locationTerms.map(locationTerm => {
              return ( <li key={locationTerm}>{locationTerm}</li> )
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}

export default Location