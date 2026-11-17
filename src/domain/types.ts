export type Route = {
  id: string;
  name: string;
  distanceKm: number;
};

export type Run = {
  id: string;
  parentId: string;
  date: string;
  durationMin: number;
  notes?: string;
};