import * as Moment from "moment"
import { DISPLAY_DATE_FORMAT } from "./constants"

export const getWeatherImageUrl = (iconId?: string) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

export const convertUnixToDate = (unixTimestamp?: number, format: string = DISPLAY_DATE_FORMAT) =>
  unixTimestamp ? Moment.unix(unixTimestamp).format(format) : null
