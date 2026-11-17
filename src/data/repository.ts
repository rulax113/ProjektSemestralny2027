import { Route, Run } from '../domain/types';

export interface DiaryRepository {
  getRoutes(): Promise<Route[]>;
  getRuns(): Promise<Run[]>;
  addRun(run: Run): Promise<void>;
}