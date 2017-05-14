'use strict';

exports.find = function (request, reply) {
        let sql = 'SELECT * FROM regions';
        const params = [];
        if(request.query.region) {
            sql += ' WHERE name = ?';
            params.push(request.query.region);
        }
        this.db.all(sql, params, (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.findOne = function (request, reply) {
        this.db.get('SELECT * FROM regions WHERE id = ?', 
            [request.params.id],                      
            (err, result) => {
            if (err) {
                throw err;
            }
            if (typeof result !== 'undefined') {        
                return reply(result);                  
            } 
            return reply('Not found').code(404);        
        });
    };
exports.create = function (request, reply) {
    const sql = 'INSERT INTO regions (name, country_id) VALUES (?,?)';
    this.db.run(sql, 
    [
        request.payload.name,             
        request.payload.country_id           
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
};
exports.update = function (request, reply) {
    const sql = 'UPDATE regions SET name = ?, country_id = ? WHERE id = ?';
    this.db.run(sql, 
    [
        request.payload.name,
        request.payload.country_id,
        request.params.id      
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
};
exports.delete = function (request, reply) {
    this.db.run('DELETE FROM regions WHERE id = ?', 
            [request.params.id],                      
            (err, result) => {
            if (err) {
                throw err;
            }
            if (typeof result !== 'undefined') {        
                return reply(result);                  
            } 
            reply({ status: 'ok' });        
        });
};