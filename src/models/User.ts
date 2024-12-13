import { Schema, Document, model, ObjectId } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the user's friend count
userSchema
  .virtual('friendCount')
  .get(function (this: any) {
    return this.friends.length;
  })

// Initialize our User model
const User = model('user', userSchema);

export default User
