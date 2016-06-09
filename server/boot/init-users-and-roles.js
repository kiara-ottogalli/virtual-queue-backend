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
  var Role = app.models.AppRole;
  var RoleMapping = app.models.AppRoleMapping;
  var Specialty = app.models.Specialty;

  Mongo.autoupdate(function (err, result) {
    
    var specialties = [
      {name: 'general medicine', image: 'general-medicine.jpg'},
      {name: 'cardiology', image: 'cardiology.jpg'},
      {name: 'odontology', image: 'odontology.jpg'},
      {name: 'ophthalmology', image: 'ophthalmology.jpg'},
      {name: 'dermatology', image: 'dermatology.jpg'},
      {name: 'gynecology', image: 'gynecology.jpg'}
    ];

    var doctors = [
      {name: 'Daniel', lastname: 'Rosquete', phone: '+58 1234567', username: 'daniel', password: '1234', email: 'daniel@email.com'},
      {name: 'Amadís', lastname: 'Martínez', phone: '+58 1234567', username: 'amadis', password: '1234', email: 'amadis@email.com'},
      {name: 'Julia', lastname: 'Jackson', phone: '+58 1234567', username: 'julia', password: '1234', email: 'julia@email.com'},
      {name: 'Helen', lastname: 'Moritz', phone: '+58 1234567', username: 'helen', password: '1234', email: 'helen@email.com'},
      {name: 'Maria', lastname: 'Mena', phone: '+58 1234567', username: 'maria', password: '1234', email: 'maria@email.com'},
      {name: 'Luis', lastname: 'León', phone: '+58 1234567', username: 'luis', password: '1234', email: 'luis@email.com'},
      {name: 'Rosmary', lastname: 'Ferdinand', phone: '+58 1234567', username: 'rosmary', password: '1234', email: 'rosmary@email.com'},
      {name: 'Daryl', lastname: 'Cross', phone: '+58 1234567', username: 'daryl', password: '1234', email: 'daryl@email.com'},
      {name: 'Jorge', lastname: 'Negrete', phone: '+58 1234567', username: 'jorge', password: '1234', email: 'jorge@email.com'},
      {name: 'Margery', lastname: 'Campbell', phone: '+58 1234567', username: 'margery', password: '1234', email: 'margery@email.com'},
      {name: 'Jasmine', lastname: 'Grey', phone: '+58 1234567', username: 'jasmine', password: '1234', email: 'jasmine@email.com'},
      {name: 'Clara', lastname: 'Gómez', phone: '+58 1234567', username: 'clara', password: '1234', email: 'clara@email.com'}
    ];
    
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
        email: 'admin@localhost.com',
        password: 'admin',
        name: 'admin'
      },
      function(err, user, created){
        if(err) throw(err);
    
        if(created){
          console.log('Created admin user:', user.username);
      
          role.roleMappings.create({
            principalType: RoleMapping.USER,
            principalId: user.id
          },
          function(err, principal){
            if(err) throw(err);
            console.log('User: ', user.username, ' and Role: ', role.name, ' related');
          });
        }
        else
          console.log('Found admin user:', user.username);
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
    
      if(created){
        console.log('Created role:', role.name);
        specialties.forEach(function(element, index) {
          Specialty.findOrCreate({
            where: {name: element.name}
          },
          element,
          function (err, specialty, created) {
            if(err) throw(err);
            if(created){
              console.log('Created specialty: ', specialty.name);
              specialty.doctors.create(
                doctors[index],
                function (err, doctor) {
                  if(err) throw(err);
                  console.log('Created doctor: ', doctor.username);
                  role.roleMappings.create({
                    principalType: RoleMapping.USER,
                    principalId: doctor.id
                  },
                  function(err, principal){
                    if(err) throw(err);
                    console.log('Doctor: ', doctor.username, ' and Role: ', role.name, ' related');
                  });
                }
              );
              specialty.doctors.create(
                doctors[index+6],
                function (err, doctor) {
                  if(err) throw(err);
                  console.log('Created doctor: ', doctor.username);
                  role.roleMappings.create({
                    principalType: RoleMapping.USER,
                    principalId: doctor.id
                  },
                  function(err, principal){
                    if(err) throw(err);
                    console.log('Doctor: ', doctor.username, ' and Role: ', role.name, ' related');
                  });
                }
              );
            }
            else
              console.log('Found specialty: ', specialty.name);
          });
        });
      }
      else
        console.log('Found role:', role.name);
    });
  
  });
  
}