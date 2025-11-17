import { getPayload } from 'payload'
import config from '@/payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null }
}

export async function getPayloadClient() {
  if (cached.client) {
    return cached.client
  }

  cached.client = await getPayload({ config })

  return cached.client
}

// Helper function to get page by slug
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return pages.docs[0]
}

// Helper function to get all pages
export async function getAllPages() {
  const payload = await getPayloadClient()

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  return pages.docs
}
