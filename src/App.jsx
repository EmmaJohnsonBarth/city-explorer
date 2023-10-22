import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

const VITE_API_KEY_LOCATION = pk.e66c1e6e75acc1f162522d21124254ac

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cityInformation: [],
      error: false,
      cityName: "",
    }
  }

  handleCityFormSubmit = async (event) => {
    event.preventDefault();
    console.log('handle submit test')
    let URL = `http://us1.locationiq.com/v1/search?key=${VITE_API_KEY_LOCATION}&q=${this.state.cityName}&format=json`;
    let cityInfo = await axios.get(URL);
  }


  render() {
    let cityList = this.state.cityInformation.map((data, index) => {
      return (
        <li key={index}>
          {data.long}
          {data.lat}
        </li>
      )
    }
    )

    return (
      <>
        {/* <h1>Enter City Name</h1>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Explore!</button>
        </form>
        {this.state.error ? (
          <p>this.state.errorMessage</p>
        ) : (
          <ul>{cityList}</ul>
        )} */}

        <form onSubmit={this.handleCityFormSubmit}>
          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!2</button>
        </form >
      </>
    );
  }
}

export default App;
