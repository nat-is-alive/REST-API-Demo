"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = process.env.PORT || 8080;
const ones = [
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
const tens = [
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
const hundreds = [
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
const thousands = ["", "M", "MM", "MMM", "MMMM"];
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
app.post("/numeral-conv", (req, res) => {
    const { num } = req.body;
    if (!num || Number.isNaN(num)) {
        res.status(404).send({ message: "No number passed" });
    }
    else {
        let numeral = "Cannot convert to numeral";
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
app.get("/ping/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let responseMessage = "Oh no it's ";
    if (req.params.id.toLowerCase() == "friday") {
        responseMessage = "Thank God it's ";
    }
    res.send({
        message: responseMessage + req.params.id.toLowerCase() + "!",
    });
}));
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
