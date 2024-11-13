import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ProjectType = 'website' | 'branding' | 'social' | 'design';

async function handleProject(projectType: ProjectType, data: any, isUpdate: boolean) {
  switch (projectType) {
    case 'website':
      return isUpdate
        ? prisma.websites.update({ where: { id: data.id }, data })
        : prisma.websites.create({ data });
    case 'branding':
      return isUpdate
        ? prisma.brand.update({ where: { id: data.id }, data })
        : prisma.brand.create({ data });
    case 'social':
      return isUpdate
        ? prisma.social.update({ where: { id: data.id }, data })
        : prisma.social.create({ data });
    case 'design':
      return isUpdate
        ? prisma.design.update({ where: { id: data.id }, data })
        : prisma.design.create({ data });
    default:
      throw new Error('Invalid project type');
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { projectType, ...projectData } = data;

    if (!projectType || typeof projectType !== 'string') {
      return NextResponse.json({ error: 'Invalid project type' }, { status: 400 });
    }

    const isUpdate = !!projectData.id;
    const result = await handleProject(projectType as ProjectType, projectData, isUpdate);

    return NextResponse.json(result, { status: isUpdate ? 200 : 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectType = searchParams.get('type') as ProjectType;

    if (!projectType) {
      return NextResponse.json({ error: 'Project type is required' }, { status: 400 });
    }

    let projects;
    switch (projectType) {
      case 'website':
        projects = await prisma.websites.findMany();
        break;
      case 'branding':
        projects = await prisma.brand.findMany();
        break;
      case 'social':
        projects = await prisma.social.findMany();
        break;
      case 'design':
        projects = await prisma.design.findMany();
        break;
      default:
        return NextResponse.json({ error: 'Invalid project type' }, { status: 400 });
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

console.log('Common update route for all project types has been set up.');