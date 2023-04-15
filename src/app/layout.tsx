import '@/app/globals.css';
import AppHeader from '@/components/AppHeader';

export const metadata = {
  icons: {
      icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main className="max-w-5xl mx-auto py-6 px-5">
          {children}
        </main>
      </body>
    </html>
  )
}
