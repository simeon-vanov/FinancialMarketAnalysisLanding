import { fromUnixTime } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'

export const convertUnixToLocalTimeUnix = (unixTime: number) => {
  // Convert UNIX time to a Date object
  const utcDate = fromUnixTime(unixTime)

  // Convert the UTC date to the local time zone
  const localDate = fromZonedTime(utcDate, 'UTC')

  // Convert back to UNIX timestamp in seconds
  return Math.floor(localDate.getTime() / 1000)
}

export const parseToDate = (unixTime: number) => {
  // convert UNIX time to a Date object which will automatically convert the time to the local time zone
    const localTime = fromUnixTime(unixTime)

  // convert to UTC to offset back from the local time zone
  const utcTime = toZonedTime(localTime, 'UTC')

  return utcTime
}
