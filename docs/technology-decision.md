# ADR-001: Wybór frameworka

## Kontekst i wymagania

MOB-012 Robię aplikację RunningDiary do zapisywania tras i biegów. Aplikacja ma działać na telefonie i przechowywać dane lokalnie.

## Rozważone alternatywy

React Native z Expo pozwala mi tworzyć aplikację w TypeScript.
Flutter też pasuje do tego projektu, ale musiałbym nauczyć się Darta.
NativeScript również obsługuje JavaScript i TypeScript. Musiałbym sprawdzić, czy ma potrzebne mi narzędzia.
## Decyzja

Wybrałem React Native z Expo i TypeScript. To mój wybór na początek projektu.

## Uzasadnienie

Aplikacja będzie zawierała formularze i listy.
Będę mógł wykorzystać TypeScript do opisania tras i biegów.
Chcę najpierw uruchomić prosty ekran, a potem dodawać kolejne funkcje.
## Konsekwencje i ryzyka

Muszę pilnować zgodnych wersji Expo i React Native.
Na razie aplikacja nie zapisuje danych i nie ma gotowych funkcji CRUD.

## Warunki ponownego rozpatrzenia decyzji

Rozważę inną technologię, jeśli nie uda mi się uruchomić potrzebnych funkcji w Expo.
