import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/auth'
import { redirect } from 'next/navigation'
import CMSContent from './CMSContent'

export default async function CMS() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return <CMSContent />
}