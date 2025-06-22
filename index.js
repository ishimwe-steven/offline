const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    const inputs = text ? text.split('*') : [];
    const level = inputs.length;

    if (level === 0) {
        // Level 1: Language selection
        response = `CON Welcome to favourite food app, please choose language,\n` +
                   `1. English\n` +
                   `2. Kinyarwanda`;
    } else if (level === 1) {
        // Level 2: Dish selection based on language
        if (inputs[0] === '1') {
            response = `CON Select the dish you like most\n` +
                       `1. Chips and Chicken\n` +
                       `2. Beef and green Plantain\n` +
                       `3. Rice and beans\n` +
                       `4. Cassava Bread and greens\n` +
                       `5. Back`;
        } else if (inputs[0] === '2') {
            response = `CON Hitamo ibiryo ukunda\n` +
                       `1. Ifiriti n’Inkoko\n` +
                       `2. Agatogo\n` +
                       `3. Umuceri n’ibishyimbo\n` +
                       `4. Ubugari n’Isombe\n` +
                       `5. Gusubira inyuma`;
        } else {
            response = `END Invalid choice`;
        }
    } else if (level === 2) {
        const lang = inputs[0];
        const choice = inputs[1];

        if (choice === '5') {
            // Go back to language selection
            response = `CON Welcome to favourite food app, please choose language,\n` +
                       `1. English\n` +
                       `2. Kinyarwanda`;
        } else if (lang === '1') {
            switch (choice) {
                case '1':
                    response = `END Your favourite food is Chips and Chicken, that is so unhealthy, do not eat it regularly.`;
                    break;
                case '2':
                    response = `END Your favourite food is Beef and green Plantain, that is healthy if you eat less than 5 times a week.`;
                    break;
                case '3':
                    response = `END Your favourite food is Rice and beans. That is healthy, as long as you drink a lot of water and eat vegetables.`;
                    break;
                case '4':
                    response = `END Your favourite food is Cassava Bread and greens. That is healthy. Verify there's not too much oil in the greens.`;
                    break;
                default:
                    response = `END Invalid choice`;
            }
        } else if (lang === '2') {
            switch (choice) {
                case '1':
                    response = `END Ibiryo ukunda ni ifiriti n’inkoko. Si byiza ku buzima ntukabirye buri gihe.`;
                    break;
                case '2':
                    response = `END Ibiryo ukunda ni agatogo. Ni byiza iyo ubiriye utarengeje icuro 5 mu cyumweru.`;
                    break;
                case '3':
                    response = `END Ibiryo ukunda ni umuceri n’ibishyimbo. Ni byiza mu gihe wanyweye amazi menshi.`;
                    break;
                case '4':
                    response = `END Ibiryo ukunda ni ubugari n’isombe. Ni byiza ku buzima, ugenzure niba isombe ritarimo amavuta menshi.`;
                    break;
                default:
                    response = `END Invalid choice`;
            }
        } else {
            response = `END Invalid language choice`;
        }
    } else {
        response = `END Invalid input`;
    }

    res.set('Content-Type: text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`USSD app running on port ${PORT}`);
});
