import { getPayload } from 'payload';
import config from '@/payload.config';
import RenderBlocks from '@/components/RenderBlocks';

export default async function HomePage() {
  const payload = await getPayload({ config });

  // Fetch the homepage
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  });

  const page = pages.docs[0];

  if (!page) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Homepage not found</h1>
        <p>Please create a page with slug &quot;home&quot; in the admin panel.</p>
        <a href="/admin" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go to Admin Panel
        </a>
      </div>
    );
  }

  return (
    <main>
      {/* Render all page builder blocks */}
      <RenderBlocks blocks={page.pageBuilder || []} />
    </main>
  );
}