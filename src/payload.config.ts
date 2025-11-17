import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  collections: [
    Users,
    Pages,
    Media,
  ],
  
  editor: lexicalEditor(),
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),
  
  secret: process.env.PAYLOAD_SECRET || '',
  
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});