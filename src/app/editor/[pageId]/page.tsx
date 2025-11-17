import { getPayload } from 'payload';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import VisualEditor from '../components/VisualEditor';

export default async function EditorPage({
  params,
}: {
  params: { pageId: string };
}) {
  const payload = await getPayload({ config });

  try {
    const page = await payload.findByID({
      collection: 'pages',
      id: params.pageId,
    });

    return <VisualEditor page={page} />;
  } catch (error) {
    notFound();
  }
}