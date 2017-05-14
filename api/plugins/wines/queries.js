'use strict';

exports.find = function (request, reply) {
        let sql = 'SELECT c.*, w.* FROM wines w INNER JOIN cuvees c ON w.cuvee_id = c.id';
        const params = [];
        if(request.query.wine) {
            sql += ' WHERE name = ?';
            params.push(request.query.wine);
        }
        this.db.all(sql, params, (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.stock = function (request, reply) {
        let sql = 'SELECT w.id, cu.name, w.vintage, w.ml, w.stock, cu.color, w.alcoholpercentage, a.name as appellation, ' +
        'd.name as domaine, sr.name as subregion, r.name as region, c.name as country ' +
        'FROM wines w INNER JOIN appellations a ON cu.appellation_id = a.id ' +
        'INNER JOIN domaines d ON cu.domaine_id = d.id ' +
        'INNER JOIN subregions sr ON a.subregion_id = sr.id ' +
        'INNER JOIN regions r ON sr.region_id = r.id ' +
        'INNER JOIN countries c ON r.country_id = c.id ' +
        'INNER JOIN cuvees cu ON w.cuvee_id = cu.id ' +
        'WHERE w.stock > 0';
        const params = [];
        // if(request.query.wine) {
        //     sql += ' WHERE name = ?';
        //     params.push(request.query.wine);
        // }
        this.db.all(sql, params, (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.stockByCountry = function (request, reply) {
        let sql = 'SELECT c.name as country, cu.color, SUM(w.stock) AS amount ' +
        'FROM wines w INNER JOIN appellations a ON cu.appellation_id = a.id ' +
        'INNER JOIN domaines d ON cu.domaine_id = d.id ' +
        'INNER JOIN subregions sr ON a.subregion_id = sr.id ' +
        'INNER JOIN cuvees cu ON w.cuvee_id = cu.id ' +
        'INNER JOIN regions r ON sr.region_id = r.id ' +
        'INNER JOIN countries c ON r.country_id = c.id '
        const params = [];
        if(request.query.country) {
            sql += ' WHERE c.name = ? ';
            params.push(request.query.country);
            console.log(sql);
        }
        sql += 'GROUP BY c.name, cu.color'
        this.db.all(sql, params, (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.stockByRegion= function (request, reply) {
        let sql = 'SELECT r.name as region, cu.color, SUM(w.stock) AS amount ' +
        'FROM wines w INNER JOIN appellations a ON cu.appellation_id = a.id ' +
        'INNER JOIN domaines d ON cu.domaine_id = d.id ' +
        'INNER JOIN subregions sr ON a.subregion_id = sr.id ' +
        'INNER JOIN regions r ON sr.region_id = r.id ' +
        'INNER JOIN countries c ON r.country_id = c.id ' +
        'INNER JOIN cuvees cu ON w.cuvee_id = cu.id ' +
        'WHERE c.name = ? ' +
        'GROUP BY r.name, cu.color'
        this.db.all(sql, [request.params.country], (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.stockByAppellation= function (request, reply) {
        let sql = 'SELECT a.name as appellation, cu.color, SUM(w.stock) AS amount ' +
        'FROM wines w INNER JOIN appellations a ON cu.appellation_id = a.id ' +
        'INNER JOIN domaines d ON cu.domaine_id = d.id ' +
        'INNER JOIN subregions sr ON a.subregion_id = sr.id ' +
        'INNER JOIN regions r ON sr.region_id = r.id ' +
        'INNER JOIN countries c ON r.country_id = c.id ' +
        'INNER JOIN cuvees cu ON w.cuvee_id = cu.id ' +
        'WHERE r.name = ? ' +
        'GROUP BY a.name, cu.color'
        this.db.all(sql, [request.params.region], (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
    exports.stockByDomaineForRegion= function (request, reply) {
        let sql = 'SELECT d.name as domaine, cu.color, SUM(w.stock) AS amount ' +
        'FROM wines w INNER JOIN appellations a ON cu.appellation_id = a.id ' +
        'INNER JOIN domaines d ON cu.domaine_id = d.id ' +
        'INNER JOIN subregions sr ON a.subregion_id = sr.id ' +
        'INNER JOIN regions r ON sr.region_id = r.id ' +
        'INNER JOIN countries c ON r.country_id = c.id ' +
        'INNER JOIN cuvees cu ON w.cuvee_id = cu.id ' +
        'WHERE r.name = ? ' +
        'GROUP BY d.name, cu.color'
        this.db.all(sql, [request.params.region], (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };
exports.increaseStock = function(request, reply) {
    const sql = 'UPDATE wines SET stock = stock + 1 WHERE id = ?';
    this.db.run(sql, 
    [
        request.params.id
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
}; 
exports.decreaseStock = function(request, reply) {
    const sql = 'UPDATE wines SET stock = stock - 1 WHERE id = ?';
    this.db.run(sql, 
    [
        request.params.id
    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
}; 
exports.findOne = function (request, reply) {
        this.db.get('SELECT * FROM wines WHERE id = ?', 
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
    const sql = 'INSERT INTO wines (cuvee_id, vintage, alcoholpercentage, stock, ml) VALUES (?,?,?,?,?)';
    this.db.run(sql, 
    [
        request.payload.cuvee_id,             
        request.payload.vintage,
        request.payload.alcohol,
        request.payload.stock,
        request.payload.ml

    ], 
    (err) => {
        if (err) {
            throw err;
        }
        reply({ status: 'ok' });
    });
};
exports.update = function (request, reply) {
    const sql = 'UPDATE wines SET name = ?, appellation_id = ?, domaine_id = ?, color = ?, vintage = ?, alcoholpercentage = ?, stock = ?, ml = ? WHERE id = ?';
    this.db.run(sql, 
    [
        request.payload.name,             
        request.payload.appellation_id,
        request.payload.domaine_id,
        request.payload.color,
        request.payload.vintage,
        request.payload.alcohol,
        request.payload.stock,
        request.payload.ml,
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
    this.db.run('DELETE FROM wines WHERE id = ?', 
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