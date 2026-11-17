import { Route } from './types';

export type RunFormInput = {
  parentId: string;
  date: string;
  durationMin: string;
  notes: string;
};

export type RunFormErrors = {
  parentId?: string;
  date?: string;
  durationMin?: string;
};

export function parseDecimal(text: string): number | null {
  const normalized = text.trim().replace(',', '.');
   if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }
  return Number(normalized);
}

function existsInCalendar(date: string): boolean {
  const [year, month, day] = date.split('-').map(Number);
  const check = new Date(year, month - 1, day);
  return (
    check.getFullYear() === year &&
    check.getMonth() === month - 1 &&
    check.getDate() === day
  );
}

export function validateRunInput(
  input: RunFormInput,
  routes: Route[],
): RunFormErrors {
  const errors: RunFormErrors = {};

  if (input.parentId === '') {
    errors.parentId = 'Wybierz trasę.';
  } else if (!routes.some((route) => route.id === input.parentId)) {
    errors.parentId = 'Wybrana trasa nie istnieje.';
  }

  const date = input.date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.date = 'Podaj datę w formacie RRRR-MM-DD, np. 2026-11-17.';
  } else if (!existsInCalendar(date)) {
    errors.date = 'Taka data nie istnieje w kalendarzu.';
  }

  if (input.durationMin.trim() === '') {
    errors.durationMin = 'Podaj czas biegu w minutach.';
  } else {
    const minutes = parseDecimal(input.durationMin);
    if (minutes === null) {
      errors.durationMin = 'Podaj liczbę, np. 32 lub 32,5.';
    } else if (minutes <= 0) {
      errors.durationMin = 'Czas musi być większy od zera.';
    }
  }

  return errors;
}
export function hasErrors(errors: RunFormErrors): boolean {
  return Object.keys(errors).length > 0;
}