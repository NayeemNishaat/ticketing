import mongoose from "mongoose";

// Note: An interface that describes the properties that are required to create a new User
interface userAttrs {
  email: string;
  password: string;
}

// Note: An interface that describes the properties that a User Model has
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

// Note: An interface that describes the properties that a User Document has
interface userDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string;
  // updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Note: For type checking we will use this static method
userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
}; // Note: This is how we add a custom function to a mongoose model. This function will be available on the model itself and not on the document.

const User = mongoose.model<userDoc, userModel>("User", userSchema);

export { User };
