"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const app = (0, express_1.default)();
// Configure Handlebars as the view engine
app.engine('handlebars', (0, express_handlebars_1.engine)({
    extname: ".handlebars",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    defaultLayout: "view/layouts",
}));
app.set('view engine', 'handlebars');
app.set("views", "views");
// Define a route that renders a Handlebars template
app.get('/', (req, res) => {
    res.render('home', { title: 'Express Handlebars Example' });
});
// Serve static files from the "public" folder
app.use(express_1.default.static('public'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
