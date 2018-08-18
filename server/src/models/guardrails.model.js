// guardrails-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const keyStatement = new Schema({
    text: { type: String, required: true }
  });

  const guardrails = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    keyStatement: { type: String },
    faith: { type: String },
    relationships: { type: String },
    character: { type: String },
    health: { type: String },
    finances: { type: String },
    vocation: { type: String },
    goalThreats: { type: String },
    focusItems: { type: String },
    pitfalls: { type: String },
    encouragement: { type: String },
    tendencies: { type: String },
    agreements: { type: String },
    principles: { type: String },
    expectedOutcome: { type: String },
    status: { type: String, enum: ['Complete', 'Incomplete'], default: 'Incomplete', required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('guardrails', guardrails);
};
