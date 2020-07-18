import * as Moment from "moment"

export const getWeatherImageUrl = (iconId?: string) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

export const convertUnixToDate = (unixTimestamp?: number, format: string = "DD-MM-YYYY hh:mm:ss Z") =>
  unixTimestamp ? Moment.unix(unixTimestamp).format(format) : null
