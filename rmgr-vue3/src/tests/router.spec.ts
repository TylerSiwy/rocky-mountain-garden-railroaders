import { describe, expect, it } from 'vitest'
import { router } from '../../router/routes'

describe('router', () => {
  it('GIVEN the router WHEN it is created THEN it registers the expected routes', () => {
    expect(router.getRoutes().map((route) => route.path)).toEqual([
      '/',
      '/g-scale',
      '/events',
      '/gallery',
      '/resources',
      '/contactUs',
    ])
  })

  it('GIVEN the root route WHEN it is inspected THEN it uses About Us', () => {
    const aboutRoute = router.getRoutes().find((route) => route.path === '/')

    expect(aboutRoute?.name).toBe('About Us')
    expect(aboutRoute?.components?.default).toBeDefined()
  })

  it('GIVEN no saved position WHEN scroll behavior runs THEN it scrolls to the top', () => {
    const scrollBehavior = router.options.scrollBehavior

    expect(scrollBehavior?.({} as never, {} as never, null)).toEqual({ top: 0 })
  })
})
