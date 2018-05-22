// fuel-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const fuel = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    uniqueDesign: { type: String, required: true },
    purpose: { type: String, required: true },
    passions: { type: String, required: true },
    causes: { type: String, required: true },
    inspirations: { type: String, required: true },
    hopes: { type: String, required: true },
    stirring: { type: String, required: true },
    invest: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('fuel', fuel);
};
