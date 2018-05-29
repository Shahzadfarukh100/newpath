// journey-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const addChange = new Schema({
    add: { type: String, required: true },
    change: { type: String, required: true }
  });

  const journey = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    keyStatement: { type: String, required: true },
    faith: { type: String, required: true },
    relationships: { type: String, required: true },
    character: { type: String, required: true },
    health: { type: String, required: true },
    finances: { type: String, required: true },
    vocation: { type: String, required: true },
    perfectDay: { type: String },
    changeHabits: { type: addChange },
    strengths: { type: String },
    positiveHabits: { type: String },
    negativeHabits: { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('journey', journey);
};
