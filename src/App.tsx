import style from './App.module.css'
import Alert from "./Components/Alert/Alert";
import Form from "./Components/Form/Form";
import { Spiner } from "./Components/Spiner/Spiner";
import WeatherDetail from "./Components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
function App() {
  const { weather, loading, notFound, hasWeatherData, fetchWeather } =
    useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de Clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spiner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>City not found</Alert>}
      </div>
    </>
  );
}

export default App
