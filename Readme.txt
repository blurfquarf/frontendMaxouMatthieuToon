FRONTEND:

npm install, npm start, runt op poort 3000

fases aanpassen => currentDate service variabele in app.js aanpassen, zie commentaar in currentDate service

ons loginsysteem is gebaseerd op een JWT systeem ontworpen door Bezkoder, vandaar dat er 3 commits in deze files staan onder een ander account


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

BACKEND:

databank postgres zelf aanmaken

backend te runnen via Application file


DATABANK WERKING:
bij default met beans (voor demodoeleinden bij het pullen van deze repository)

PERMANENTE DATABANK:
databank aanzetten met update als property in 'application.properties', laten draaien of uitzetten en dan mainconfig in comment zetten, property op none en dan heropstarten databank => hierna is alles permanent in de databank

certificaat nodig om frontend te runnen (HTTPS): locaties van certificaten moeten voldoen aan: SSL_CRT_FILE=~/localhost.pem SSL_KEY_FILE=~/localhost-key.pem


met een antivirus kan door de get-requests bij "assign promotors" een fout opgegooid worden, dit hebben wij echter enkel ondervonden op een MAC besturingssysteem


ps: (springboot jks keys zijn voor eventuele backend https in de toekomst)
