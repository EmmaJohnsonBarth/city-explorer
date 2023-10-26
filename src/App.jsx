import React from 'react'
import './App.css'
import axios from "axios"

const VITE_API_KEY_LOCATION = import.meta.env.VITE_API_KEY;
console.log(VITE_API_KEY_LOCATION);

//Check this, is url in .env right?
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
// console.log(VITE_SERVER_URL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      cityName: '',
      location: '',
      lat: '',
      lon: '',
    }
  }

  handleCityInput = (event) => {
    // console.log(event.target.value);
    this.setState({
      cityName: event.target.value
    });
  };

  handleCityFormSubmit = async (event) => {
    event.preventDefault();
    // console.log('handle submit test');
    // console.log('we need a city!!!!!',this.state.cityName);
    let URL = `http://us1.locationiq.com/v1/search?key=${VITE_API_KEY_LOCATION}&q=${this.state.cityName}&format=json`;
    console.log('test, url here: ', URL);
    let cityInfo = await axios.get(URL);
    // console.log('from LOCATIOIQ',cityInfo.data[0])
    //update state and then lets create a component 
    this.setState({
      location: cityInfo.data[0].display_name,
      lat: cityInfo.data[0].lat,
      lon: cityInfo.data[0].lon
    });
    this.handleWeather(cityInfo.data[0].lat, cityInfo.data[0].lon)
  }


  // add an arrow function to call your server with the weather route 
  // we need for weather is the lat and lon from location IQ
  handleWeather = async (lat, lon) => {
    console.log(lat, lon, 'did we get here?');
    try {
      //          call server  /   route
      let weatherFromServer = await axios.get(`${VITE_SERVER_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          searchQuery: this.state.cityName
        }
      });
      console.log('weather', weatherFromServer.data);
      //update state, create a weather component to send state via props to display weather data. 
      const weatherData = weatherFromServer.data;
      this.setState({
        weather: weatherData,
      })

      // updatestate with the weather
      // from state give the weather to the weather component
    } catch (error) {
      // console.log('Error fetching weather data: ', error);
    }
  }

  render() {
    // console.log(this.state.lat,  this.state.location);
    return (
      <>
        <h1> Welcome to City Explore!</h1>
        <form onSubmit={this.handleCityFormSubmit}>

          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>

          <button type="submit">Explore!</button>
        </form >
        {this.state.error ? (
          `{this.state.errorMessage}`
        ) : (
          <>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  {/* <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  View Coordinates of Selected City</button> */}
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>{this.state.location}</strong>
                     <p>{this.state.lat}</p>
                     <p>{this.state.lon}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}

export default App;
