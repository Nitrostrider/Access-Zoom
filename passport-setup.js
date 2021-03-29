const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  //make cookie smaller by only getting user.id
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //red use in case of db
  /*User.findById(id, function(err, user) {
    done(err, user);
  });*/
  done(null, user)
});

passport.use(new GoogleStrategy({
    clientID: "972449961830-sakibmep0cb48d23tssqqitt160tc29k.apps.googleusercontent.com",
    clientSecret: "qMpCE4meuIQwxnSPC0FiELZ6",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //red use the profule info (mainly profile id) to check if the user is registered in your db.  Not done in tutorial
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
    return done(null, profile);
  }
));