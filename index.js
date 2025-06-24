const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  const { text, phoneNumber } = req.body;
  let response = "";

  const inputs = text.split("*");
  const level = inputs.length;

  if (text === "") {
    response = `CON Welcome to favourite food app, please choose language
1. English
2. Kinyarwanda`;
  } else if (level === 1) {
    if (inputs[0] === "1") {
      response = `CON Select the dish you like most
1. Chips and Chicken
2. Beef and green Plantain
3. Rice and beans
4. Cassava Bread and greens
5. Back`;
    } else if (inputs[0] === "2") {
      response = `CON Hitamo ibiryo Ukunda
1. Ifiriti n’Inkoko
2. Agatogo
3. Umuceri n’ibishyimbo
4. Ubugari n’isombe
5. Gusubira inyuma`;
    } else {
      response = "END Invalid language selection";
    }
  } else if (level === 2) {
    const lang = inputs[0];
    const food = inputs[1];

    if (lang === "1") {
      switch (food) {
        case "1":
          response = "END Your favourite food is Chips and Chicken, that is so unhealthy, do not eat it regularly.";
          break;
        case "2":
          response = "END Your favourite food is Beef and green Plantain, that is healthy, as long as you eat it less than 5 times a week.";
          break;
        case "3":
          response = "END Your favourite food is Rice and beans. That is healthy, as long as you drink a lot of water and eat some green vegetables.";
          break;
        case "4":
          response = "END Your favourite food is Cassava Bread and greens, that is healthy. Verify that there is not too much oil in the greens.";
          break;
        default:
          response = "END Invalid selection.";
      }
    } else if (lang === "2") {
      switch (food) {
        case "1":
          response = "END Ibiryo ukunda ni ifiriti n’inkoko, Si byiza ku buzima ntukabirye buri kenshi.";
          break;
        case "2":
          response = "END Ibiryo ukunda ni agatogo ni byiza ku buzima iyo ubiriye utarengeje icuro 5 mu cyumweru.";
          break;
        case "3":
          response = "END Ibiryo ukunda ni umuceri n’ibishyimbo. Ni byiza ku buzima mu gihe wanyweye amazi menshi ukarya n’imboga.";
          break;
        case "4":
          response = "END Ibiryo ukunda ni ubugari n’isombe ni byiza ku ubuzima, ugenzure neza niba isombe ritarimo amavuta menshi.";
          break;
        default:
          response = "END Guhitamo si byo.";
      }
    } else {
      response = "END Unknown language";
    }
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("USSD app running on port " + PORT));

