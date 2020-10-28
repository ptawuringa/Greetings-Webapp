module.exports =  function greetingRoutes(greeted) {

    
    const app = async function (req, res) {
        var name = req.body.userName;
        var lang = req.body.languageType;
    
        if (name === "") {
            req.flash('info', 'ERROR, Please enter your name');
        } else if (lang === undefined) {
            req.flash('info', 'ERROR,Please select your langauge');
        } else {
    
            await greeted.selectAndUpdate(name);
            let msg = await greeted.greetMe(name, lang)
    
    
        }  
    
    

    res.render('index', {
        name: await greeted.greetMe(name, lang),
        count: await greeted.nameCount(),
    
    
    })

};

const name = async function (req, res) {

    let counter = await greeted.nameCount()

    res.render('index', {
        count: counter
    })
};
 
const one = async function (req, res) {
    await greeted.deleteOne();
    res.redirect("/");
};

const getapp = async function (req, res) {
    let names = await greeted.getName()

    res.render('greeted', {
        greeted: names
    });
};

const countname =async function (req, res) {
    let personsName = req.params.username;

    let listNames = await greeted.all(personsName)
    console.log(listNames)
    res.render('counter', {
        count: listNames,
        name: personsName
    })
};

    return{
        app,
        name,
        one,
        getapp,
        countname
    }

    

}