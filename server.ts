import express from 'express';
import { engine } from 'express-handlebars';
import * as path from "path";
import * as HandlebarsI18n from "handlebars-i18n";
const i18next = require("i18next");
HandlebarsI18n.init();
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'js', 'scss', 'css'],
    index: false,
    redirect: true,
  }
let resources={
    resources: {
        "en": {
            translation: {
                "webDeveloper": "Fullstack developer",
                "intContact": "International contact",
                "celular":"Cell phone",
                "demo":"Demonstration ng-gd library",
                "clickImage":"Click on the image for demonstration",
                "introduction":"The NG-GD library was created by me to have an easy way to handle the canvas in Angular. It is capable of creating objects on it and moving them with the mouse."


            }
        },
        "sp": {
            translation: {
                "webDeveloper": "Desarrollador fullstack",
                "intContact": "Contacto internacional",
                "celular":"Celular",
                "demo":"Demostración librería ng-gd",
                "clickImage":"Haz click en la imagen para la demostración",
                "introduction":"La librería NG-GD fue creada por mi para tener una manera fácil de manejar el canvas en Angular es capaz de crear objetos en el y moverlos con el ratón"
            }
        }
    },
    lng: "sp"
}

i18next.init(resources);
const app = express();

// Configure Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));
// Define a route that renders a Handlebars template
app.get('/', (req, res) => {
    const lem=req.headers["accept-language"];
    console.log('Lenguaje',lem);
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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/demo-gd")));
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

