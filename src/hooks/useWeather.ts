import axios from "axios";
import type { SearchInterface } from "../interface";
export default function useWeather() {
  
  
  const fetchWeather = async(search: SearchInterface) =>{
    const appId = '';
   try {
    const geoUTRL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
    const {data} = await axios.get(geoUTRL);
    console.log(data);
   } catch (error) {
    console.log(error);
    
   }
  }
  return {
    fetchWeather
  };
}