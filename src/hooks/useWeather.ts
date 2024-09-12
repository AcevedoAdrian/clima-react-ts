import { useState } from "react";
import axios from "axios";
import {z} from 'zod';
// import { object,string, number, parse,type Output } from "valibot";
import type { SearchInterface } from "../interface";
export default function useWeather() {
  
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
      temp_max: z.number()
    })
  })

  // Inferencias en base al esquema de validación de Zod
  type Weather = z.infer<typeof WeatherSchema>;

  const [weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0
    }
  });

  const fetchWeather = async(search: SearchInterface) =>{
    const appId = import.meta.env.VITE_API_KEY;
   try {

    const geoUTRL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
    const {data} = await axios.get(geoUTRL);
 
    const {lat, lon} = data[0];
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

    const {data: weatherData} = await axios.get(weatherURL);
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
    
    if(result.success){
      setWeather(result.data);
    } else {
      throw new Error('Invalid weather data');
    }
    


   } catch (error) {
    console.log(error);
    
   }
  }
  return {
    weather,
    fetchWeather
  };
}