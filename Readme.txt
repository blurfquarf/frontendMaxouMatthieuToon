FRONTEND:

fase aanpassen => currentDate variabele in dateService klasse aanpassen, zie commentaar in deze klasse
const currentDate = ...
de fasedata zijn in ons verslag te vinden
januari is echter de nulde maand in Javascript dus voor maandnummer dient altijd -1 gedaan te worden


npm install, npm start, runt op poort 3000

ons loginsysteem is gebaseerd op een JWT systeem ontworpen door Bezkoder, vandaar dat er 3 commits in deze files staan onder een ander account


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

BACKEND:

databank postgres zelf aanmaken

backend te runnen via Application file


DATABANK WERKING:
bij default met beans (voor demodoeleinden bij het pullen van deze repository)

PERMANENTE DATABANK:
databank aanzetten met 'update' als property in 'application.properties' (spring.jpa.hibernate.ddl-auto=update), dan laten draaien of uitzetten en dan mainconfig file in comment zetten, property in 'application.properties' op 'none' (spring.jpa.hibernate.ddl-auto=none) en dan heropstarten databank => nu is alles permanent in de databank

certificaat nodig om frontend te runnen (HTTPS): locaties van certificaten moeten voldoen aan: SSL_CRT_FILE=~/localhost.pem SSL_KEY_FILE=~/localhost-key.pem


met een antivirus kan door de get-requests bij "assign promotors" een fout opgegooid worden, dit hebben wij echter enkel ondervonden op een MAC besturingssysteem


ps: (springboot jks keys zijn voor eventuele backend https in de toekomst)
