import { http, HttpResponse } from 'msw'

/**
 * Helper to create mock AlgoliaHit objects (mimics Algolia API response format)
 */
function createMockAlgoliaHit(
  name: string,
  overrides: {
    description?: string
    version?: string
    downloadsLast30Days?: number
    keywords?: string[]
    modified?: number
    license?: string
  } = {},
) {
  return {
    objectID: name,
    name,
    version: overrides.version || '1.2.3',
    description: overrides.description || `Mock package ${name}`,
    modified: overrides.modified || new Date('2026-01-22T10:07:07.000Z').getTime(),
    homepage: `https://github.com/org/${name.replace('@', '').replace('/', '-')}`,
    repository: {
      url: `https://github.com/org/${name.replace('@', '').replace('/', '-')}`,
      type: 'git',
    },
    owners: [
      {
        name: 'Patak Dog',
        email: 'patak@patak.dog',
      },
    ],
    downloadsLast30Days: overrides.downloadsLast30Days || 100000,
    downloadsRatio: 1,
    popular: (overrides.downloadsLast30Days || 100000) > 50000,
    keywords: overrides.keywords || [],
    deprecated: false,
    isDeprecated: false,
    license: overrides.license || 'MIT',
    isSecurityHeld: false,
  }
}

/**
 * Mock handler: Org with multiple packages (default success scenario)
 */
export const mockOrgPackagesSuccess = [
  // Return the org package list
  http.get('/api/registry/org/:org/packages', ({ params }) => {
    const org = params.org as string
    const packages = [
      `@${org}/xmpn`,
      `@${org}/schema`,
      `@${org}/i18n`,
      `@${org}/noodle`,
      `@${org}/tester`,
      `${org}`,
    ]

    return HttpResponse.json({
      packages,
      count: packages.length,
    })
  }),

  // Mock Algolia getObjects endpoint for package metadata
  http.post('https://*.algolia.net/1/indexes/*/objects', async ({ request }) => {
    const body = (await request.json()) as any
    const requests = body?.requests || []

    // Return AlgoliaHit objects for each requested package
    const results = requests.map((req: any) => {
      const packageName = req.objectID
      const orgMatch = packageName.match(/@([\w-]+)\//) || [packageName, packageName]
      const org = orgMatch[1]
      const packageShortName = packageName.replace(`@${org}/`, '').replace(org, '')

      return createMockAlgoliaHit(packageName, {
        description: `${org.charAt(0).toUpperCase() + org.slice(1)} ${packageShortName} - mocked package`,
        downloadsLast30Days: 88477,
        keywords: [org, packageShortName],
        modified: new Date('2026-01-22T10:07:07.000Z').getTime(),
      })
    })

    return HttpResponse.json({ results })
  }),
]

/**
 * Mock handler: Org with single package
 */
export const mockOrgPackagesSingle = [
  http.get('/api/registry/org/:org/packages', ({ params }) => {
    const org = params.org as string
    const packageName = `@${org}/only-package`

    return HttpResponse.json({
      packages: [packageName],
      count: 1,
    })
  }),

  http.post('https://*.algolia.net/1/indexes/*/objects', async ({ request }) => {
    const body = (await request.json()) as any
    const requests = body?.requests || []

    // Return AlgoliaHit objects for each requested package
    const results = requests.map((req: any) => {
      const packageName = req.objectID

      return createMockAlgoliaHit(packageName, {
        description: 'The only package in this organization',
        downloadsLast30Days: 5308, // 1234 weekly
        keywords: ['single', 'lonely'],
        modified: new Date('2026-01-22T10:07:07.000Z').getTime(),
      })
    })

    return HttpResponse.json({ results })
  }),
]

/**
 * Mock handler: Empty org (no packages)
 */
export const mockOrgPackagesEmpty = [
  http.get('/api/registry/org/:org/packages', () => {
    return HttpResponse.json({
      packages: [],
      count: 0,
    })
  }),
]

/**
 * Mock handler: Org not found (404 error)
 */
export const mockOrgPackagesNotFound = [
  http.get('/api/registry/org/:org/packages', () => {
    return HttpResponse.json(
      {
        error: 'Not Found',
        message: 'Organization not found',
      },
      { status: 404 },
    )
  }),
]

/**
 * Mock handler: Loading state (requests never resolve)
 */
export const mockOrgPackagesLoading = [
  http.get('/api/registry/org/:org/packages', async () => {
    // Delay indefinitely to show loading state
    await new Promise(() => {})
    return HttpResponse.json({ packages: [], count: 0 })
  }),
  http.post('https://*.algolia.net/1/indexes/*/objects', async () => {
    // Delay indefinitely to show loading state
    await new Promise(() => {})
    return HttpResponse.json({ results: [] })
  }),
]
