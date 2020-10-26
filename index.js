var express = require('express')
const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
const greeting = require('./greet')

const exphbs = require('express-handlebars');
// const greet = require('./greet');
const pg = require("pg");
const Pool = pg.Pool;



var app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "This is my string that i used for session",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


app.engine('handlebars', exphbs({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://patience:codex123@localhost:5432/greeting';

const pool = new Pool({
    connectionString,
 //   ssl: useSSL
});
const greeted = greeting(pool)

app.use('/static', express.static('public'))

app.get('/', async function (req, res) {
    // req.flash('info', 'Flash Message Added');
    // res.redirect('/');
    let counter = await greeted.nameCount()

    res.render('index', {
count : counter
    })
});


app.post('/greet', async function (req, res) {
    var name = req.body.userName;
    var lang = req.body.languageType;
    // await greeted.add(name)
    if (name === "") {
        req.flash('info', 'ERROR, Please enter your name');
    } else if (lang === undefined) {
        req.flash('info', 'ERROR,Please select your langauge');
    } else {

        await greeted.selectAndUpdate(name);
        let msg = await greeted.greetMe(name, lang)

        // msg=msg.rowcount
        
        // res.render("index", {
        //     count: await greeted.nameCount(),
        //     msg,
        // });
        // return

    }

    res.render('index', {
        name: await greeted.greetMe(name, lang),
        count: await greeted.nameCount(),
           

    });


})


app.get("/reset", async function (req, res) {
    await greeted.deleteOne();
    res.redirect("/");
});



// app.get('/spotted/:user_id', function(req, res){

// });


// app.post("/clear", async function (req, res) {
//     await greetings.clear();
//     // res.redirect("/");
// });

app.get('/greeted', async function (req, res) {
    let names = await greeted.getName()
    // console.log(names)
    res.render('greeted', {
        greeted: names
    });
})



app.get("/counter/:username", async function (req, res) {
    let personsName = req.params.username;

    let listNames = await greeted.all(personsName)
    console.log(listNames)
    res.render('counter', {
        count: listNames,
        name: personsName
    })
})


const PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});