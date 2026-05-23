# GainzLog

GainzLog är en applikation för tränings och kostloggning samlat i en och samma applikation.

## Funktioner i GainzLog
- Logga träningspass
- Skapa träningspass
- Logga måltider
- Se kalorier
- Ställa in mål, gå ner i vikt, bygga muskler
- Följa utveckling över tid


## Länk till den publicerade applikationen
https://gainzlog-s9rg8.ondigitalocean.app/

## Uppstart av projektet
- Klona ner repot
- Öppna terminalen och kör `npm install`
- Sedan i root mappen skriver du `./start-all.ps1`
- Detta startar både Backend och frontend
- Öppna Localhost som du får via frontend när backend har laddat klart
- Lycka till!

## Portar
Frontend:
(Standard, när jag startar upp får jag denna porten)
http://localhost:5173

Backend:
http://localhost:5048

Swagger:
http://localhost:5048/swagger


## Frontend, Backend
Dessa ligger i ett och samma repo. Ska det nämnas något här är det att Frontend ligger
i root och i den ligger sedan en undermapp för Backend.

## Backend
Backenden är byggd som ett REST API med ASP.NET Core 8.

## Frontend
Frontend är byggd med React och Typescript

## API
API:et består av följande endpoints:
POST /api/Meal                          
- Skapar ny måltid

GET /api/Meal/today                     
- Hämtar dagens måltider och totalsummor

POST /api/Meal/{mealId}/items           
- Lägger till ett livsmedel i en måltid

PATCH /api/Meal/{mealId}/items/{foodId} 
- uppdaterar mängden gram för en måltid


DELETE /api/Meal/{mealId}/items/{itemId}
- Tar bort ett livsmedel från en måltid

DELETE /api/Meal/{mealId}               
- Tar bort en måltid

GET /api/Food/search                    
- Söker efter ett livsmedel 

GET /api/Food/{id}/nutrients            
- Hämtar näringsvärden för ett livsmedel