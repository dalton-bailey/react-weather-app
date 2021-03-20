import * as dotenv from "dotenv";
import { useEffect, useState } from "react";
import './index.css';

dotenv.config();

function Daily(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState([]);
  

  useEffect(() => {
    fetch(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
    `https://api.openweathermap.org/data/2.5/onecall?lat=40&lon=98&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLocation(result.daily);
          console.log(result.daily);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);




  return (
    <div className="seven-day">
        {location.map((day) => {
          return (
            <div key={day.dt} className="daily-forecast">
              <h1>Day</h1>
              <h2>Date</h2>
              <p>{day.weather[0].description}</p>
              <div className="temps">
              <p className="high">{Math.round(day.temp.max)}</p>
              <p className="low">{Math.round(day.temp.min)}</p>
              </div>
            </div>
          )
        })}
    </div>
  );
}

export default Daily;
