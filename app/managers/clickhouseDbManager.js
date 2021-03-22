const
    config = require('config'),
    ClickHouse = require('@apla/clickhouse'),
    ch = new ClickHouse(config.clickhouse),
    fs = require('fs'),
    {TABLE_FILE_LIST, CREATE_DB_QUERY_LIST} = require('../../data/tablets')
;


/**
 * 
 * @param {*} obj  
 * @returns {String} sql query 
 */

function queryConstructor (obj) {

    let select = '',
        from = '',
        where = '',
        group = '',
        sort = '',
        arrayJoin = ''  
    /// parse select items and elements for array join
    for (let sel of obj.select) {
        select == '' ? select += sel.value : select += ', ' + sel.value;
        if (sel.type.includes('Array')) {
            arrayJoin == '' ? arrayJoin += ' ARRAY JOIN ' + sel.name : arrayJoin += ', ' + sel.name;
        } 
    }
    /// recursive func for getting all subqueries
    if(obj.haveSubRequest) {
        from = '( ' + queryConstructor(obj.from) + ' )';
    } else {
        from = obj.from 
    }
    /// create other micro queries like 'WHERE user_id < 123'
    obj.where.length > 0 ? where = ' WHERE ' + obj.where.join(' AND ') + ' AND ' + obj.date : where = ' WHERE ' + obj.date;
    if (obj.group.length > 0) group = ' GROUP BY ' + obj.group.join(', ');
    if (obj.sort.length > 0) sort = ' ORDER BY ' + obj.sort.join(', ');
    return 'SELECT ' + select + ' FROM ' + from + arrayJoin + where + group + sort + ' limit 100';
}



/**
 * 
 * @param {*} body array of objects with 'UNION' strings between them  
 * @returns {String} sql query 
 */

function queryUnion(body) {
    if (body.length < 2) return queryConstructor(body[0]);
    let query = '';
    for (let i in body){
        i % 2 == 0 ? query += queryConstructor(body[i]) + ' ' : query += body[i] + ' ';
    }
    return query;
}


module.exports = {
    /**
     * Get all tables with their fields from DB
     * @return {Array}  [ [table, [titles]], [table2, [titles]] ]
     */
    getSearchParams: async function getSearchParamsFromDb() {
        const showTables = await ch.querying('show tables', {format: 'JSONCompact'});
        let tables = showTables.data;
        let tablesWithHeads = [];
        for(let i in tables) {
            let heads = await ch.querying(`SELECT * FROM ${tables[i].join('')} limit 1`, {format: 'JSONCompact'});
            let tableItem = tables[i];
            tableItem.push(heads.meta);
            tablesWithHeads.push(tableItem);
        }
        return tablesWithHeads;
    },
    /**
     * Create request and get certain data from DB
     * @param {*} body 
     * @returns {Array} { meta: [], data: [] };
     */
    getSearchResults: async function getSearchResultsFromDb(body) {
        try {    
            let query = queryUnion(body); 
                console.log(query);
                const searchRequest = await ch.querying(query, {format: 'JSONCompact'});
                console.log(searchRequest);
                return searchRequest;
        }
            catch(err) {
                console.log('error is here.. ', err);
                return {error: 'No data matching this request'};
            }
        
    },

     /**
     * 
     * @param {*} table name of creating table
     * @param {*} fileName name of the file for importing data in CSV format
     * @returns {Promise} return true if data is imported and false otherwise
     */
      importDbCsv: async function importDbFromCSVfile(table,fileName){
        let result = "The tables are imported";
        for(let  i=0; i< TABLE_FILE_LIST.length; i++) {
           const query = `INSERT INTO ${TABLE_FILE_LIST[i][0]} FORMAT CSVWithNames`;
           try {
               const csvStream = fs.createReadStream(`data/${TABLE_FILE_LIST[i][1]}`)
               const clickhouseStream = ch.query(query)
               csvStream.pipe(clickhouseStream)
               .on("finish", (ev)=> console.log(`The data from ${TABLE_FILE_LIST[i][1]} is imported to ${TABLE_FILE_LIST[i][0]}`))
               csvStream.on("error", (error)=>{
                   console.log("Error in reading data from file:", TABLE_FILE_LIST[i][1]); 
                   clickhouseStream.end();
                   result = `Error in reading data from file: ${TABLE_FILE_LIST[i][1]}`;
                   return `Error in reading data from file: ${TABLE_FILE_LIST[i][1]}`;
               })    
       
           } catch (error) {
               result = "The next error is happened during importing the file to DB" + error;
               console.log("The next error is happened during importing the file to DB", error);
               return "There is an error during importing.";
           }
        }
       
       return result;
   },

   createNewTable: async function createTable() {

       for (let i =0; i< CREATE_DB_QUERY_LIST.length; i++) {
           try {
               await ch.querying(CREATE_DB_QUERY_LIST[i], {format: 'JSONCompact'});
           } catch (error) {
               return `An error happened during creating Db #${i+1}`
           }
       }
       return "The all tables are created"
       
       
   }

}