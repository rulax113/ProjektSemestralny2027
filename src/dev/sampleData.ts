import { demoRoutes } from '../data/demoRoutes';
import { Run } from '../domain/types';

export const sampleRuns: Run[] = [
  {
    id: 'a1111111-0000-4000-8000-000000000001',
    parentId: demoRoutes[0].id,
    date: '2026-11-15',
    durationMin: 28,
    notes: 'Lekki bieg po pracy',
  },
  {
    id: 'a1111111-0000-4000-8000-000000000002',
    parentId: demoRoutes[1].id,
    date: '2026-11-12',
    durationMin: 49.5,
  },
  {
    id: 'a1111111-0000-4000-8000-000000000003',
    parentId: demoRoutes[2].id,
    date: '2026-11-09',
    durationMin: 71,
    notes: 'Długi bieg w weekend',
  },
];

export function routeNameById(routeId: string): string {
  const route = demoRoutes.find((item) => item.id === routeId);
  return route ? route.name : 'Nieznana trasa';
}