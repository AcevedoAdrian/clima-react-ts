import style from './App.module.css'
import Form from "./Components/Form/Form";
import WeatherDetail from "./Components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
function App() {
  const { weather, fetchWeather, hasWeatherData } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de Clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {hasWeatherData && <WeatherDetail weather={weather} />}
      </div>
    </>
  );
}

export default App
