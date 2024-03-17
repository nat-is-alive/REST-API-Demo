import express, { Application } from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 8080;

const ones: string[] = [
  "",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
];
const tens: string[] = [
  "",
  "X",
  "XX",
  "XXX",
  "XL",
  "L",
  "LX",
  "LXX",
  "LXXX",
  "XC",
];
const hundreds: string[] = [
  "",
  "C",
  "CC",
  "CCC",
  "CD",
  "D",
  "DC",
  "DCC",
  "DCCC",
  "CM",
];
const thousands: string[] = ["", "M", "MM", "MMM", "MMMM"];

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.post("/numeral-conv", (req, res) => {
  const { num } = req.body;

  if (!num || Number.isNaN(num)) {
    res.status(404).send({ message: "No number passed" });
  } else {
    let numeral: string = "Cannot convert to numeral";

    switch (num.toString().length) {
      case 1:
        numeral = ones[parseInt(num.toString().charAt(0))];
        break;

      case 2:
        numeral = tens[parseInt(num.toString().charAt(0))];
        numeral += ones[parseInt(num.toString().charAt(1))];
        break;

      case 3:
        numeral = hundreds[parseInt(num.toString().charAt(0))];
        numeral += tens[parseInt(num.toString().charAt(1))];
        numeral += ones[parseInt(num.toString().charAt(2))];
        break;

      case 4:
        numeral = thousands[parseInt(num.toString().charAt(0))];
        numeral += hundreds[parseInt(num.toString().charAt(1))];
        numeral += tens[parseInt(num.toString().charAt(2))];
        numeral += ones[parseInt(num.toString().charAt(3))];
        break;
    }

    res.send({ numeral: numeral });
  }
});

app.get("/ping/:id", async (req, res) => {
  let responseMessage = "Oh no it's ";

  if (req.params.id.toLowerCase() == "friday") {
    responseMessage = "Thank God it's ";
  }

  res.send({
    message: responseMessage + req.params.id.toLowerCase() + "!",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
