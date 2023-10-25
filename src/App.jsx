import React from 'react'
import './App.css'
import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY_LOCATION;

console.log('test', API_KEY)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      cityName: "",
      cityInfo: null
    }
  }

  handleCityInput = (event) => {
    // console.log('life!')
    this.setState({
      cityName: event.target.value,
      cityData: null,
    });
  };

  handleCityFormSubmit = async (event) => {
    event.preventDefault();
    // console.log('handle submit test');
    let URL = `http://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.cityName}&format=json`;
    let cityInfo = await axios.get(URL);
    // console.log("city info: ", cityInfo.data[0])
    this.setState({
      //[0-2]?
      cityInfo: cityInfo.data[0]
    });
  }



  render() {
    console.log(this.state.cityInfo)
    //declared in handleCityInput, but inside of function
    let cityData = this.state.cityInfo;
    let cityList = this.state.cityInfo.map((data, index) => {
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
        <h1>Welcome to City Explorer</h1>


        <form onSubmit={this.handleCityFormSubmit}>

          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {this.state.error ? (
          <p>this.state.errorMessage</p>
        ) : (
          <ul>{cityList}</ul>
        )}





     

      {
        this.state.cityInfo && (
          <>
            <p>{this.state.cityInfo.display_name}</p>
            <p>{this.state.cityInfo.lat}</p>
            <p>{this.state.cityInfo.lon}</p>
            {/* <image src={this.state.cityInfo.img_url} alt={this.state.cityInfo.display_name} title={this.state} /> */}
          </>
        )
      }
    {
      this.state.lat && this.state.lon && this.state.cityInto.img_url &&
        <img src={this.state.cityInfo.img_url} />
    }

    {
      <p>The weather in {this.cityInfo.display_name} will be a low of {this.state.cityInfo.low_temp} and a high of {this.state.cityInfo.max_temp}, and conditions will be {this.state.cityInfo.</p>
    }
      </>
    )
  }
}

export default App;
