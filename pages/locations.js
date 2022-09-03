import axios from 'axios';
import Location from '../components/location';

const LocationsList = ( {locations} ) => {

  return (
    <>
      <div className="app-view">
        <div className="container-fluid">
          <div className="row justify-content-center">
      
            <div className="list-view col-12 col-md-6">
              <div className="container-fluid">
                <div className="row justify-content-start align-items-stretch">
                  {
                    locations.map(location => {
                      return (
                        <Location 
                          key={location.id} 
                          location={location} 
                        />
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="container-fluid">
                <h1>mappp</h1>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )

}

export default LocationsList

// get the data
export const getStaticProps = async () => {
  const results = await axios.get("https://photoscalp.wpengine.com/wp-json/ps/v1/posts");
  const data = await results.data;

  return {
    props: { locations: data.features }
  }
}