import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import UpcomingEvents from '../views/UpcomingEvents.vue'

describe('UpcomingEvents', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GOOGLE_CALENDAR_FEED_URL', '/calendar-ics')
  })

  it('GIVEN calendar feed data exists WHEN the page renders THEN the list matches the feed items', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      text: async () => `BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:Annual Club Garden Tour & Open House
DTSTART;TZID=America/Edmonton:20260719T160000
DTEND;TZID=America/Edmonton:20260719T223000
LOCATION:Various Member Layouts, Calgary Area
DESCRIPTION:Summer event
END:VEVENT
BEGIN:VEVENT
SUMMARY:Supertrain Exhibition Preparation Layout
DTSTART;TZID=America/Edmonton:20260815T150000
DTEND;TZID=America/Edmonton:20260815T210000
LOCATION:Club Workshop, Calgary
DESCRIPTION:Work party
END:VEVENT
END:VCALENDAR`,
    })
    vi.stubGlobal('fetch', fetchMock)

    const wrapper = mount(UpcomingEvents)
    await Promise.resolve()
    await Promise.resolve()
    await nextTick()
    await Promise.resolve()
    await nextTick()

    const { eventData, upcomingEvents } = wrapper.vm as unknown as {
      eventData: Array<{
        title: string
        date: string
        time: string
        location: string
        description: string
        highlight?: boolean
      }>
      upcomingEvents: Array<{
        title: string
        date: string
        time: string
        location: string
        description: string
        highlight?: boolean
      }>
    }

    const rows = wrapper.findAll('h3')

    expect(upcomingEvents).toHaveLength(eventData.length)
    expect(rows).toHaveLength(eventData.length)
    expect(eventData[0]).toMatchObject({
      title: 'Annual Club Garden Tour & Open House',
      date: 'July 19, 2026',
      time: '10:00 AM - 4:30 PM',
      location: 'Various Member Layouts, Calgary Area',
      description: 'Summer event',
    })
    expect(eventData[1]).toMatchObject({
      title: 'Supertrain Exhibition Preparation Layout',
      date: 'August 15, 2026',
      time: '9:00 AM - 3:00 PM',
      location: 'Club Workshop, Calgary',
      description: 'Work party',
    })
    expect(rows[0].text()).toBe(eventData[0].title)
    expect(rows[1].text()).toBe(eventData[1].title)

    const eventsScroll = wrapper.find('.events-scroll')
    expect(eventsScroll.exists()).toBe(true)
    expect(eventsScroll.classes()).toContain('events-scroll')
    expect(fetchMock).toHaveBeenCalledWith('/calendar-ics')
  })
})
