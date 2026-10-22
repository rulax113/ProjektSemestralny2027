# Specyfikacje biznesowa 12
**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Poziom:** studia I stopnia, semestr 7  
**Data:** 2026-10-18

## Zasady wspólne i interpretacja
- Każda aplikacja realizuje pełny CRUD **głównej encji podrzędnej** (druga encja w karcie) oraz co najmniej tworzenie, odczyt i edycję encji nadrzędnej; usuwanie nadrzędnej encji musi mieć zdefiniowaną politykę dla istniejących rekordów zależnych (np. blokada usunięcia).
- Wymagane są: lista, szczegóły, formularz, wyszukiwanie po nazwie/tytule, filtr po atrybucie domenowym, sortowanie po dacie/nazwie oraz trwały zapis lokalny.
- Wszystkie identyfikatory są lokalnymi UUID; pola oznaczone `?` są opcjonalne. Wymagane są też pola techniczne `id` i klucz obcy encji podrzędnej. Kwoty przechowuje się jako wartości dziesiętne, a nie binarne float; daty i strefy czasowe obsługuje się spójnie.
- Minimum trzy walidacje domenowe: wymagane nazwy, ograniczenia typów/zakresów oraz reguła specyficzna z karty. Co najmniej jedna reguła biznesowa musi mieć automatyczny test pozytywny i negatywny.
- Zakres: jedna osoba, dane lokalne, bez backendu, logowania, płatności i integracji zewnętrznych. Dane demonstracyjne są fikcyjne. Dodatkowe rozszerzenia są przekazywane dopiero w późniejszym laboratorium i nie wchodzą do podstawowego zakresu.
- Kryteria akceptacji są przykładowymi scenariuszami obowiązkowymi; nie zastępują testów całego CRUD ani testów sytuacji pustych/błędnych.

## MOB-012 – RunningDiary
**Kontekst i problem:** Analiza historii biegów. Brak uporządkowanej ewidencji utrudnia przegląd informacji i podejmowanie decyzji.  
**Użytkownik docelowy:** biegacz amator.  
**Cel biznesowy:** Umożliwić prowadzenie ewidencji „bieg” w kontekście „trasa”, kontrolę poprawności danych oraz uzyskanie użytecznego podsumowania.

### Model danych
- **Trasa** (`id:uuid`; nazwa:text; dystansKm:decimal).
- **Bieg** (`id:uuid`; `parentId:uuid`; data:date; czasMin:decimal; uwagi:text?).
- **Relacja:** `Trasa (1) → (N) Bieg`. Rekord podrzędny musi wskazywać istniejący rekord nadrzędny. Usunięcie nadrzędnego rekordu z powiązaniami jest blokowane z czytelnym komunikatem.

### Wymagania biznesowe
- **MOB-012-FR-01:** Dodawanie, wyświetlanie, edycja i usuwanie rekordów „bieg”.
- **MOB-012-FR-02:** Tworzenie, przeglądanie i edycja rekordów „trasa”.
- **MOB-012-FR-03:** Przypisywanie każdego rekordu „bieg” do wybranego rekordu nadrzędnego.
- **MOB-012-FR-04:** Wyświetlanie listy rekordów wraz z widokiem szczegółów.
- **MOB-012-FR-05:** Wyszukiwanie po nazwie/tytule (dla encji bez takiego pola: po podstawowym polu tekstowym).
- **MOB-012-FR-06:** Filtrowanie po encji nadrzędnej oraz co najmniej jednym polu domenowym, jeżeli występuje; w przeciwnym razie po dacie.
- **MOB-012-FR-07:** Sortowanie według daty lub nazwy; określenie kierunku sortowania.
- **MOB-012-FR-08:** Walidacja pól obowiązkowych, zakresów liczbowych i reguł biznesowych.
- **MOB-012-FR-09:** Prezentowanie komunikatów błędów, pustej listy oraz potwierdzenia usunięcia.
- **MOB-012-FR-10:** Wyliczanie i prezentacja: Tempo = czas w minutach / dystans w km.
- **MOB-012-FR-11:** Zachowanie danych po ponownym uruchomieniu aplikacji.

### Reguły biznesowe
- **MOB-012-BR-01:** Dystans i czas muszą być dodatnie.
- **MOB-012-BR-02:** Tempo = czas w minutach / dystans w km.
- **MOB-012-BR-03:** Puste nazwy/tytuły są niedozwolone; wartości liczbowe i daty muszą odpowiadać deklarowanym typom i zakresom.
- **MOB-012-BR-04:** Nie można zapisać rekordu podrzędnego bez istniejącego powiązania; usunięcie rekordu nadrzędnego z zależnościami jest blokowane.

### Kryteria akceptacji (Given–When–Then)
1. **CRUD:** **Mając** utworzony rekord „trasa”, **gdy** użytkownik doda poprawny rekord „bieg”, **wtedy** jest on widoczny na liście i w szczegółach; po edycji prezentuje nowe wartości, a po potwierdzonym usunięciu znika z listy.
2. **Walidacja:** **Mając** formularz „bieg”, **gdy** użytkownik poda wartości sprzeczne z regułą `MOB-012-BR-01`, **wtedy** zapis zostaje zablokowany, a aplikacja pokazuje przyczynę.
3. **Logika domenowa:** **Mając** co najmniej dwa poprawne rekordy testowe, **gdy** użytkownik otworzy podsumowanie, **wtedy** aplikacja wyświetla wynik zgodny z zasadą: Tempo = czas w minutach / dystans w km.
4. **Relacje:** **Mając** rekord „trasa” z powiązanym rekordem „bieg”, **gdy** użytkownik spróbuje usunąć rekord nadrzędny, **wtedy** operacja zostaje zablokowana z informacją o istniejących zależnościach.
5. **Trwałość:** **Mając** zapisane dane, **gdy** użytkownik zamknie i uruchomi aplikację ponownie, **wtedy** rekordy oraz ich relacje pozostają dostępne.
