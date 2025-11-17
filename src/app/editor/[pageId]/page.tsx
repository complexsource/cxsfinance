import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import VisualEditor from '../components/VisualEditor'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ pageId: string }> // ← Changed to Promise
}) {
  const payload = await getPayload({ config })

  // Await params before using
  const { pageId } = await params // ← Added await

  try {
    const page = await payload.findByID({
      collection: 'pages',
      id: pageId, // ← Now using awaited pageId
    })

    return <VisualEditor page={page} />
  } catch (error) {
    notFound()
  }
}
