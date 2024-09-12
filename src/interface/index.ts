export interface SearchInterface {
  country: string;
  city: string;
}
export interface CountryInterface {
  code: string;
  name: string;
}

export interface Weather {
  name: string;
  main:{
    temp: number;
    temp_min: number;
    temp_max: number;
  };

}
