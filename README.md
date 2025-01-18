# CloudComputing-PasswordGenerator
Generelles Erstellen mit Body:
curl -X POST "http://localhost:7071/api/passwordGenerator" -H "Content-Type: application/json" -d "{\"length\": 19, \"includeNumbers\": true, \"includeUpperCase\": true, \"includeSpecialChar\": true, \"excludeChars\": true, \"toExclude\": \"xyz\", \"viewAll\": true}"



Generelles Erstellen mit URL:
Für URL:
http://localhost:7071/api/passwordGenerator?length=11&includeNumbers=true&includeUpperCase=true&includeSpecialChar=true&excludeChars=true&toExclude=xyz&viewAll=true



Mögliche Eingaben wären also length, includeNumbers, includeUpperCase, includeSpecialChar, exludeChars, toExclude und viewAll.
- Length gibt die Länge an die das Passwort haben soll.
- IncludeNumbers gibt an, ob Zahlen fürs Passwort verwendet werden sollen.
- IncludeUpperCase gibt an, ob Großbuchstaben verwendet werden sollen.
- IncludeSpecialChar gibt an, ob Sonderzeichen verwendet werden sollen.
- exludeChars gibt an, ob bestimmte Zeichen ausm Pool entfernt werden sollen
- toExclude gibt an, welche Zeichen entfernt werden.
- viewAll gibt an, ob nur das Passwort in der Ausgabe zu sehen ist, oder alle Eingabewerte.
