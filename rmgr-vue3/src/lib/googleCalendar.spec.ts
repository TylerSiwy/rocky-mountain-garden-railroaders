import { describe, expect, it } from 'vitest'
import { parseGoogleCalendarIcs } from './googleCalendar'

describe('googleCalendar', () => {
  it('GIVEN ICS text WHEN parsing THEN it returns calendar events', () => {
    const events = parseGoogleCalendarIcs(`BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:Annual Club Garden Tour & Open House
DTSTART;TZID=America/Edmonton:20260719T160000
DTEND;TZID=America/Edmonton:20260719T223000
LOCATION:Various Member Layouts, Calgary Area
DESCRIPTION:Summer event
END:VEVENT
END:VCALENDAR`)

    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({
      title: 'Annual Club Garden Tour & Open House',
      location: 'Various Member Layouts, Calgary Area',
      description: 'Summer event',
    })
  })
})
