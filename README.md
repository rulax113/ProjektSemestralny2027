# RunningDiary

Prosta aplikacja mobilna do zapisywania tras i biegów. Projekt realizuje kartę MOB-012. Na tym etapie zawiera zarys ekranu startowego;

## Technologia

React Native z Expo i TypeScript. Uzasadnienie oraz porównanie alternatyw znajdują się w [decyzji technologicznej](docs/technology-decision.md) i [porównaniu](docs/technology-comparison.md).

## Uruchomienie

Wymagane: Node.js LTS, npm, Git oraz Expo Go na telefonie. Do lokalnego uruchomienia:

```powershell
npm install
npx expo start
```

Zeskanuj kod QR w Expo Go. Środowisko bieżące ma Node.js 24.22.1

## Zakres docelowy

- pełny CRUD biegów i tworzenie/odczyt/edycja tras;
- wyszukiwanie, filtrowanie i sortowanie;
- walidacja dodatniego dystansu i czasu oraz blokada usuwania trasy z biegami;
- obliczanie tempa: czas w minutach / dystans w km;
- trwały zapis lokalny.

Na razie powyższe funkcje są planem, a nie gotową funkcjonalnością. Zakres projektu i kolejność prac: [docs/plan.md](docs/plan.md).

## Dokumentacja i praca

- [Wymagania MOB-012](docs/requirements.md)
- [Architektura](docs/architecture.md)
- [Plan kolejnych etapów](docs/plan.md)
- Sprawozdania: `reports/`
