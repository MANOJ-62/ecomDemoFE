import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard - FoodZone',
  description: 'Manage your FoodZone store',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
