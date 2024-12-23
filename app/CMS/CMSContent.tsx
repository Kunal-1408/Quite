import { Card } from '@/components/ui/card'

interface CMSContentProps {
  userEmail?: string | null
}

export function CMSContent({ userEmail }: CMSContentProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">CMS Dashboard</h1>
        <p className="text-gray-500">Welcome back, {userEmail}</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Content Management</h2>
          <p className="text-gray-500">Manage your website content and assets</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-gray-500">Manage user accounts and permissions</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-500">Configure your CMS preferences</p>
        </Card>
      </div>
    </div>
  )
}

