// goals-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const traits = new Schema({
    traitsFriends: { type: String, required: true },
    traitsAgree: { type: String, required: true },
    traitsSuprised: { type: String, required: true },
    roleModels: { type: String, required: true },
    burdens: { type: String, required: true }
  });

  const goals = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    faith: { type: String, required: true },
    relationships: { type: String, required: true },
    character: { type: String, required: true },
    health: { type: String, required: true },
    finances: { type: String, required: true },
    vocation: { type: String, required: true },
    traits: { type: traits }
  }, {
    timestamps: true
  });

  return mongooseClient.model('goals', goals);
};
