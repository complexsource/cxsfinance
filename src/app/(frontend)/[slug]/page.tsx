import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import BannerBlock from '@/components/blocks/BannerBlock'

export default async function HomePage() {
  const payload = await getPayload({ config })

  try {
    // Find homepage by slug or pageType
    const pages = await payload.find({
      collection: 'pages',
      where: {
        or: [
          {
            slug: {
              equals: 'home',
            },
          },
          {
            pageType: {
              equals: 'homepage',
            },
          },
        ],
      },
      limit: 1,
    })

    const page = pages.docs[0]

    if (!page) {
      return (
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to CXS Finance</h1>
            <p className="text-gray-600 mb-8">Create your first page in the admin panel</p>
            <a
              href="/admin"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Admin
            </a>
          </div>
        </main>
      )
    }

    return (
      <main>
        {/* Render page builder blocks */}
        {page.pageBuilder &&
          Array.isArray(page.pageBuilder) &&
          page.pageBuilder.map((block: any, index: number) => {
            if (block.blockType === 'banner') {
              return (
                <BannerBlock
                  key={index}
                  heading={block.heading}
                  subheading={block.subheading}
                  textAlignment={block.textAlignment}
                  height={block.height}
                  textColor={block.textColor}
                  backgroundImage={block.backgroundImage}
                />
              )
            }
            return null
          })}
      </main>
    )
  } catch (error) {
    console.error('Error loading homepage:', error)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CXS Finance</h1>
          <p className="text-gray-600 mb-8">Create your first page in the admin panel</p>
          <a
            href="/admin"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Admin
          </a>
        </div>
      </main>
    )
  }
}

export async function generateMetadata() {
  const payload = await getPayload({ config })

  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        or: [{ slug: { equals: 'home' } }, { pageType: { equals: 'homepage' } }],
      },
      limit: 1,
    })

    const page = pages.docs[0]

    return {
      title: page?.metaTitle || page?.title || 'CXS Finance',
      description: page?.metaDescription || 'Your trusted financial partner',
    }
  } catch (error) {
    return {
      title: 'CXS Finance',
      description: 'Your trusted financial partner',
    }
  }
}
