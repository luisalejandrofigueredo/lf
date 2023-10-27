import express, { Request, Response, NextFunction } from 'express';
var session = require('express-session');
import { SessionData } from 'express-session'
import { create } from 'express-handlebars';
import * as path from "path";
import * as HandlebarsI18n from "handlebars-i18n";
import cookieParser from 'cookie-parser';

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
                "titulos": "Degrees",
                "analista":"Systems analyst"
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
                "titulos": "Títulos",
                "analista":"Analista de sistemas"
            }
        }
    },
    lng: "sp"
}

i18next.init(resources);
const app = express();
const secretKey = 'tu-clave-secreta';
app.use(cookieParser(secretKey));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

const hbs = create({
    helpers: {
        eqString(a: string, b: string): boolean { return a === b }
    }
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));


// Define a route that renders a Handlebars template
app.get('/', (req: Request, res: Response) => {
    i18next.changeLanguage('sp');
    let mySession = req.session as unknown as MySession;
    if (mySession.color===undefined) {
        mySession.loaded = true;
        mySession.color = "dark"
        mySession.language = "sp"
    }
    if (mySession.language === "sp") {
        i18next.changeLanguage('sp')
        res.render('home', { name: 'Luis Alejandro Figueredo', modeColor:mySession.color });
    } else {
        i18next.changeLanguage('en');
        res.render('home', { name: 'Luis Alejandro Figueredo',modeColor:mySession.color });
    }
});

app.get('/sp', (req: Request, res: Response) => {
    i18next.changeLanguage('sp');
    const mySession = req.session as unknown as MySession
    const modeColor = (req.session as unknown as MySession).color;
    mySession.language = 'sp'
    res.render('home', { name: 'Luis Alejandro Figueredo', modeColor:modeColor });
});

app.get('/en', (req: Request, res: Response) => {
    i18next.changeLanguage('en');
    const mySession = req.session as unknown as MySession
    const modeColor = (req.session as unknown as MySession).color;
    mySession.language = 'en'
    res.render('home', { name: 'Luis Alejandro Figueredo', modeColor:modeColor });
});

app.get('/demo', (req:Request, res:Response) => {
    const modeColor = (req.session as unknown as MySession).color;
    res.render('demoGD',{modeColor:modeColor});
});

app.get('/conocimientos', (req:Request, res:Response) => {
    const modeColor = (req.session as unknown as MySession).color;
    res.render('conocimientos', { modeColor:modeColor });
});

app.get('/changeColor', (req:Request, res:Response) => {
    const mySession = req.session as unknown as MySession;
    if (mySession.color==='dark'){
        mySession.color='light';
    } else {
        mySession.color='dark';
    }
    res.json({ mensaje: 'ok' });
});


app.get('/titulos', (req, res) => {
    const modeColor = (req.session as unknown as MySession).color;
    res.render('titulos', { modeColor:modeColor });
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