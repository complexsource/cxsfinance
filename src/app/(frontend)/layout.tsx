import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'CXS Finance',
  description: 'Your trusted financial partner',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
