import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
//import { BrowserRouter as Router } from 'react-router-dom'
//import { Route } from 'react-router-dom'
import axios from 'axios'


function App() {
  const [userSearched, setUserSearched] = useState('nyc')
  const [yelpResults, setYelpResults] = useState([])
  

  const yelpAPI = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${userSearched}`
  //const yelpAPI = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/autocomplete`

  const handleChange = (e) => {
    let value = e.target.value;
    setUserSearched(value)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`, 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' } };
    let response = await axios.get(
          yelpAPI,
          config
      ) 
    setYelpResults(response)
  }

  const initialResults = async () => {
    const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`, 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' } };

    let res = await axios.get(
        yelpAPI,
        config
    )
    setYelpResults(res)
  }

  // useEffect(() => {
  //   initialResults()
  // }, [])

  return (
    <div className="App">

      <Header textInput={handleChange} buttonClick={handleClick}/>
      <Main results={yelpResults} />
      <Footer />
      
    </div>
  )
}

export default App
