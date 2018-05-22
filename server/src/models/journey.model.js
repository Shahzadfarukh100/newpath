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
    accomplishments: { type: String, required: true },
    faith: { type: String, required: true },
    strengthen: { type: String, required: true },
    character: { type: String, required: true },
    habits: { type: String, required: true },
    spending: { type: String, required: true },
    activities: { type: String, required: true },
    perfectDay: { type: String, required: true },
    changeHabits: { type: addChange, required: true },
    strengths: { type: String, required: true },
    positiveHabits: { type: String, required: true },
    negativeHabits: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('journey', journey);
};
