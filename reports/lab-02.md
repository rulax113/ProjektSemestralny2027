# Sprawozdanie — Laboratorium 2

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** Dominik Ruszkiewicz  
**Projekt biznesowy:** MOB-012 — RunningDiary
**Framework:** React Native + Expo + TypeScript 
**Data zajęć:** [05.11.2026]  
**Repozytorium:** [(https://github.com/rulax113/ProjektSemestralny2027.git)]  
**Commit / tag odpowiadający oddaniu:** [hash / tag]

> Wypełnij na podstawie własnych działań. Odpowiedzi powinny zawierać dowody (pliki, commity, PR, wyniki uruchomienia), nie same deklaracje.

## T1. Analiza podejść do tworzenia aplikacji

**Cel:** świadomy wybór podejścia w kontekście wymagań własnego projektu.

1. Wymień trzy wymagania biznesowe/niefunkcjonalne swojego projektu, które wpływają na wybór technologii.
2. Porównaj podejście natywne, hybrydowe WebView, wieloplatformowe i PWA pod kątem tych wymagań.
3. Uzasadnij, dlaczego wybrany w laboratorium 1 framework pozostaje odpowiedni, albo opisz zmianę decyzji.

| Wymaganie z projektu | Znaczenie dla wyboru technologii | Wniosek |
| -------------------- | -------------------------------- | ------- |
| W1: Formularze, listy i nawigacja (FR-01–FR-09 w MOB-012: dodawanie, lista, szczegóły, wyszukiwanie, filtrowanie, sortowanie, komunikaty błędów) | Aplikacja składa się głównie z ekranów, formularzy i list z walidacją. Potrzebuję gotowych elementów interfejsu telefonu i nawigacji między ekranami | Technologia z gotowymi komponentami UI i nawigacją, najlepiej w języku, który znam |
| W2: Trwały zapis lokalny bez backendu (FR-11, zakres: jedna osoba, dane lokalne) | Dane mają zostać po zamknięciu aplikacji i być tylko na telefonie. Potrzebuję lokalnego magazynu dostępnego z kodu aplikacji | Technologia z dostępnym lokalnym magazynem. W Expo sprawdziłem go w praktyce (AsyncStorage) |
| W3: Jedna aplikacja na iPhone'a i Androida, realizowana w semestrze samodzielnie na Windowsie (wymaganie niefunkcjonalne) | Piszę sam, w ograniczonym czasie, na Windows 11, a testuję na iPhonie. Dwie osobne aplikacje oznaczałyby dwa razy więcej pracy | Jedna baza kodu, szybkie uruchamianie na telefonie bez budowania aplikacji, język TypeScript |

**Porównanie podejść i uzasadnienie:**

| Podejście | W1 formularze i listy | W2 zapis lokalny | W3 jeden kod, Windows, samodzielnie | Ocena |
| --------- | --------------------- | ---------------- | ----------------------------------- | ----- |
| Natywne (Swift / Kotlin) | Najlepsze dopasowanie do systemu | Pełny dostęp | Dwa języki i dwie aplikacje. Do aplikacji na iPhone'a potrzebny jest Xcode, czyli komputer z macOS | Za dużo pracy jak na ten projekt |
| Hybrydowe WebView | Interfejs z HTML/JS w widoku przeglądarki, wygląd inny niż natywny | Możliwy (przez przeglądarkowy magazyn lub wtyczki) | Jeden kod, ale potrzeba narzędzia do zbudowania aplikacji na telefon | Możliwe, ale interfejs mniej "z telefonu" |
| Wieloplatformowe (React Native + Expo) | Natywne komponenty i biblioteki nawigacji | Dostępne biblioteki (AsyncStorage) | Jeden kod w TypeScript, uruchamianie w Expo Go na iPhonie bez Maca | Najlepsze dopasowanie do W1–W3 |
| PWA | Interfejs jako strona internetowa | Magazyn przeglądarki | Jeden kod, bez instalacji ze sklepu. Na iPhonie możliwości zależą od przeglądarki Safari | Możliwe, ale to nie jest aplikacja mobilna w sensie przedmiotu |

Wybrałem React Native z Expo i TypeScript, bo najlepiej spełnia wszystkie trzy wymagania naraz. Daje komponenty i nawigację do formularzy i list (W1), ma bibliotekę lokalnego zapisu, którą sprawdziłem na iPhonie (W2), i pozwala napisać jedną aplikację w TypeScript na Windowsie (W3). Natywne podejście oznaczałoby naukę dwóch języków i Xcode, a PWA nie jest aplikacją mobilną w rozumieniu tego przedmiotu.

**Decyzja z laboratorium 1 pozostaje** Moje własne doświadczenia z tego laboratorium to potwierdzają: aplikacja działa na iPhonie w Expo Go, a zapis lokalny przetrwał ponowne uruchomienie. Ryzyko, które opisałem w ADR (zgodność wersji Expo i React Native), wystąpiło w laboratorium 1 (wersja Expo Go nie pasowała do projektu) i rozwiązałem je aktualizacją projektu. Biblioteki w laboratorium 2 instaluję przez `npx expo install`, żeby wersje pasowały do siebie. Na Androidzie aplikacji nie uruchamiałem, więc to jest ograniczenie mojego sprawdzenia.

**Wskazane źródła (dokumentacja, artykuły techniczne):**

- Expo: [Create a project](https://docs.expo.dev/get-started/create-a-project/)
- React Native: [Set up your environment](https://reactnative.dev/docs/set-up-your-environment)
- Flutter: [Install](https://docs.flutter.dev/install)
- NativeScript: [Setup](https://docs.nativescript.org/setup/)
- Expo: [AsyncStorage](https://docs.expo.dev/versions/v58.0.0/sdk/async-storage/)

## T2. Projekt architektury aplikacji

**Cel:** zaprojektowanie struktury umożliwiającej dalszy rozwój i testowanie.

### T2.1. Diagram architektury

Dodaj diagram (np. Mermaid w Markdown lub obraz w `docs/diagrams/`) przedstawiający:

- ekrany i komponenty UI;
- zarządzanie stanem / logikę aplikacyjną;
- warstwę dostępu do danych;
- lokalne trwałe źródło danych;
- kierunek przepływu danych.

**Diagram / odnośnik:**

[uzupełnij]

### T2.2. Model danych

Zdefiniuj co najmniej dwie powiązane encje wynikające z indywidualnych wymagań biznesowych.

| Encja | Pole | Typ | Wymagane | Znaczenie |
| ----- | ---- | --- | -------- | --------- |
| Route (Trasa) | id | UUID | Tak | Identyfikator trasy |
| Route | name | tekst | Tak | Nazwa trasy |
| Route | distanceKm | liczba | Tak | Dystans w km, większy od zera |
| Run (Bieg) | id | UUID | Tak | Identyfikator biegu |
| Run | parentId | UUID | Tak | Id trasy, do której należy bieg |
| Run | date | tekst RRRR-MM-DD | Tak | Data biegu |
| Run | durationMin | liczba | Tak | Czas w minutach, większy od zera |
| Run | notes | tekst | Nie | Uwagi do biegu |

**Relacja i sposób zapewnienia spójności (np. usuwanie encji nadrzędnej):**

Jedna trasa ma wiele biegów (`Run.parentId` wskazuje `Route.id`). Funkcja `validateRunInput` w `src/domain/validation.ts` nie pozwala zapisać biegu bez wybranej, istniejącej trasy. Blokada usuwania trasy, która ma biegi, jeszcze nie jest zaimplementowana (będzie w późniejszym etapie projektu).

### T2.3. Decyzje projektowe

| Decyzja | Wybrane rozwiązanie | Alternatywa | Uzasadnienie |
| ------- | ------------------- | ----------- | ------------ |
| Zarządzanie stanem | [uzupełnię po etapie ] | [uzupełnię po etapie ] | [uzupełnię po etapie ] |
| Przechowywanie danych | AsyncStorage (`@react-native-async-storage/async-storage`) | expo-sqlite, expo-file-system | Dane są małe i lokalne, API jest proste, biblioteka jest dostępna w Expo Go. Spójność trasa ↔ bieg sprawdza kod aplikacji, nie baza |
| Nawigacja | [uzupełnię po etapie ] | [uzupełnię po etapie ] | [uzupełnię po etapie ] |
| Separacja logiki od UI | Osobne warstwy: `src/domain` (modele i walidacja), `src/data` (repozytorium z interfejsem `DiaryRepository`) | Logika bezpośrednio w ekranach | Ekrany nie wiedzą, jak dane są zapisane, więc magazyn można zmienić bez zmian w ekranach |

Identyfikatory UUID generuje `randomUUID()` z `expo-crypto`, w pliku `src/data/id.ts`.

**Plik `docs/architecture.md`:** [link do pliku]

## T3. Nawigacja i ekrany

**Cel:** przygotowanie struktury interfejsu aplikacji.

Zaimplementuj minimum trzy ekrany:

1. listę rekordów;
2. szczegóły wybranego rekordu;
3. formularz dodawania (może być później użyty także do edycji).

**Schemat nawigacji:**

[diagram / opis]

| Ekran     | Plik / komponent | Przejście do / z ekranu | Dowód działania |
| --------- | ---------------- | ----------------------- | --------------- |
| Lista     | [ ]              | [ ]                     | [zrzut]         |
| Szczegóły | [ ]              | [ ]                     | [zrzut]         |
| Formularz | [ ]              | [ ]                     | [zrzut]         |

**Dlaczego taki układ nawigacji jest odpowiedni dla użytkownika?**

[uzupełnij]

## T4. Operacje Create i Read

**Cel:** implementacja pierwszych operacji CRUD z trwałym przechowywaniem danych.

Zaimplementuj:

- dodanie rekordu głównej encji;
- walidację minimum dwóch pól;
- zapis rekordu w lokalnym trwałym magazynie danych;
- odczyt i wyświetlenie listy rekordów;
- otwarcie szczegółów wybranego rekordu.

**Powiązanie z wymaganiami biznesowymi (ID wymagań):** [uzupełnij]

| Operacja         | Lokalizacja kodu | Reguła walidacji / zachowanie | Wynik |
| ---------------- | ---------------- | ----------------------------- | ----- |
| Create           | [ ]              | [ ]                           | [ ]   |
| Read (lista)     | [ ]              | [ ]                           | [ ]   |
| Read (szczegóły) | [ ]              | [ ]                           | [ ]   |

**Wyjaśnij przepływ danych po naciśnięciu przycisku „Zapisz”:**

[od UI przez logikę i repozytorium do zapisu, a następnie odświeżenia widoku]

## T5. Weryfikacja działania i wnioski

Przeprowadź testy manualne i podaj rzeczywiste wyniki.

| ID    | Scenariusz                           | Oczekiwany rezultat             | Wynik (PASS/FAIL) | Dowód / uwagi |
| ----- | ------------------------------------ | ------------------------------- | ----------------- | ------------- |
| TC-01 | Dodanie poprawnego rekordu           | Rekord jest zapisany i widoczny | [ ]               | [ ]           |
| TC-02 | Próba zapisu pustego wymaganego pola | Zapis zablokowany, komunikat    | [ ]               | [ ]           |
| TC-03 | Otwarcie szczegółów rekordu          | Poprawne dane rekordu           | [ ]               | [ ]           |
| TC-04 | Ponowne uruchomienie aplikacji       | Rekord pozostaje dostępny       | [ ]               | [ ]           |
| TC-05 | Brak rekordów                        | Czytelny stan pustej listy      | [ ]               | [ ]           |

**Najważniejszy napotkany problem i sposób rozwiązania:**

[uzupełnij]

**Co wymaga dalszej pracy przed laboratorium 3?**

[uzupełnij]

**Wnioski (3–6 zdań, odnoszące się do własnej implementacji):**

[uzupełnij]

## Materiały dowodowe i historia pracy

- Issue(s): [linki]
- Pull Request(s): [linki]
- Commity związane z laboratorium: [SHA / linki]
- Diagramy: [ścieżki]
- Zrzuty ekranu: [ścieżki, np. `reports/assets/lab-02/`]
- Instrukcja uruchomienia: [link do README]


## Użycie narzędzi AI (jeżeli dotyczy)

**Narzędzie i zakres wsparcia:** [np. wyjaśnienie błędu konfiguracji / propozycja porównania]  
**Jak zweryfikowano wynik:** [dokumentacja, uruchomienie, test]  
**Elementy wykonane samodzielnie:** [opis]

**Warunki formalne:** sprawozdanie w Markdown, czytelne odnośniki do działającego kodu i diagramów, zrzuty ekranu renderujące się w repozytorium, identyfikacja autora i projektu. Oceniana jest zarówno implementacja, jak i zdolność wyjaśnienia własnych decyzji. Brak dowodów wykonania może ograniczyć liczbę punktów.