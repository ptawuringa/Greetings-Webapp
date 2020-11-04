module.exports = function greetingRoutes(greeted) {


    const app = async function (req, res) {
        var name = req.body.userName;
        var lang = req.body.languageType;
        let msg

        if (name === "") {

            req.flash('info', 'ERROR, Please enter your name');

        } else if (lang === undefined) {
            req.flash('info', 'ERROR,Please select your langauge');
        } else if(!(/[a-zA-Z]/.test(name))){
            req.flash('info', 'Enter proper name')
        }else{

            await greeted.selectAndUpdate(name);
             msg = await greeted.greetMe(name, lang)


        }



        res.render('index', {
            name: msg,
            count: await greeted.nameCount(),


        })

    };

    const home = function(req,res){
        res.render ('index')
    }

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

    const countname = async function (req, res) {
        let personsName = req.params.username;

        let listNames = await greeted.all(personsName)
        console.log(listNames)
        res.render('counter', {
            count: listNames,
            name: personsName
        })
    };

    return {
        app,
        name,
        one,
        getapp,
        countname,
        home
    }



}
