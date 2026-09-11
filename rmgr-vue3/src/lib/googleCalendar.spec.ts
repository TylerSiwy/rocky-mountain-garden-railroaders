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

  it('GIVEN a recurring monthly event WHEN parsing THEN it expands future instances', () => {
    const events = parseGoogleCalendarIcs(`BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:RMGR Monthly Meeting
DTSTART;TZID=America/Edmonton:20260917T191500
DTEND;TZID=America/Edmonton:20260917T204500
RRULE:FREQ=MONTHLY;BYDAY=3TH
LOCATION:2715 Dovely Park SE, Calgary, AB T2B 3G8, Canada
DESCRIPTION:Monthly meeting
END:VEVENT
END:VCALENDAR`)

    expect(events).toHaveLength(12)
    expect(events[0]).toMatchObject({
      title: 'RMGR Monthly Meeting',
      date: 'September 17, 2026',
      time: '1:15 PM - 2:45 PM',
    })
    expect(events[1]).toMatchObject({
      date: 'October 17, 2026',
    })
  })

  it('GIVEN multiple events WHEN parsing THEN it sorts them from soonest to latest', () => {
    const events = parseGoogleCalendarIcs(`BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:Later Event
DTSTART;TZID=America/Edmonton:20261017T191500
DTEND;TZID=America/Edmonton:20261017T204500
LOCATION:Later
DESCRIPTION:Later
END:VEVENT
BEGIN:VEVENT
SUMMARY:Sooner Event
DTSTART;TZID=America/Edmonton:20260917T191500
DTEND;TZID=America/Edmonton:20260917T204500
LOCATION:Sooner
DESCRIPTION:Sooner
END:VEVENT
END:VCALENDAR`)

    expect(events[0].title).toBe('Sooner Event')
    expect(events[1].title).toBe('Later Event')
  })
})
