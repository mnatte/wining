'use strict';

exports.find = function (request, reply) {
        let sql = 'SELECT * FROM subregions';
        const params = [];
        if(request.query.subregion) {
            sql += ' WHERE name = ?';
            params.push(request.query.subregion);
        }
        this.db.all(sql, params, (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.findOne = function (request, reply) {
        this.db.get('SELECT * FROM subregions WHERE id = ?', 
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
    const sql = 'INSERT INTO subregions (name, region_id) VALUES (?,?)';
    this.db.run(sql, 
    [
        request.payload.name,             
        request.payload.region_id           
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
};
exports.update = function (request, reply) {
    const sql = 'UPDATE subregions SET name = ?, region_id = ? WHERE id = ?';
    this.db.run(sql, 
    [
        request.payload.name,
        request.payload.region_id,
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
    this.db.run('DELETE FROM subregions WHERE id = ?', 
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