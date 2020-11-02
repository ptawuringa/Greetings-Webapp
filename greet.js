module.exports = function greet(pool) {

    var greetObj = {};


    async function setName(name) {

        await pool.query('insert into greet(name,count) values ($1, $2)', [name, 1]);
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
        let greet = await pool.query('SELECT count from greet where name=$1', [name]);

        return greet.rows[0].count;
    }


    async function selectAndUpdate(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1)

        let results = await pool.query('SELECT name FROM greet WHERE name = $1', [name]);
        if (results.rows.length > 0) {
            await update(name)
        }
        else {
            await setName(name)
        }
    }

    async function update(name) {
        
        return pool.query('UPDATE greet SET count=count+1 WHERE name =$1 ', [name]);
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

    async function nameCount() {
        let count = await pool.query('SELECT * FROM greet')
        return count.rowCount;
    }

    async function deleteOne() {
        let dltOne = await pool.query('delete FROM greet');
        console.log(dltOne.rows)
        return dltOne.rows;
    }


    return {
        greetMe,
        getName,
        setName,
        nameCount,
        errorMessage,
        all,
        deleteOne,
        selectAndUpdate,
        update

    }

}



