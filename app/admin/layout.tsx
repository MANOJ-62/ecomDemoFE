import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Hangrow',
  description: 'Manage your Hangrow store',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fff8eb] text-[#16130f]">
      <AdminSidebar />
      <main className="md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
