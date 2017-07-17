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

  passport.use('signup', new JsonStrategy({
      usernameProp: 'username',
      passwordProp: 'password',
      passReqToCallback: true
    },(req, username, password, done)=>{
      console.log("SIGNING UP USER");
      User.filter({local:{name: username }}).run().then((matches)=>{
        if (matches.length > 0){
          console.log("USERNAME ALREADY FOUND");
          return done({success:false, message: "username already taken"}, null);
        }
        else {
          let newUser = new User({
            displayName: username,
            local: {
              name: username,
              pwd: generateHash(password)
            }
          });

          newUser.saveAll().then((user)=>{
            console.log("USERNAME CREATED");
            return done(null, user);
          }).catch((err)=>{
            console.log(err);
            return done({success:false, message: err.message}, null);
          })
        }
      })
    })
  );

  passport.use('local', new JsonStrategy({
      usernameProp: 'username',
      passwordProp: 'password',
      passReqToCallback: true
    },(req, username, password, done)=>{
      console.log("LOGGING IN USER");
      User.filter({local:{name: username}}).run().then((matches)=>{
        if (matches.length > 0){
          for (let i = 0; i < matches.length; i++){
            let user = matches[i];

            if (validPassword(user, password)) {
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
