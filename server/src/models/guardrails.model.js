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
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    keyStatements: { type: [keyStatement], required: true },
    faith: { type: String, required: true },
    relationships: { type: String, required: true },
    character: { type: String, required: true },
    health: { type: String, required: true },
    finances: { type: String, required: true },
    vocation: { type: Boolean, required: true },
    goalThreats: { type: String, required: true },
    focusItems: { type: String, required: true },
    encouragement: { type: String, required: true },
    pitfalls: { type: String, required: true },
    tendencies: { type: String, required: true },
    agreements: { type: String, required: true },
    principles: { type: String, required: true },
    expectedOutcome: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('guardrails', guardrails);
};
