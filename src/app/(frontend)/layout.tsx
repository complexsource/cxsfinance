import '@/app/globals.css';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata = {
  title: 'CXS Finance',
  description: 'Your trusted financial partner',
};