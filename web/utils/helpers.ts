export function formatStartTime(startTime: string) {
  var timeComponents = startTime.split(":")

  var hours = timeComponents[0]
  var minutes = timeComponents[1]

  return hours + ":" + minutes
}

export function formatMinutes(minutes: number) {
  var hours = Math.floor(minutes / 60)
  var remainingMinutes = minutes % 60

  var formattedTime = ""
  if (hours > 0) formattedTime += hours + "h "
  if (remainingMinutes > 0) formattedTime += remainingMinutes + "min"

  return formattedTime.trim()
}
