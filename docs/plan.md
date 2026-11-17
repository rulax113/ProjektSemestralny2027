# Plan projektu RunningDiary

Aplikacja służy do zapisywania tras i biegów. Funkcje dodaję po kolei, laboratorium po laboratorium.

## Laboratorium 1

- [x] Wybrałem React Native z Expo i TypeScript
- [x] Przygotowałem ekran startowy RunningDiary
- [x] Uruchomiłem aplikację na iPhonie w Expo Go
- [x] Przygotowałem README i dokumenty projektu
- [x] Uzupełnię sprawozdanie własnymi wynikami i dodam zrzut ekranu
- [ ] Dodam Issue i branch oraz wyślę początkowe pliki w jednym PR

## Laboratorium 2

- [x] Modele `Route` i `Run` oraz walidacja formularza biegu (`src/domain`)
- [x] Lokalny zapis w AsyncStorage i generowanie UUID (`src/data`)
- [x] Nawigacja (React Navigation) i trzy ekrany: lista biegów, szczegóły, formularz
- [x] Stan aplikacji w React Context i połączenie ekranów z zapisem
- [x] Dodawanie i odczyt biegów z trwałym zapisem
- [x] Testy ręczne TC-01 do TC-05 na iPhonie w Expo Go: wszystkie PASS
- [ ] Sprawozdanie z laboratorium 2 uzupełnione i wysłane w PR

## Kolejność implementacji (stan po laboratorium 2)

1. Tworzenie i edycja tras. Na razie są tylko trzy trasy demonstracyjne
2. Formularz zapisu biegu i wybór trasy: **zrobione** w laboratorium 2
3. Lista biegów: **zrobiona**. Zostaje edycja i usuwanie biegów z potwierdzeniem
4. Walidacja biegu (trasa, data, czas większy od zera): **zrobiona**. Zostaje walidacja trasy i blokada usunięcia trasy, do której są przypisane biegi
5. Wyszukiwanie, filtrowanie i sortowanie
6. Lokalny zapis danych: **zrobiony**. Zostaje podsumowanie i obliczanie tempa
7. Testy: ręczne zrobione. Zostają testy automatyczne (co najmniej jedna reguła biznesowa z testem pozytywnym i negatywnym)
8. Uzupełnienie dokumentacji po kolejnych laboratoriach

Funkcje, które nie są oznaczone jako zrobione, są planem i nie zostały jeszcze zaimplementowane.