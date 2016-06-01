module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  var Mongo = app.dataSources.MongoDB;
  var User = app.models.AppUser;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  
  User.findOrCreate({
	  where: {username: 'admin'}
  },
  {
	username: 'admin',
	email: 'kiara.ottogalli@gmail.com',
	password: 'admin',
	name: 'Kiara',
	type: 'admin'
  },
  function(err, user, created){
	if(err) next(err);
	
	if(created)
		console.log('Created user:', user);
	else
		console.log('Found user:', user);
	
	Role.findOrCreate({
		where: {name: 'admin'}
	},
	{
		name: 'admin'
	},
	function(err, role, created){
	  if(err) next(err);
	
	  if(created) {
		console.log('Created role:', role);
		
		role.principals.create({
	      principalType: RoleMapping.USER,
  		  principalId: user.id
	    },
	    function(err, principal){
		  if(err) next(err);
		  
		  console.log('Created principal:', principal);
		  
	    });
	  }
	  else
		console.log('Found role:', role);
	});
  });
};
