import React from 'react'
import './App.css'
import axios from "axios"

const VITE_API_KEY_LOCATION = import.meta.env.VITE_API_KEY;
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
console.log(VITE_SERVER_URL);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cityInformation: [],
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
    // console.log(URL);
    let cityInfo = await axios.get(URL);
    // console.log('from LOCATIOIQ',cityInfo.data[0])
    //update state and then lets create a component 
    this.setState({
      location : cityInfo.data[0].display_name,
      lat : cityInfo.data[0].lat,
      lon : cityInfo.data[0].lon
    });
    this.handleWeather(cityInfo.data[0].lat,cityInfo.data[0].lon)
  }


  // add an arrow function to call your server with the weather route 
  // we need for weather is the lat and lon from location IQ
handleWeather = async (lat, lon) => {
   console.log(lat, lon, 'did we get here?');
   try {
    //          call server  /   route
    let weatherFromServer = await axios.get( `${VITE_SERVER_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        searchQuery: this.state.cityName} 
    });
    console.log('weather',weatherFromServer.data);
    //update state, create a weather component to send state via props to display weather data. 



    // updatestate with the weather
    // from state give the weather to the weather component
   } catch (error) {
    console.log(error);
   }
}

  render() {
    console.log(this.state.lat,  this.state.location);
    return (
      <>
        <form onSubmit={this.handleCityFormSubmit}>
          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!2</button>
        </form >
        {this.state.error ? (
          <p>this.state.errorMessage</p>
        ) : (
          <>
          <p>{this.state.location}</p>
          <p>{this.state.lat}</p>
          <p>{this.state.lon}</p>
          </>
        )}



          {/* <CitySearch hanlde all the form city/state searching />
          <Component to render the search results />
          <Map just a bootstrap img />  <Image src={this.props.img_url} alt={this.props.city} title={this.props.city} rounded fluid />


          <Weather />
              <div key={index}>
              <p>day: {day.date}</p>
              <p>description: {day.description}</p>
            </div> */}











      </>
    );
  }
}

export default App;
