// users-model.js - The users model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    title: { type: String, required: true },
    mbtiType: { type: String, enum: [
      'INTJ', 'INTP', 'ENTJ', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'
    ] },
    roles: { type: [String], enum: ['member', 'admin'], default: 'member' }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
