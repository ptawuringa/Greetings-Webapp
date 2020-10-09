module.exports = function greet() {

    var greetObj = {};


    function setName(name) {

        if (greetObj[name] === undefined) {
            greetObj[name] = 0;
        }
        greetObj[name]++
    }


    function greetMe(name, languageType) {
        if (languageType === 'English') {
            return "hello " + name;

        }

        if (languageType === 'Afrikaans') {
            return "More " + name;
        }

        if (languageType === 'IsiXhosa') {
            return "Molo " + name;
        }

    }

    function getName(){
        return greetObj;
    }



    function errorMessage(name, languageType) {
        if (!name) {
            return "Enter name";

        }
        if (!languageType) {
            return "Enter languageType";
        }
        if (!name, !languageType) {
            return "Enter both name and languageType";
        }
    }

    function nameCount() {
        return Object.keys(greetObj).length;
    }

    

    return {
        greetMe,
        getName,
        setName,
        nameCount,
        errorMessage,
       
    }

}




// function greetings() {
//     var greetObj = {}

//     function countGreetings() {

//         var greetCount = 0;

//         for (var i in greetObj) {

//             if (greetObj.Length(i)) {

//                 greetObj++
//             }
//         }

//         return greetCount
//     }
// }

// function mygreetings() {
//     var x = document.getElementById("greet");

//   }


