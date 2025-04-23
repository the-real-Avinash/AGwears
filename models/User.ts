import mongoose, { Schema, Document, models, model } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Never return password in queries by default
  },
  avatar: {
    type: String,
    default: "", // Can store a URL to user profile image
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// 🔐 Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default models.User || model<IUser>("User", UserSchema);
