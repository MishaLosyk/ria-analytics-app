const
    config = require('config'),
    ClickHouse = require('@apla/clickhouse'),
    ch = new ClickHouse(config.clickhouse)
;
/**
 * 
 * @param {*} table     table name
 * @param {*} select    certain fields in table 
 * @param {*} where     condition 
 * @param {*} group     group by @select 
 * @param {*} sort      sort by @select
 * @returns {String}    query message
 */

function requestConstructor(table, select, where, group, sort) {
    let request = 'SELECT ' + select + ' FROM ' + table;

    //check if select element is Array
    for(let i in select) {
        let s = select[i];
        if (Array.isArray(s)) {
            request.includes('ARRAY JOIN') ? request += ', ' + s : request += ' ARRAY JOIN ' + s;
        }
    }
    if(where[0]) {request += ' WHERE ' + where}
    if(group[0]) {request += ' GROUP BY ' + group}
    if(sort[0]) {request += ' SORT BY ' + sort}
    return request += ' limit 10';
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
        let query = requestConstructor(...Object.values(body));
        console.log(query);
        const searchRequest = await ch.querying(query, {format: 'JSONCompact'});
        return searchRequest;
        
    }

}