import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; // Adjust path based on your project structure

// POST handler for updating data
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Use Prisma to update your database
    const updatedRecord = await prisma.clients.update({
      where: { id: data.id },
      data: {
        fieldName: data.fieldValue,
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
