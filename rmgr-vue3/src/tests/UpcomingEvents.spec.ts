import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import UpcomingEvents from '../views/UpcomingEvents.vue'

describe('UpcomingEvents', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  it('GIVEN calendar feed data exists WHEN the page renders THEN the list matches the feed items', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:RMGR Monthly Meeting
DTSTART;TZID=America/Edmonton:20260917T191500
DTEND;TZID=America/Edmonton:20260917T204500
RRULE:FREQ=MONTHLY;BYDAY=3TH
LOCATION:2715 Dovely Park SE, Calgary, AB T2B 3G8, Canada
DESCRIPTION:Monthly meeting
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
      title: 'RMGR Monthly Meeting',
      date: 'September 17, 2026',
      time: '1:15 PM - 2:45 PM',
      location: '2715 Dovely Park SE, Calgary, AB T2B 3G8, Canada',
      description: 'Monthly meeting',
    })
    expect(eventData[1]).toMatchObject({
      date: 'October 17, 2026',
    })
    expect(rows[0].text()).toBe(eventData[0].title)
    expect(rows[1].text()).toBe(eventData[1].title)

    expect(fetchMock).toHaveBeenCalledWith('/calendar-ics')
  })
})
