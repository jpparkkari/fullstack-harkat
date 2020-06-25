import React from 'react'
import Weather from './Weather'

const Countries = ({countries, setter}) => {

  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return (
      <>
    <h1>{countries[0].name}</h1>
    <div>population {countries[0].population}</div>
    <div>capital {countries[0].capital}</div>
    <h3>Spoken languages</h3>
    <ul>
      {countries[0].languages.map((language, i) => 
        <li key={language.name}>{language.name}</li>)}
    </ul>
    <div><img src={countries[0].flag} alt="suomi" width="100px" border="1" /></div>
    <Weather city = {countries[0].capital} />
    </>
    )
  }

    return (
        <ul>
        {countries.map((country, i) => 
          <li key={country.name}> {country.name} <button onClick={() => setter(country.name)}>show</button></li>  
        )}
      </ul>
        
    )

    
}

export default Countries