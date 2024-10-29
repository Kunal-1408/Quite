import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const landingPageContent = await prisma.textcollections.findFirst({
        where: { type: 'landingPage' }
      })
      const servicePageContent = await prisma.textcollections.findFirst({
        where: { type: 'servicePage' }
      })

      const content = {
        landingPage: landingPageContent,
        servicePage: servicePageContent
      }

      res.status(200).json(content)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching content' })
    }
  } else if (req.method === 'POST') {
    try {
      const { landingPage, servicePage } = req.body

      const updatedLandingPage = await prisma.textcollections.upsert({
        where: { type: 'landingPage' },
        update: landingPage,
        create: { ...landingPage, type: 'landingPage' },
      })

      const updatedServicePage = await prisma.textcollections.upsert({
        where: { type: 'servicePage' },
        update: servicePage,
        create: { ...servicePage, type: 'servicePage' },
      })

      res.status(200).json({
        landingPage: updatedLandingPage,
        servicePage: updatedServicePage
      })
    } catch (error) {
      res.status(500).json({ error: 'Error updating content' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}