const Handler = require('./queries.js');

exports.register = function (server, options, next) {
	// console.log(server.app.db);
	server.bind({db: server.app.db});
	server.route([
	    {                                           
		    method: 'GET',                                   
		    path: '/api/domaines',                                
		    handler: Handler.find
		},
		{
		    method: 'GET',
		    path: '/api/domaines/{id}',
		    handler: Handler.findOne
		},
		{
		    method: 'POST',
		    path: '/api/domaines',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.create
		},
		{
		    method: 'PUT',
		    path: '/api/domaines/{id}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.update
		},
		{
		    method: 'DELETE',
		    path: '/api/domaines/{id}',
		    // not for now: implement authentication
		    // config: {
		    //     auth: 'api'                   
		    // },
		    handler: Handler.delete
		}
	]);
	
	next(); 
};

exports.register.attributes = { pkg: require('./package') };
