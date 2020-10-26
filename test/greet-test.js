const assert = require('assert');
const greet = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;


const INSERT_QUERY = 'insert into greet(name,count) values ($1, $2)'

const connectionString = process.env.DATABASE_URL || 'postgresql://patience:codex123@localhost:5432/greeting';

const pool = new Pool({
    connectionString
})


describe('The basic database web app', function () {

    beforeEach(async function () {
        await pool.query("delete from greet;");

    });

    it('should able to add a name', async function () {
        const greetInstance = greet(pool)

        await greetInstance.setName('makho');
        let names = await greetInstance.getName();

        assert.deepStrictEqual([{ 'name': 'makho' }], names);
    });

    it('should able to update the persons counter when name is inserted more than one ', async function () {
        // assemble
        const greetInstance = greet(pool)

        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.selectAndUpdate('Patience')


        assert.equal(3, await greetInstance.all('Makho'));
    });

    it('should able to count how many name are being entered', async function () {
        // assemble
        const greetInstance = greet(pool)

        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.selectAndUpdate('Salizwa')
        await greetInstance.selectAndUpdate('Themba')


        assert.equal(3, await greetInstance.nameCount());
    });

    it('should able to get username', async function () {
        // assemble
        const greetInstance = greet(pool)

        await greetInstance.selectAndUpdate("Tinashe")
        await greetInstance.selectAndUpdate("Patience")
        await greetInstance.selectAndUpdate("Makho")


        assert.deepStrictEqual([
            {
                name: 'Tinashe'
            },
            {
                name: 'Patience'
            },
            {
                name: 'Makho'
            }
        ]
            , await greetInstance.getName());
    });




    it('should able to delete a name', async function () {

        const greetInstance = greet(pool)

        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.selectAndUpdate('Patience')
        await greetInstance.selectAndUpdate('Makho')
        await greetInstance.deleteOne()

        assert.deepStrictEqual([], await greetInstance.getName());

    });

    after(function () {
        pool.end();
    })
});




