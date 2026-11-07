import React from 'react';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA } from '@/lib/constants';
import { ProjectDetailClient } from './ProjectDetailClient';

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS_DATA.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient id={id} />;
}
