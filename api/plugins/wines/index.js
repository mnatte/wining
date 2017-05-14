const Handler = require('./queries.js');

exports.register = function (server, options, next) {
	// console.log(server.app.db);
	server.bind({db: server.app.db});
	server.route([
	    {                                           
		    method: 'GET',                                   
		    path: '/api/wines',                                
		    handler: Handler.find
		},
		{
		    method: 'GET',
		    path: '/api/wines/{id}',
		    handler: Handler.findOne
		},
		{
		    method: 'GET',
		    path: '/api/stock',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.stock
		},
		{                                           
		    method: 'GET',                                   
		    path: '/api/stock/domaines/{region}',                                
		    handler: Handler.stockByDomaineForRegion
		},
		{
		    method: 'GET',
		    path: '/api/stockByCountry',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.stockByCountry
		},
		{
		    method: 'GET',
		    path: '/api/stockByCountry/{country}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.stockByRegion
		},
		{
		    method: 'GET',
		    path: '/api/stockByRegion/{region}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.stockByAppellation
		},
		{
		    method: 'PUT',
		    path: '/api/stock/increase/{id}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.increaseStock
		},
		{
		    method: 'PUT',
		    path: '/api/stock/decrease/{id}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.decreaseStock
		},
		{
		    method: 'POST',
		    path: '/api/wines',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.create
		},
		{
		    method: 'PUT',
		    path: '/api/wines/{id}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.update
		},
		{
		    method: 'DELETE',
		    path: '/api/wines/{id}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.delete
		}]);
	
	next(); 
};

exports.register.attributes = { pkg: require('./package') };
