import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UpcomingEvents from '../views/UpcomingEvents.vue'

describe('UpcomingEvents', () => {
  it('GIVEN event data is provided WHEN the page renders THEN the table contains matching items', () => {
    const wrapper = mount(UpcomingEvents)
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

    eventData.forEach((event, index) => {
      expect(rows[index].text()).toBe(event.title)
      expect(wrapper.text()).toContain(event.date)
      expect(wrapper.text()).toContain(event.time)
      expect(wrapper.text()).toContain(event.location)
      expect(wrapper.text()).toContain(event.description)
    })

    const eventsScroll = wrapper.find('.events-scroll')
    expect(eventsScroll.exists()).toBe(true)
    expect(eventsScroll.classes()).toContain('events-scroll')
  })
})
