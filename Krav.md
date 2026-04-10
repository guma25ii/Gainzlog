

## Theme.tsx
- **useState:** 
Det används i Theme.tsx för att hålla kolla på om appen är i ljust eller mörkt läge

- **useEffect:** 
Detta används i Theme.tsx och används för att spara värdet i localstorage.
Det uppdateras så att hela appen får rätt tema och notifierar föräldrarkomponenten via callback
Detta är då life-cycle hooken som påverkar en annan komponent

- **LocalStorage:**
När man öppnar appen läser komponenten darkmode från localstorage och vid ändring sparas det tillbaka.

## BackBtn.tsx
- **Event-hantering:** 
Knappen använder onClick för att gå tillbaka en sida med useNavigate()

## NavigateBtn.tsx
- **Event-hantering:** 
Knappen använder onClick för att navigara till en specifik sida med react router

## SettingsPage.tsx
- **useState:** 
Används för att hantera toggleRequested som skickas till Theme komponenten
- **Event-hantering:**
Knappen för Dark/Light mode triggar en ändring av state.


## StartPage.tsx
- **Event-hantering:**
Knappar använder NavigateBtn för att navigera mellan sidor.






## Pages Mappen
Här i har jag lagt undermappar för respektive komponenter(sidor), till exempel i WourkoutPages finns sidorna som
är för just den kategorin etc. Allt för att kunna få det strukturerat på ett bra sätt.
Började göra iordning denna delen först då jag skulle få det enklare i mitt huvud för själva planeringen.
Har även lagt in en kort text för att det ska vara enkelt att förstå vad varje sida ska göra. Har även förberett dessa sidor med knappar, en del beskrivande placeholder knappar samt även "riktiga" knappar som navigerar framåt eller bakåt.

## Css
Här försöker jag få en app som känns som en mobilapplikation då jag valt att ha mina sidor som en mindre ruta.
Mycket hjälpt av min PageLayout komponent med tillhörande css.

## App.css
- **Rörelse**
Här använder jag hovereffekt för att få fram rörelse till knapparna.
