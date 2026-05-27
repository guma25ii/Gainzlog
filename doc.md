## Data och statehantering
Jag har använt mig av Context API här för att användarens dagliga kalorier, proteiner m.m används i flera komponenter.
Den används genom DailyTotalsContext där staten dailyTotals lagras och delas globalt i applikationen. Den uppdateras via
refreshDailyTotals som hämtar data från REST API:t och uppdaterar context state.
Detta i sin tur gör att komponenter som StartPage, MealPage och Mealbuilder kan läsa och uppdatera samma data utan 
att behöva skicka props mellan flera nivåer i komponentträdet.
Contexten är lagd högt upp i komponentträdet, närmare bestämt i main.tsx. Detta gör att hela applikationen får tillgång
till den globala staten.
När refreshDailyTotals() körs uppdateras context state och det gör att alla komponenter som använder useDailyTotals() uppdateras automatiskt.





## Min återanvändbara komponent
Jag har försökt att fokusera på att göra DailyCard till en återanvändningsbar komponent.
Syftet med komponenten är att visualisera användarens  dagliga näringsintag som visas genom en progressbar 
för kalorier, proteiner, kolhydrater samt fett. 

DailyCard är återanvändningsbar genom att den tar emot data via props och inte är beroende av någon API logik eller specifik sida.
Den använder ett totals objekt som input och kan då användas i andra applikationer som ska visa liknande data.
Komponenten har också logik i sig som beräknar progressionen mot användarens mål. Målet sparas i localstorage vilket 
gör komponenten flexibel eftersom det då enkelt kan användas i andra projekt utan att vara beroende av backend eller Context API.



## Kodstruktur och felhantering

Här har jag gjort en separat komponent för att hantera dem olika Api anropen i meals.ts 
för att få all kommunikation med backend på ett ställe. 
UI-komponenterna ansvarar enbart för rendering och användarinteraktion, 
medan state och datahantering är separerade i Context API och API-lager.
Något jag ändrat på från förra inlämningen är att jag har lagt till ett Context API för global state hantering
av dagliga totals. Detta i sin tur har lett till att jag inte använder mig av repetitiva anrop i flera komponenter.


Felhanteringen sker bland annat via try/catch metoder vid API anrop när man till exempel ska ta bort eller ändra måltider.
Jag har också använt mig av Error Boundary som fångar fel och hindrar att hela appen krachar, jag har gjort ett test för detta i progressSwipe
så man kan se hur det ser ut när väl ett fel uppstår, enkelt men ändå förklarande.



## Min Error Boundary
Här finns en fallback funktion då jag kan skicka in ett meddelande beroende på var någonstans 
renderingen inte fungerar, t ex i Main.tsx skriver det ut ett default meddelande och i MealPage 
skrivs ett eget meddelandet ut som lyder: Could Not load Daily Stats.
Här får användaren ett enkelt svar som talar om vad det är som skett och
detta används för att användaren ska kunna fortsätta använda appen även om någon del inte fungerar för tillfället.
Jag har även valt att lägga till en Reload knapp för att rendera om sidan så användaren ska kunna testa att ladda om
och eventuellt få bort det tillfälliga felet.


Jag har valt att lägga Error Boundary runt Main samt för renderingen av bilderna i progressSwipe, för visningen av de dagliga statsen i MealPage
samt i TrainworkoutPage där det blir en fallback utifall en övning inte kan laddas.
Vill man enkelt kunna testa finns det ett kodstycke i progressSwipe.tsx som ligger som kommentar just nu, 
avkommentera den och ett felmeddelande samt en Reload knapp kommer upp.