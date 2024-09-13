import { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";
import { parseToTemperature } from "../../Utils";

interface WeatherDetailProps {
  weather: Weather;
}
export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2>{weather.name}</h2>
      <p className={styles.current}>
        {" "}
        {parseToTemperature(weather.main.temp)}&deg;C
      </p>
      <div className={styles.temperature}>
        <p>
          Temperatura Mínima:{" "}
          <span>{parseToTemperature(weather.main.temp_min)}&deg;C</span>
        </p>
        <p>
          Temperatura Máxima:{" "}
          <span>{parseToTemperature(weather.main.temp_max)}&deg;C</span>
        </p>
      </div>
    </div>
  );
}
