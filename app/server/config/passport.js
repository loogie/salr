const JsonStrategy = require('passport-json').Strategy;
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');

module.exports = function(passport){

  // methods ======================
  // generating a hash
  const generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  const validPassword = function(user, password) {
      return bcrypt.compareSync(password, user.local.pwd);
  };

  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    User.filter({id: id}).run().then((users)=>{
      done(null, users[0]);
    })
    .catch((err)=>{
      done(err, null);
    })
  });

  passport.use('local-signup', new JsonStrategy({
      usernameProp : 'username',
      passwordProp : 'pass',
      passReqToCallback: true
    },(req, username, pass, done)=>{

      User.filter({local:{name: username}}).run().then((matches)=>{
        if (matches.length > 0){
          console.log("USERNAME TAKEN");
          console.log(JSON.stringify(matches));
          return done("Username is already taken", null);
        }

        console.log("CREATING NEW USER");
        let newUser = new User({
          displayName: username,
          local: {
            name: username,
            pwd: generateHash(pass),
            email: req.body.email
          }
        });

        console.log("SAVING NEW USER");
        newUser.saveAll().then((user)=>{
          console.log("NEW USER SAVED");
          return done(null, user);
        })
        .catch((err)=>{
          console.log("Error saving new user");
          console.log(err);
          return done(err, null);
        });
      })
      .catch((err)=>{
        console.log("Error searching users");
        console.log(err);
        return done(err, null);
      })
    })
  );

  passport.use('local-login', new JsonStrategy({
      usernameField: 'username',
      passwordField: 'pass',
      passReqToCallback: true
    },(req, username, pass, done)=>{
      console.log("LOGGING IN USER");
      User.filter({local:{name: username}}).run().then((matches)=>{
        if (matches.length > 0){
          for (let i = 0; i < matches.length; i++){
            let user = matches[i];

            if (validPassword(user, pass)) {
              return done(null, user);
            }
          }

          return done("User/password match not found", null);
        }
        else {
          return done("User/password match not found", null);
        }
      })
      .catch((err)=>{
        console.log("Error searching users");
        console.log(err);
        return done(err, null);
      });
    })
  );
}
