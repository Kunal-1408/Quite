import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: {
      email: 'admin@example.com',
    },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
    },
  })
  
  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })