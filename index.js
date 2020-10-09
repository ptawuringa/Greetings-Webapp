var express = require('express')
var bodyParser = require('body-parser')
const greeting = require('./greet')
const greetings = greeting()
const exphbs = require('express-handlebars');
const greet = require('./greet');


var app = express();


app.engine('handlebars', exphbs({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.get('/the-route', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});

app.get('/', function (req, res) {
    res.render('index', {


    });
    // res.send("index")
});

app.post("/clear", async function(req,res){
    await greet.clear ();
    res.redirect("/");
});

app.post('/greet', function (req, res) {
    var name = req.body.userName;
    var lang = req.body.languageType;
    // var greeted = req.body.greeted;
    // var counter = req.body.timesGreeted;
    // var error = greetings.errorMessage(name,lang);
    greetings.setName(name);

    res.render('index', {
        name: greetings.greetMe(name, lang),
        //   message: (error === "") ? greet.greetLang(req.body.langauge, req.body.nameValue) : error,

        // languageType: greet.greeted(req.body.languageType, req.body.nameValue),
        count: greetings.nameCount(),

    });
})
    app.get('/greeted', function (req, res) {
let names =  greetings.getName()
console.log(names)
        res.render('greeted', {
        greeted : names
        });

    // res.send("index")
});

app.get("/counter/:username",function (req, res){
  let personsName = req.params.username;

let listNames = greetings.getName()

  res.render('counter',{
      count : listNames[personsName],
     name : personsName
  })
})



const PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});