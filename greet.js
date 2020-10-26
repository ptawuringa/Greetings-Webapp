module.exports = function greet(pool) {

    var greetObj = {};


    async function setName(name) {

        // if (greetObj[name] === undefined) {
        await pool.query('insert into greet(name,count) values ($1, $2)', [name, 1]);

        // greetObj[name] = 0;
        // }
        // greetObj[name]++
    }


    function greetMe(name, languageType) {
        name = name.toUpperCase().charAt(0) + name.slice(1)
        if (languageType === 'English') {
            return "Hello " + name;

        }

        if (languageType === 'Afrikaans') {
            return "More " + name;
        }

        if (languageType === 'IsiXhosa') {
            return "Molo " + name;
        }

    }

    async function getName() {
        let getName = await pool.query('SELECT name  FROM greet');
        return getName.rows;
    }

    async function all(name) {
        let greet = await pool.query('SELECT count from greet where name=$1',[name]);
        
        return greet.rows[0].count;
    }
    // async function add(greet) {
    //     let data = [
    //         greet.name
    //     ];
    //     let results = await pool.query(`insert into greet (name)  
    //         values ($1)
    //         returning id, name`, data);
    //     return results.rows[0]
    // }

    async function selectAndUpdate(name) {
        let results = await pool.query('SELECT name FROM greet WHERE name = $1', [name]);
        if (results.rows.length > 0) {
        await  update(name)
        }
        else {
         await  setName(name)
        }
    }

    async function update(name) {
        return pool.query('UPDATE greet SET count=count+1 WHERE name =$1 ', [name]);
    }

    async function deleteOne() {
    let dltOne = await pool.query('delete FROM greet');
       console.log (dltOne.rows)
        return dltOne.rows;
    }


    function errorMessage(name, languageType) {
        if (!name) {
            return ("Enter name");

        }
        if (!languageType) {
            return ("Enter languageType");
        }
        if (!name && !languageType) {
            return ("Enter both name and languageType");
        }
    }

    async function  nameCount() {
    let count = await pool.query('SELECT * FROM greet')
    return count.rowCount;
    }



    return {
        greetMe,
        getName,
        setName,
        nameCount,
        errorMessage,
        // add,
        all,
    deleteOne,
        selectAndUpdate,
        update

    }

}



