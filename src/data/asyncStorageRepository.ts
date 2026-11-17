import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, Run } from '../domain/types';
import { demoRoutes } from './demoRoutes';
import { DiaryRepository } from './repository';

const ROUTES_KEY = 'runningdiary:routes';
const RUNS_KEY = 'runningdiary:runs';

async function readList<T>(key: string): Promise<T[] | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) {
    return null;
  }
  return JSON.parse(raw) as T[];
}

async function writeList<T>(key: string, list: T[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(list));
}

async function getRoutes(): Promise<Route[]> {
  const routes = await readList<Route>(ROUTES_KEY);
  if (routes === null) {
    await writeList(ROUTES_KEY, demoRoutes);
    return demoRoutes;
  }
  return routes;
}

async function getRuns(): Promise<Run[]> {
  const runs = await readList<Run>(RUNS_KEY);
  return runs ?? [];
}

async function addRun(run: Run): Promise<void> {
  // BR-04: bieg musi wskazywać istniejącą trasę.
  const routes = await getRoutes();
  if (!routes.some((route) => route.id === run.parentId)) {
    throw new Error('Nie można zapisać biegu: wybrana trasa nie istnieje.');
  }
  const runs = await getRuns();
  await writeList(RUNS_KEY, [...runs, run]);
}

export const asyncStorageRepository: DiaryRepository = {
  getRoutes,
  getRuns,
  addRun,
};