import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentPage = parseInt(searchParams.get('page') || '1');
  const websitesPerPage = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search');

  try {
    if (search) {
      const website = await prisma.websites.findFirst({
        where: {
        
          Title: search,
        },
      });

      if (!website) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }

      return NextResponse.json({ website });
    }

    const websites = await prisma.websites.findMany({
      skip: (currentPage - 1) * websitesPerPage,
      take: websitesPerPage,
    });

    const total = await prisma.websites.count();

    return NextResponse.json({ websites, total });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
