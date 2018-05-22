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
    threats: { type: String, required: true },
    solutions: { type: String, required: true },
    relationships: { type: String, required: true },
    strengthen: { type: String, required: true },
    character: { type: String, required: true },
    improveChar: { type: String, required: true },
    hinderChar: { type: String, required: true },
    improveHealth: { type: String, required: true },
    hinderHealth: { type: String, required: true },
    finances: { type: String, required: true },
    impulse: { type: String, required: true },
    vocationGoal: { type: Boolean, required: true },
    vocationGoalExplained: { type: String },
    goalThreats: { type: String, required: true },
    focusItems: { type: String, required: true },
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
