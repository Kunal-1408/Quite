import { prisma } from './prisma'
import { hashPassword } from './auth'

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
    },
  })
}

