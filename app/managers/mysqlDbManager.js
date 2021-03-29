const
    // config = require('config'),
    mysql = require('mysql2/promise');

async function main() {
    connection = await mysql.createConnection({
        host: "localhost",
        port: "3307",
        database: "labelsDb",
        user: "root",
        password: "password"
      });  
}   
main ();



module.exports = {

    /**
     * Create request and get certain data from DB
     * @param {*} body 
     * @returns {Array} { meta: [], data: [] };
     */

    checkLogin: async function checkLoginFromDb(auth) { 
        let b = await connection.query('SELECT * from users where email = ? AND password = ?', auth);
        if (b[0].length) {
            return [{
               user_id:     b[0][0].user_id,
               role:        b[0][0].role
            },
            {
                user_id:    b[0][0].user_id,
                role:       b[0][0].role,
                name:       b[0][0].name,
                tables:     b[0][0].tables
            }
        ];
        } else {return false}
        
    },

    addNewQuery: async function addNewQueryToDB(newQuery){
        const result = await connection.execute('INSERT INTO queries(user_id, query_name, query) VALUES(?, ?, ?)',
                                                [newQuery.user_id, newQuery.query_name, newQuery.query]);
        return result;
    },

    getQueryList: async function getQueryListFromDb(userId){
        const result = await connection.execute('SELECT * from queries where user_id = ?', [userId]);
        return result[0];
    },

    shareQuery: async function addSharedQueryToDb(query){
        const findUser = await connection.query('SELECT * from users where email = ?', [query.email]);
        const findQuery = await connection.query('SELECT * from queries where query_id = ?', [query.query_id]);
        
        const userId = findUser[0][0].user_id;
        const queryParams = findQuery[0][0];
        queryParams.user_id = userId;

        const result = await this.addNewQuery(queryParams);
        return result;
    },

    validateUser: async function validateUserInDb(userId, field, value, table){
        const result = await connection.execute(`SELECT * from ${table} where user_id = ? AND ${field} = ?`, [userId, value]);
        return result[0].length > 0;
    },

    removeQueryId: async function removeQueryFromDb(id){
        const result = await connection.execute('DELETE from queries where query_id = ?', [id]);
        return result;
    },

    usersList: async function getUsersListFromDb(body){
        const result = await connection.query(`SELECT * from users where ${body.where}`);
        return result[0];
    },

    addUser: async function addUserToDb(body){
        let checkEmail = await connection.query('SELECT * from users where email = ?', body.email);
        if (!checkEmail[0].length) {
            await connection.execute('INSERT INTO users(email, password, name, surname, tables, role) VALUES(?, ?, ?, ?, ?, ?)',
                                    [body.email, body.password, body.name, body.surname, body.tables, body.role])
            const result = await connection.query(`SELECT * from users where email = ?`, [body.email]);
            return result[0][0];
        }   else return 'Такий користувач уже існує';
    },

    removeUser: async function removeUserFromDb(id){
        const checkUser = await connection.query('SELECT * from users where user_id = ?', id);
        if (checkUser[0].length) {
            const response = await connection.execute('DELETE from users where user_id = ?', [id]);
            return true;
        } else { return false }

    },

    updateUser: async function updateUserFromDb(user){
            
        console.log(user.email);
        await connection.execute('UPDATE users set email = ?, password = ?, name = ?, surname = ?, tables = ?, role = ?, api_key = ? where user_id = ?',
                                                    [user.email, user.password, user.name, user.surname, user.tables, user.role, user.api_key, user.user_id]);
        return true;
    },

    getLogs: async function getLogsFromDb(body){
            
        console.log(body.where);
        let result = await connection.query(`SELECT * from logs where ${body.where}`);
        return result[0];
    },

    addLog: async function addLogToDB(userId, query){
        let date = new Date();
        await connection.execute('INSERT INTO logs(user_id, date, query) VALUES(?, ?, ?)', [userId, date, query]);
    },
    
    test: async function getTestQuery(){
        return await connection.query('select * from users');
    }

}