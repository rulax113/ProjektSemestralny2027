# Architektura (plan)

Na etapie pierwszego laboratorium aplikacja ma jeden ekran startowy. Docelowo małe komponenty ekranów będą korzystać z warstwy logiki domenowej i modułu trwałego zapisu.

```text
Ekrany (lista / szczegóły / formularze)
                  ↓
Walidacja i reguły domenowe (Route, Run, tempo)
                  ↓
Repozytorium lokalne (trwały zapis; do wyboru przy etapie CRUD)
```

`Run.parentId` wskazuje UUID trasy. Warstwa domenowa sprawdza, czy trasa istnieje i blokuje jej usunięcie, gdy ma zależne biegi. Dane są lokalne. Konkretną bibliotekę trwałego zapisu i zarządzania stanem wybierzemy, gdy rozpocznie się implementacja CRUD, aby nie dodawać zależności bez potrzeby.
