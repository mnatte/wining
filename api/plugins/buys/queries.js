'use strict';


exports.find = function (request, reply) {
        let sql = 'SELECT * FROM buys';
        const params = [];
        if(request.query.country) {
            sql += ' WHERE name = ?';
            params.push(request.query.country);
        }
        this.db.all(sql, params, (err, results) => { 
            if (err) {                                   
                throw err;                                
            }                                             
            reply(results);           
        });
    };

exports.findOne = function (request, reply) {
        this.db.get('SELECT * FROM buys WHERE id = ?', 
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
    const sql = 'INSERT INTO buys (location, date, discount) VALUES (?,?,?)';
    var self = this;
    this.db.run(sql, 
        [
            request.payload.location,
            request.payload.date,
            request.payload.discount        
        ], 
        function (err, results) {
            if (err) {
                throw err;
            }
            var buyid = this.lastID;
            // console.log(this);
            var entries = request.payload.buyEntries;
            entries.forEach(function(entry) {
                const query = 'INSERT INTO buyentries (wine_id, price, amount, buysession_id) VALUES (?,?,?,?)';

                self.db.run(query, 
                    [
                        entry.wine_id,
                        entry.price,
                        entry.amount,
                        buyid        
                    ], 
                    (err, results) => {
                        if (err) {
                            throw err;
                        }
                    }
                );
                const stock = 'UPDATE wines SET stock = stock + ? WHERE id = ?';

                self.db.run(stock, 
                    [
                        entry.amount,
                        entry.wine_id
                    ], 
                    (err, results) => {
                        if (err) {
                            throw err;
                        }
                    }
                );
            });
            reply({ status: 'ok' });
        }
    );
};
exports.update = function (request, reply) {
    const sql = 'UPDATE buys SET name = ? WHERE id = ?';
    this.db.run(sql, 
    [
        request.payload.name,
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
    this.db.run('DELETE FROM buys WHERE id = ?', 
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