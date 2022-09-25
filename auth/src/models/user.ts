import mongoose from "mongoose";
import { Password } from "../services/password";

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

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    // Note: isModified is true when the password is changed/created else false.
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
}); // Note: Using function instead of arrow function because we need to use 'this' keyword to point to user document not the current context.

// Note: For type checking we will use this static method
userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
}; // Note: This is how we add a custom function to a mongoose model. This function will be available on the model itself and not on the document.

const User = mongoose.model<userDoc, userModel>("User", userSchema);

export { User };
