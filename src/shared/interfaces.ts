export interface IWeather {
  main: string
  description: string
  icon: string
}

export interface ICity {
  id: string
  name: string
  coord: {
    lat: number
    lon: number
  }
  main: {
    feels_like: number
    temp: number
    temp_min: number
    temp_max: number
  }
  weather: IWeather[]
  sys: {
    country: string
  }
}

export interface ITemperature {
  day: number
  night: number
  eve: number
  morn: number
  max?: number
  min?: number
}

export interface ICurrentWeather {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  weather: IWeather[]
}

export interface IDailyWeather {
  dt: number
  sunrise: number
  sunset: number
  temp: ITemperature
  feels_like: ITemperature
  weather: IWeather[]
}

export interface IWeatherDetail {
  current: ICurrentWeather
  daily: IDailyWeather[]
}
