'use strict';

exports.find = function (request, reply) {
        let sql = 'SELECT c.*, d.name as domain_name, a.name as appellation_name ' +
        'FROM cuvees c INNER JOIN domaines d ON c.domaine_id = d.id INNER JOIN appellations a ON c.appellation_id = a.id';
        const params = [];
        if(request.query.domain) {
            sql += ' WHERE c.name = ?';
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
        this.db.get('SELECT * FROM cuvees WHERE id = ?', 
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
    const sql = 'INSERT INTO cuvees (name, appellation_id, domaine_id, color) VALUES (?,?,?,?)';
    this.db.run(sql, 
    [
        request.payload.name,
        request.payload.appellation_id,
        request.payload.domain_id,
        request.payload.color          
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
};
exports.update = function (request, reply) {
    const sql = 'UPDATE cuvees SET name = ?, appellation_id = ?, domaine_id = ?, color = ? WHERE id = ?';
    this.db.run(sql, 
    [
        request.payload.name,
        request.payload.appellation_id,
        request.payload.domain_id,
        request.payload.color,
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
    this.db.run('DELETE FROM cuvees WHERE id = ?', 
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