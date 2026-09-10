export type CalendarEvent = {
  title: string
  date: string
  time: string
  location: string
  description: string
  highlight?: boolean
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value))

const formatTime = (start: string, end?: string) => {
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  const startTime = timeFormatter.format(new Date(start))
  if (!end) return startTime
  const endTime = timeFormatter.format(new Date(end))
  return `${startTime} - ${endTime}`
}

export const mapGoogleCalendarFeedToEvents = (items: Array<any>): CalendarEvent[] => {
  return items.map((item) => {
    const title = item.summary ?? 'Untitled event'
    const start = item.start?.dateTime ?? item.start?.date
    const end = item.end?.dateTime ?? item.end?.date
    const location = item.location ?? 'TBD'
    const description = item.description ?? ''

    return {
      title,
      date: formatDate(start),
      time: item.start?.dateTime ? formatTime(start, end) : 'All day',
      location,
      description,
    }
  })
}

const parseIcsDate = (value: string) => {
  const parsed = value.trim()
  const compact = parsed.replace(/Z$/, '').replace(/^.*:/, '')

  if (/^\d{8}$/.test(compact)) {
    const year = Number(compact.slice(0, 4))
    const month = Number(compact.slice(4, 6)) - 1
    const day = Number(compact.slice(6, 8))
    return new Date(Date.UTC(year, month, day))
  }

  const year = Number(compact.slice(0, 4))
  const month = Number(compact.slice(4, 6)) - 1
  const day = Number(compact.slice(6, 8))
  const hour = Number(compact.slice(9, 11))
  const minute = Number(compact.slice(11, 13))
  const second = Number(compact.slice(13, 15))

  return new Date(Date.UTC(year, month, day, hour, minute, second))
}

const unfoldIcs = (ics: string) => ics.replace(/\r?\n[ \t]/g, '')

const decodeIcsValue = (value: string) =>
  value
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')

export const parseGoogleCalendarIcs = (ics: string): CalendarEvent[] => {
  const lines = unfoldIcs(ics).split(/\r?\n/)
  const events: CalendarEvent[] = []
  let current: Record<string, string> | null = null

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = {}
      continue
    }

    if (line === 'END:VEVENT') {
      if (current?.DTSTART) {
        const startValue = current.DTSTART
        const endValue = current.DTEND
        const start = parseIcsDate(startValue)
        const end = endValue ? parseIcsDate(endValue) : undefined
        events.push({
          title: current.SUMMARY ?? 'Untitled event',
          date: formatDate(start.toISOString()),
          time: end ? formatTime(start.toISOString(), end.toISOString()) : 'All day',
          location: current.LOCATION ?? 'TBD',
          description: current.DESCRIPTION ?? '',
        })
      }
      current = null
      continue
    }

    if (!current) continue

    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex)
    const value = decodeIcsValue(line.slice(colonIndex + 1).trim())
    const normalizedKey = key.split(';')[0]
    current[normalizedKey] = value
  }

  return events
}
