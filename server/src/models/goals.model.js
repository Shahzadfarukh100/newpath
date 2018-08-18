// goals-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const goals = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    faith: { type: String },
    relationships: { type: String },
    character: { type: String },
    health: { type: String },
    finances: { type: String },
    vocation: { type: String },
    traitsFriends: { type: String },
    traitsAgree: { type: String },
    traitsSuprised: { type: String },
    roleModels: { type: String },
    burdens: { type: String },
    keyStatement: { type: String },
    status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete', required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('goals', goals);
};
