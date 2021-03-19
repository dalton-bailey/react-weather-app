import * as dotenv from "dotenv";
import { useEffect, useState } from "react";
import './index.css';

dotenv.config();

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState({main:{}});
  const [zipcode, setZipCode] = useState('')

  useEffect(() => {
  
  }, []);

  const submit = (e) => {
    e.preventDefault()
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
      // `https://api.openweathermap.org/data/2.5/weather?zip=84042,us&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLocation(result)
          console.log(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={submit}>
        <input
          onChange={(e)=>setZipCode(e.target.value)}
          type="text"
          name="zipcode"
          placeholder="Zipcode"
        />
        <input type="submit" value="Search" />
      </form>

      <div>
        <h2>Location: {location.name}</h2>
        <p>Current Temperature: {location.main.temp}</p>
      </div>
    </div>
  );
}

export default App;
