# Zakres wymagań — MOB-012 RunningDiary

Źródło: karta „Specyfikacja biznesowa 12” przekazana dla projektu. To lokalny dziennik, bez backendu, kont, płatności i integracji zewnętrznych.

## Encje

- **Route / Trasa:** lokalny UUID, wymagana nazwa i dodatni dystans w km.
- **Run / Bieg:** lokalny UUID, `parentId` wskazujący istniejącą trasę, data, dodatni czas w minutach, opcjonalne uwagi.
- Relacja: jedna trasa ma wiele biegów. Usunięcie trasy z biegami jest blokowane z czytelną informacją.

## Funkcje do zrealizowania

- Pełny CRUD biegu oraz tworzenie, przeglądanie i edycja trasy.
- Lista i szczegóły; wyszukiwanie po nazwie trasy/tekście; filtr po trasie i polu domenowym; sortowanie daty lub nazwy w obu kierunkach.
- Walidacja pól wymaganych, typów i zakresów; dystans i czas muszą być większe od zera.
- Potwierdzenie usunięcia, komunikaty błędów i stan pustej listy.
- Tempo w min/km = czas w minutach / dystans w km.
- Dane zachowane lokalnie po zamknięciu aplikacji.

Powyższa lista opisuje cel. README i plan wskazują, które elementy są już zrobione; nie deklaruj funkcji jako gotowej bez implementacji i weryfikacji.
