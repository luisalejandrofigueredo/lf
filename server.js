"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path = __importStar(require("path"));
const HandlebarsI18n = __importStar(require("handlebars-i18n"));
const i18next = require("i18next");
HandlebarsI18n.init();
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'js', 'scss', 'css'],
    index: false,
    redirect: true,
};
let resources = {
    resources: {
        "en": {
            translation: {
                "webDeveloper": "Fullstack developer",
                "intContact": "International contact",
                "celular": "Cell phone",
                "demo": "Demonstration ng-gd library",
                "clickImage": "Click on the image for demonstration",
                "introduction": "The NG-GD library was created by me to have an easy way to handle the canvas in Angular. It is capable of creating objects on it and moving them with the mouse."
            }
        },
        "sp": {
            translation: {
                "webDeveloper": "Desarrollador fullstack",
                "intContact": "Contacto internacional",
                "celular": "Celular",
                "demo": "Demostración librería ng-gd",
                "clickImage": "Haz click en la imagen para la demostración",
                "introduction": "La librería NG-GD fue creada por mi para tener una manera fácil de manejar el canvas en Angular es capaz de crear objetos en el y moverlos con el ratón"
            }
        }
    },
    lng: "sp"
};
i18next.init(resources);
const app = (0, express_1.default)();
// Configure Handlebars as the view engine
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));
// Define a route that renders a Handlebars template
app.get('/', (req, res) => {
    const lem = req.headers["accept-language"];
    console.log('Lenguaje', lem);
    i18next.changeLanguage('sp');
    res.render('home', { name: 'Luis Alejandro Figueredo' });
});
app.get('/en', (req, res) => {
    i18next.changeLanguage('en');
    res.render('home', { name: 'Luis Alejandro Figueredo' });
});
app.get('/en', (req, res) => {
    i18next.changeLanguage('en');
    res.render('home', { name: 'Luis Alejandro Figueredo' });
});
app.get('/demo', (req, res) => {
    res.render('demoGD');
});
app.get('/demoGD', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/demo-gd', 'index.html'));
});
// Serve static files from the "public" folder
app.use(express_1.default.static(path.join(__dirname, "public")));
app.use(express_1.default.static(path.join(__dirname, "public/demo-gd")));
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
