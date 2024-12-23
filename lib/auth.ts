import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt'

const prisma = new PrismaClient()

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    })
    return user
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch user.')
  } finally {
    await prisma.$disconnect()
  }
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  try {
    return await compare(plainPassword, hashedPassword)
  } catch (error) {
    console.error('Password verification error:', error)
    throw new Error('Password verification failed.')
  }
}

