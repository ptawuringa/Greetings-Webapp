module.exports = function greetings(pool){
async function all(){
    let greetings = await pool.query('SELECT * from greetings');
    return greetings.rows;
}
async function add(greetings){
    let data = [
        greetings.name
    ];
    let results = await pool.query(`insert into greetings (name)  
        values ($1)
        returning id, name`, data);
    return results.rows[0]
}

async function get(id){
    let results = await pool.query('SELECT * FROM greetings WHERE id = $1', [id]);
    if (results.rows.length > 0) {
        return results.rows[0];
    }
    return null;
}

async function update(category){
    return pool.query('UPDATE greetings SET name = $1 WHERE id = $2', [greetings.name, greetings.id]);
}

async function deleteOne (id){
    return pool.query('DELETE FROM greetings WHERE id = $1', [id]);
}

return {
    add,
    all,
    delete : deleteOne,
    get,
    update
}
}