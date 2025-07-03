import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'hello-humanity',
  description: 'Humanity protocol Hello World App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  )
}
