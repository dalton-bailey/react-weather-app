import * as dotenv from "dotenv";
import { useState } from "react";
import "./index.css";
import Moment from "react-moment";

dotenv.config();

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({ main: {} });
  const [dailyWeather, setDailyWeather] = useState([]);
  const [zipcode, setZipCode] = useState("");
  const [unit, setUnit] = useState("");

  async function submit(e) {
    e.preventDefault();
      fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
      // `https://api.openweathermap.org/data/2.5/weather?zip=84042,us&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCurrentWeather(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      fetch(
      // `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
      `https://api.openweathermap.org/data/2.5/onecall?lat=40.2607&lon=-111.6549&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setDailyWeather(result.daily);
          console.log(result.daily);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )

  };

  let date = new Date();

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"]

  return (
    <div>
      <h1>Weather</h1>

      <form onSubmit={submit}>
        <label>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>
        <label>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          Celcius
        </label>
        <input
          onChange={(e) => setZipCode(e.target.value)}
          type="text"
          name="zipcode"
          placeholder="Zipcode"
        />
        <input type="submit" value="Search" />
      </form>

      <div>
        <h2>Location {currentWeather.name}</h2>
        <p>Current Temperature {currentWeather.main.temp} &#176;	</p>
      </div>
      <div className="seven-day">
        {dailyWeather.map((day) => {
          return (
            <div key={day.dt} className="daily-forecast">
              {/* <h3>
                <Moment format="MM/DD/YYYY">
                  {date.setDate(date.getDate() + 1)}
                </Moment>
              </h3> */}
              <p>{day.weather[0].description}</p>
              <div className="temps">
                <p className="high">{Math.round(day.temp.max)}&#176;</p>
                <p className="low">{Math.round(day.temp.min)}&#176;</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
