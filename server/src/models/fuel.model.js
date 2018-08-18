// fuel-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const fuel = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    uniqueDesign: { type: String },
    purpose: { type: String },
    passions: { type: String },
    causes: { type: String },
    inspirations: { type: String },
    hopes: { type: String },
    stirring: { type: String },
    invest: { type: String },
    keyStatement: { type: String },
    status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete', required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('fuel', fuel);
};
