const { app } = require('@azure/functions');

app.http('passwordGenerator', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        let length = 12;
        let includeNumbers = 'false';
        let includeUpperCase = 'false';
        let includeSpecialChar = 'false';
        let excludeChars = 'false';
        let toExclude = '';
        let viewAll = 'false';

        if (request.method === 'GET') {
            length = parseInt(request.query.get('length')) || length;
            includeNumbers = request.query.get('includeNumbers') === 'true' || includeNumbers;
            includeUpperCase = request.query.get('includeUpperCase') === 'true' || includeUpperCase;
            includeSpecialChar = request.query.get('includeSpecialChar') === 'true' || includeSpecialChar;
            excludeChars = request.query.get('excludeChars') === 'true' || excludeChars;
            toExclude = request.query.get('toExclude') || '';
            viewAll = request.query.get('viewAll') === 'true' || viewAll;
        } else if (request.method === 'POST') {
            const body = await request.json();
            length = body.length || length;
            includeNumbers = body.includeNumbers || includeNumbers;
            includeUpperCase = body.includeUpperCase || includeUpperCase;
            includeSpecialChar = body.includeSpecialChar || includeSpecialChar;
            excludeChars = body.excludeChars || excludeChars;
            toExclude = body.toExclude || toExclude;
            viewAll = body.viewAll | viewAll;
        }
// Keine Werte zur verfügung: 
// curl -X POST "http://localhost:7071/api/passwordGenerator" -H "Content-Type: application/json" -d "{\"length\": 15, \"includeNumbers\": false, \"includeUpperCase\": false, \"includeSpecialChar\": false, \"excludeChars\": true, \"toExclude\": \"abcdefghijklmnopqrstuvwxyz\", \"viewAll\": false}"
// Generelles Erstellen:
//      curl -X POST "http://localhost:7071/api/passwordGenerator" -H "Content-Type: application/json" -d "{\"length\": 19, \"includeNumbers\": true, \"includeUpperCase\": true, \"includeSpecialChar\": true, \"excludeChars\": true, \"toExclude\": \"xyz\", \"viewAll\": true}"

// Für URL:
//      http://localhost:7071/api/passwordGenerator?length=11&includeNumbers=true&includeUpperCase=true&includeSpecialChar=true&excludeChars=true&toExclude=xyz&viewAll=true
//Keine Werte URL:
//  http://localhost:7071/api/passwordGenerator?length=25&includeNumbers=false&includeUpperCase=false&includeSpecialChar=false&excludeChars=true&toExclude=abcdefghijklmnopqrstuvwxyz&viewAll=true


        if (length < 8 || length > 64) {
            return {
                status: 400,
                body: "Passworts muss zwischen 8 und 64 Zeichen liegen, zu Ihrer eigenen Sicherheit."
            };
        }

        const password = generatePassword(length, includeNumbers, includeUpperCase, includeSpecialChar, excludeChars, toExclude);

        if(viewAll == true){
            return {
                body: JSON.stringify({ 
                    password: password,
                    length: length,
                    options: {
                        includeNumbers: includeNumbers,
                        includeUpperCase: includeUpperCase,
                        includeSpecialChar: includeSpecialChar,
                        exludeChars: excludeChars,
                        toExclude: toExclude
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }else{
            return {
                body: JSON.stringify({ 
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
       
    }
});

function generatePassword(length, includeNumbers, includeUpperCase, includeSpecialChar, excludeChars, toExclude) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialchars = '!"§$%&/()=?`*+´}][{^°<>|,;.:-_#';
    let characterPool = letters; 

    if (includeNumbers == true) {
        characterPool += numbers;
    }
    if(includeUpperCase == true){
        characterPool += letters.toUpperCase(); 
    }
    if(includeSpecialChar == true){
        characterPool += specialchars; 
    }
    if(excludeChars == true){
        characterPool = characterPool.split('').filter(c => !toExclude.includes(c)).join('')
    }

    let password = '';
    if (characterPool.length === 0) {
        password = 'Wow, alle Werte entfernt die ich nutzen könnte. Sehr lustig. Hier, dein Passwort: ';
        return password;
    }
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    return password;
}
