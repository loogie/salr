// Example model


var thinky = require('../config/thinky'),
  r = thinky.r,
  type = thinky.type;

var User = thinky.createModel('User', {
  id: type.string().default(r.uuid()),
  name: type.string(),
  local: {
    name: type.string(),
    pwd: type.string(),
    email: type.string(),
  }
});

User.ensureIndex("id");

module.exports = User;

// example on how to add relations
// var Comment = require('./comment');
// Article.hasMany(Comment, 'comments', 'id', 'article_id');
