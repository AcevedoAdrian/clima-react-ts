import { useMemo, useState } from "react";
import axios from "axios";
import { z } from "zod";
// import { object,string, number, parse,type Output } from "valibot";
import type { SearchInterface } from "../interface";

// Type Guards
// function isWeatherResponse(weather: unknown){
//   return(
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number'
//   )
// }

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number()
//   })
// type Weather = Output<typeof WeatherSchema>;

// Zod
const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});

const initialWeather = {
  name: "",
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  },
};
// Inferencias en base al esquema de validación de Zod
export type Weather = z.infer<typeof WeatherSchema>;

export default function useWeather() {
  // State
  const [weather, setWeather] = useState<Weather>(initialWeather);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Fetch Weather
  const fetchWeather = async (search: SearchInterface) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialWeather);
    setNotFound(false);
    try {
      const geoUTRL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUTRL);
      if (!data.length) {
        setNotFound(true);
        return;
      }
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: weatherData } = await axios.get(weatherURL);
      console.log(weatherData);

      // Castear el type de la respuesta: Estamos obligando a que la respuesta sea de tipo Weather
      // const { data: weatherData } = await axios.get<Weather>(weatherURL);
      // console.log(weatherData);

      // Type Guards: Es muy verboso y no es escalable
      // const result = isWeatherResponse(weatherData);
      // if(result){
      //   return weatherData as Weather;
      // } else {
      //   throw new Error('Invalid weather data');
      // }

      //Valibot:
      // const result = parse(WeatherSchema, weatherData);
      // if(result){
      //   return result;
      // } else {
      //   throw new Error('Invalid weather data');
      // }

      //Zod Validation: Es más limpio y escalable que los Type Guards

      // Esto retorna un objeto con un error si no cumple con el esquema de validación y si cumple retorna el objeto filtrado con el esquema de validación
      const result = WeatherSchema.safeParse(weatherData);

      if (result.success) {
        setWeather(result.data);
      } else {
        throw new Error("Invalid weather data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => Boolean(weather.name), [weather]);
  return {
    hasWeatherData,
    weather,
    loading,
    notFound,
    fetchWeather,
  };
}
