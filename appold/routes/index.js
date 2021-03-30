const Router = require('koa-router'),
      KoaBody = require('koa-body'),
     {mainPage, search, login, addQuery, queryList, test, share, removeQuery, users, addUser, removeUser, updateUser, logs} = require('../controllers/indexController');
const request = require('request');

const router = new Router();

    router
        .get('/',                   mainPage)
        .post('/search/',           KoaBody(), search)
        .post('/login/',            KoaBody(), login)
        .post('/add_q/',            KoaBody(), addQuery)
        .post('/query_list/',       KoaBody(), queryList)
        .post('/share/',            KoaBody(), share)
        .delete('/query/:id',       removeQuery)
        .post('/admin/add_user/',   KoaBody(), addUser)
        .post('/admin/users/',      KoaBody(), users)
        .post('/admin/update/',     KoaBody(), updateUser)
        .post('/admin/logs/',       KoaBody(), logs)
        .delete('/admin/user/:id',  removeUser)
        .get('/test/',              test)


module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};


