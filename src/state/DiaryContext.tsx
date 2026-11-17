import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { asyncStorageRepository as repository } from '../data/asyncStorageRepository';
import { newId } from '../data/id';
import { Route, Run } from '../domain/types';
import {
  hasErrors,
  parseDecimal,
  RunFormErrors,
  RunFormInput,
  validateRunInput,
} from '../domain/validation';

type DiaryContextValue = {
  routes: Route[];
  runs: Run[];
  loading: boolean;
  error: string | null;
  addRun: (input: RunFormInput) => Promise<RunFormErrors>;
};

const DiaryContext = createContext<DiaryContextValue | null>(null);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setRoutes(await repository.getRoutes());
        setRuns(await repository.getRuns());
      } catch {
        setError('Nie udało się wczytać danych z pamięci telefonu.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function addRun(input: RunFormInput): Promise<RunFormErrors> {
    // 1. Walidacja (reguły z src/domain/validation.ts)
    const errors = validateRunInput(input, routes);
    if (hasErrors(errors)) {
      return errors;
    }

    const notes = input.notes.trim();
    const run: Run = {
      id: newId(),
      parentId: input.parentId,
      date: input.date.trim(),
      // po walidacji wiemy, że czas jest poprawną liczbą
      durationMin: parseDecimal(input.durationMin)!,
      notes: notes === '' ? undefined : notes,
    };

    await repository.addRun(run);
    setRuns(await repository.getRuns());
    return {};
  }

  return (
    <DiaryContext.Provider value={{ routes, runs, loading, error, addRun }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiary(): DiaryContextValue {
  const context = useContext(DiaryContext);
  if (context === null) {
    throw new Error('useDiary musi być używany wewnątrz DiaryProvider.');
  }
  return context;
}