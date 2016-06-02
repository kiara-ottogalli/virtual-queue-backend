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
  
  Role.findOrCreate({
	where: {name: 'admin'}
  },
  {
	name: 'admin'
  },
  function(err, role, created){
	if(err) throw(err);
	
	if(created)
	  console.log('Created role:', role.name);
    else
      console.log('Found role:', role.name);
    
	User.findOrCreate({
	  where: {username: 'admin'}
    },
    {
	  username: 'admin',
	  email: 'kiara.ottogalli@gmail.com',
	  password: 'admin',
	  name: 'Kiara'
    },
    function(err, user, created){
	  if(err) throw(err);
	
	  if(created)
		console.log('Created admin user:', user.username);
	  else
		console.log('Found admin user:', user.username);
		
	  role.principals.create({
	    principalType: RoleMapping.USER,
  		principalId: user.id
	  },
	  function(err, principal){
		if(err) throw(err);
		  
		console.log('User: ', user.username, ' and Role: ', role.name, ' related');
		  
	  });
	});
  });
  
  Role.findOrCreate({
	where: {name: 'doctor'}
  },
  {
	name: 'doctor'
  },
  function(err, role, created){
	if(err) throw(err);
	
	if(created)
	  console.log('Created role:', role.name);
    else
      console.log('Found role:', role.name);
  });
}