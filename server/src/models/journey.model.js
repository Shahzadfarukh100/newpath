// journey-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const journey = new Schema({
    userId: { type: Schema.Types.ObjectId },
    keyStatement: { type: String },
    faith: { type: String },
    relationships: { type: String },
    character: { type: String },
    health: { type: String },
    finances: { type: String },
    vocation: { type: String },
    perfectDay: { type: String },
    addHabits: { type: String },
    changeHabits: { type: String },
    strengths: { type: String },
    positiveHabits: { type: String },
    negativeHabits: { type: String },
    status: { type: String, enum: ['Complete', 'Incomplete'], required: true, default: 'Incomplete' }
  }, {
    timestamps: true
  });

  return mongooseClient.model('journey', journey);
};
