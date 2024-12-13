import { Schema, Document, model } from 'mongoose';
import Reaction from "./Reaction.js"


interface IThought extends Document {
  thoughtText: string;
  username: string;
  createdAt: Date;
  reactions: typeof Reaction[];
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText:{
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the thought's reaction count
thoughtSchema
  .virtual('reactionCount')
  .get(function (this: any) {
    return this.reactions.length;
  })

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

export default Thought
