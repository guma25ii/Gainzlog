# GainzLog 

**En fullstack-webbapp för tränings- och kostloggning – samlat på ett ställe.**

Den senaste utvecklingen finns i DevMainBranch och Main branchen är deployad.

GainzLog låter användaren bygga träningsprogram, logga pass set för set, registrera måltider med riktiga näringsvärden och räkna ut ett personligt kaloribehov utifrån sina mål. Projektet började som en skoluppgift och har sedan vidareutvecklats på egen hand.

 **Live-demo:** https://gainzlog-s9rg8.ondigitalocean.app/


## Tech stack

| Del | Teknik |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, React Router 7, Framer Motion |
| **Backend** | ASP.NET Core 8 Web API (C#) |
| **Databas** | SQLite via Entity Framework Core (code-first med migrationer) |
| **Externa API:er** | [Livsmedelsverkets API](https://dataportal.livsmedelsverket.se/) (näringsvärden), [ExerciseDB](https://oss.exercisedb.dev/) (övningar) |
| **Övrigt** | Swagger/OpenAPI, ESLint, Git (feature branches), DigitalOcean |

---

## Funktioner

**Träning**
- Skapa egna träningsprogram och lägga till övningar
- Söka övningar efter namn eller muskelgrupp (via ExerciseDB)
- Logga träningspass med set, vikt och repetitioner
- Markera pass som avklarade och granska dem i efterhand

**Kost**
- Söka livsmedel och hämta näringsvärden från Livsmedelsverket
- Bygga måltider, ändra mängd (gram) och ta bort livsmedel
- Se dagens totala intag av kalorier, protein, kolhydrater och fett

**Mål & progression**
- Räkna ut kaloribehov (BMR/TDEE enligt Mifflin-St Jeor) utifrån vikt, längd, ålder och aktivitetsnivå
- Välja mål: gå ner i vikt, behålla vikt eller bygga muskler
- Följa sitt dagliga intag mot målet med progressbars
- Ljust/mörkt tema som sparas mellan besök

---

## Arkitektur & tekniska val

### Backend – lagerindelad arkitektur
```
Controller  →  Service  →  Repository  →  EF Core (SQLite)
```
- **Controllers** tar emot HTTP-anrop och returnerar DTO:er – entiteterna exponeras aldrig direkt.
- **Services** innehåller affärslogiken.
- **Repositories** sköter dataåtkomsten.
- Alla lager kopplas ihop med **interfaces och Dependency Injection**, vilket gör koden lätt att testa och byta ut.
- Databasschemat versionshanteras med **EF Core-migrationer**.
- Anrop till externa API:er görs från backend via `HttpClient`, så att frontend bara behöver prata med ett API.

### Frontend
- **Context API** (`DailyTotalsContext`, `WorkoutContext`) för global state – t.ex. dagens näringsintag som används på flera sidor utan prop drilling.
- **Separat API-lager** (`src/api/`) så att all kommunikation med backend ligger på ett ställe och komponenterna bara ansvarar för rendering.
- **Återanvändbara komponenter**, t.ex. `DailyCard` som visar näringsintag mot mål och bara är beroende av props.
- **Error Boundaries** med fallback-meddelanden och reload-knapp, så att ett fel i en del av appen inte kraschar hela gränssnittet.
- **Typad domänlogik** – kaloriberäkningen ligger i rena, typade funktioner i `src/lib/calories.ts`.
- Mobile first-layout för att appen ska kännas som en mobilapp.

---

## Projektstruktur

```
├── src/                     # Frontend (React + TypeScript)
│   ├── api/                 # Anrop mot backend
│   ├── Components/          # Återanvändbara komponenter
│   ├── Pages/               # Sidor uppdelade per område (Meal, Workout, Progress …)
│   ├── context/             # Global state (Context API)
│   ├── lib/                 # Ren logik, t.ex. kaloriberäkning
│   └── types/               # Delade TypeScript-typer
└── Backend/GainzlogBackend/ # Backend (ASP.NET Core 8)
    ├── Controllers/
    ├── Services/
    ├── Repositories/
    ├── Interfaces/
    ├── Dto/
    ├── Models/
    ├── Data/                # AppDbContext
    └── Migrations/
```

---

## Kom igång lokalt

### Förutsättningar
- [Node.js](https://nodejs.org/) 20+
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- EF Core CLI: `dotnet tool install --global dotnet-ef`

### Installation
```bash
git clone https://github.com/guma25ii/GainzlogTypescript.git
cd GainzlogTypescript
npm install

# Skapa SQLite-databasen
cd Backend/GainzlogBackend
dotnet ef database update
cd ../..
```

### Starta
På Windows startar detta både backend och frontend:
```powershell
./start-all.ps1
```
Eller starta dem var för sig:
```bash
# Backend
cd Backend/GainzlogBackend
dotnet run --urls http://localhost:5048

# Frontend (i en ny terminal, från projektets rot)
npm run dev
```

| Tjänst | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5048 |
| Swagger | http://localhost:5048/swagger |

---

## API-översikt

Fullständig dokumentation finns i Swagger när backend körs.

| Resurs | Endpoints |
|---|---|
| **Meal** | `POST /api/Meal` · `GET /api/Meal/today` · `GET /api/Meal/Daily-totals` · `DELETE /api/Meal/{mealId}` |
| **Meal items** | `POST /api/Meal/{mealId}/items` · `PATCH /api/Meal/{mealId}/items/{itemId}` · `DELETE /api/Meal/{mealId}/items/{itemId}` |
| **Food** | `GET /api/Food/search` · `GET /api/Food/{id}/nutrients` |
| **Program** | `POST /api/Program` · `GET /api/Program` · `GET /api/Program/{programId}` · `DELETE /api/Program/{programId}` |
| **Session** | `POST /api/Session` · `GET /api/Session` · `GET /api/Session/{sessionId}` · `PATCH /api/Session/{sessionId}` · `DELETE /api/Session/{sessionId}` |
| **Set** | `POST /api/Set` · `PUT /api/Set/{id}` · `DELETE /api/Set/{setId}` |
| **LoggedExercise** | `POST /api/LoggedExercise` · `GET /api/LoggedExercise/{id}` · `DELETE /api/LoggedExercise/{id}` |
| **Exercise** | `GET /api/Exercise/getAllMuscles` · `GET /api/Exercise/getExerciseByBodypart` · `GET /api/Exercise/searchExercise` · `GET /api/Exercise/{exerciseId}/exerciseinfo` |

---

## Vidareutveckling

- [ ] Inloggning och registrering (sidorna finns förberedda i frontend)
- [ ] Uppladdning av egna progressbilder (visas i dag med exempeldata)
- [ ] Grafer över vikt och styrka över tid
- [ ] Enhetstester för services och kaloriberäkning
- [ ] Miljövariabel för API-adressen i stället för hårdkodad `localhost`

---

