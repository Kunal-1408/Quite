import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

type ProjectType = 'website' | 'branding' | 'social' | 'design';

interface FetchParams {
  currentPage: number;
  itemsPerPage: number;
  search: string;
}

async function fetchWebsites({ currentPage, itemsPerPage, search }: FetchParams) {
  const searchCondition: Prisma.WebsitesWhereInput = search
    ? {
        OR: [
          { Title: { contains: search, mode: 'insensitive' } },
          { Description: { contains: search, mode: 'insensitive' } },
          { Tags: { hasSome: [search] } },
        ],
      }
    : {};

  const highlightedItems = await prisma.websites.findMany({
    where: { highlighted: true, ...searchCondition },
  });

  const nonHighlightedItems = await prisma.websites.findMany({
    where: { highlighted: false, ...searchCondition },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const total = await prisma.websites.count({ where: searchCondition });

  return { items: [...highlightedItems, ...nonHighlightedItems], total, highlightedCount: highlightedItems.length };
}

async function fetchBranding({ currentPage, itemsPerPage, search }: FetchParams) {
  const searchCondition: Prisma.BrandWhereInput = search
    ? {
        OR: [
          { Brand: { contains: search, mode: 'insensitive' } },
          { Description: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } },
        ],
      }
    : {};

  const highlightedItems = await prisma.brand.findMany({
    where: { highlighted: true, ...searchCondition },
  });

  const nonHighlightedItems = await prisma.brand.findMany({
    where: { highlighted: false, ...searchCondition },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const total = await prisma.brand.count({ where: searchCondition });

  return { items: [...highlightedItems, ...nonHighlightedItems], total, highlightedCount: highlightedItems.length };
}

async function fetchSocial({ currentPage, itemsPerPage, search }: FetchParams) {
  const searchCondition: Prisma.socialWhereInput = search
    ? {
        OR: [
          { Brand: { contains: search, mode: 'insensitive' } },
          { Description: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } },
        ],
      }
    : {};

  const highlightedItems = await prisma.social.findMany({
    where: { highlighted: true, ...searchCondition },
  });

  const nonHighlightedItems = await prisma.social.findMany({
    where: { highlighted: false, ...searchCondition },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const total = await prisma.social.count({ where: searchCondition });

  return { items: [...highlightedItems, ...nonHighlightedItems], total, highlightedCount: highlightedItems.length };
}

async function fetchDesign({ currentPage, itemsPerPage, search }: FetchParams) {
  const searchCondition: Prisma.designWhereInput = search
    ? {
        OR: [
          { Type: { contains: search, mode: 'insensitive' } },
          { Description: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } },
        ],
      }
    : {};

  const highlightedItems = await prisma.design.findMany({
    where: { highlighted: true, ...searchCondition },
  });

  const nonHighlightedItems = await prisma.design.findMany({
    where: { highlighted: false, ...searchCondition },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const total = await prisma.design.count({ where: searchCondition });

  return { items: [...highlightedItems, ...nonHighlightedItems], total, highlightedCount: highlightedItems.length };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectType = searchParams.get('type') as ProjectType;
  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';

  if (!projectType) {
    return NextResponse.json({ error: 'Project type is required' }, { status: 400 });
  }

  try {
    const fetchParams: FetchParams = { currentPage, itemsPerPage, search };
    let result;

    switch (projectType) {
      case 'website':
        result = await fetchWebsites(fetchParams);
        break;
      case 'branding':
        result = await fetchBranding(fetchParams);
        break;
      case 'social':
        result = await fetchSocial(fetchParams);
        break;
      case 'design':
        result = await fetchDesign(fetchParams);
        break;
      default:
        return NextResponse.json({ error: 'Invalid project type' }, { status: 400 });
    }

    return NextResponse.json({ ...result, projectType });
  } catch (error) {
    console.error(`Error fetching ${projectType} projects:`, error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

console.log('Type-safe common fetching route for all project types has been set up.');