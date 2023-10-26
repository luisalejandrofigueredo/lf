import express, { Request, Response, NextFunction } from 'express';
var session = require('express-session');
import { SessionData } from 'express-session'
import { create } from 'express-handlebars';
import * as path from "path";
import * as HandlebarsI18n from "handlebars-i18n";
interface MySession extends SessionData {
    color?: string,
    language?: string
}
const i18next = require("i18next");
HandlebarsI18n.init();
let resources = {
    resources: {
        "en": {
            translation: {
                "webDeveloper": "Fullstack developer",
                "intContact": "International contact",
                "celular": "Cell phone",
                "demo": "Demonstration ng-gd library",
                "clickImage": "Click on the image for demonstration",
                "introduction": "The NG-GD library was created by me to have an easy way to handle the canvas in Angular. It is capable of creating objects on it and moving them with the mouse.",
                "conocimientos": "Skills",
                "titulos":"Degrees"
            }
        },
        "sp": {
            translation: {
                "webDeveloper": "Desarrollador fullstack",
                "intContact": "Contacto internacional",
                "celular": "Celular",
                "demo": "Demostración librería ng-gd",
                "clickImage": "Haz click en la imagen para la demostración",
                "introduction": "La librería NG-GD fue creada por mi para tener una manera fácil de manejar el canvas en Angular es capaz de crear objetos en el y moverlos con el ratón",
                "conocimientos": "Conocimientos",
                "titulos":"Títulos"
            }
        }
    },
    lng: "sp"
}

i18next.init(resources);
const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

const hbs = create({
    helpers: {
        eqString(a: string, b: string): boolean { return a === b }
    }
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));


app.use((req: Request, res: Response, next: NextFunction) => {
    const mySession = req.session as unknown as MySession;
    if (mySession.color !== undefined) {
        // La página principal ha sido cargada previamente
    } else {
        // La página principal no ha sido cargada previamente, establecer la propiedad en la sesión
        mySession.loaded = true;
        mySession.color = "black"
        mySession.language = "sp"
    }
    next();
});

// Define a route that renders a Handlebars template
app.get('/', (req: Request, res: Response) => {
    const lem = req.headers["accept-language"];
    i18next.changeLanguage('sp');
    const mySession = req.session as unknown as MySession
    if (mySession.language === "sp") {
        i18next.changeLanguage('sp')
        res.render('home', { name: 'Luis Alejandro Figueredo' });
    } else {
        i18next.changeLanguage('en');
        res.render('home', { name: 'Luis Alejandro Figueredo' });
    }
});

app.get('/sp', (req: Request, res: Response) => {
    i18next.changeLanguage('sp');
    const mySession = req.session as unknown as MySession
    mySession.language = 'sp'
    res.render('home', { name: 'Luis Alejandro Figueredo' });
});

app.get('/en', (req: Request, res: Response) => {
    i18next.changeLanguage('en');
    const mySession = req.session as unknown as MySession
    mySession.language = 'en'
    res.render('home', { name: 'Luis Alejandro Figueredo' });
});

app.get('/demo', (req, res) => {
    res.render('demoGD');
});

app.get('/conocimientos', (req, res) => {
    const modeColor = req.query.modeColor;
    res.render('conocimientos', { modeColor });
});

app.get('/titulos', (req, res) => {
    const modeColor = req.query.modeColor;
    res.render('titulos', { modeColor });
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

