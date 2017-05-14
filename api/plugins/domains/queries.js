'use strict';

exports.find = function (request, reply) {
        let sql = 'SELECT * FROM domaines';
        const params = [];
        if(request.query.domain) {
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
        this.db.get('SELECT * FROM domaines WHERE id = ?', 
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
    const sql = 'INSERT INTO domaines (name, main_appellation_id) VALUES (?,?)';
    this.db.run(sql, 
    [
        request.payload.name,
        request.payload.main_appellation_id          
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
};
exports.update = function (request, reply) {
    const sql = 'UPDATE domaines SET name = ?, main_appellation_id = ? WHERE id = ?';
    this.db.run(sql, 
    [
        request.payload.name,
        request.payload.main_appellation_id,
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
    this.db.run('DELETE FROM domaines WHERE id = ?', 
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