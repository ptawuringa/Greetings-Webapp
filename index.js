var express = require('express')
const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
const greeting = require('./greet')
const greetingRoutes = require('./routes')



const exphbs = require('express-handlebars');

const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://patience:codex123@localhost:5432/greeting';

const pool = new Pool({
    connectionString,
});

const greetingsX = greeting(pool)
const greetings = greetingRoutes(greetingsX)
var app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "This is my string that i used for session",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.engine('handlebars', exphbs({ layoutsDir: "./views/layouts/" }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}


app.use('/static', express.static('public'))

app.get('/', greetings.name);


app.post('/greet', greetings.app);


app.get("/reset", greetings.one);



app.get('/greeted', greetings.getapp);



app.get("/counter/:username", greetings.countname);


const PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});