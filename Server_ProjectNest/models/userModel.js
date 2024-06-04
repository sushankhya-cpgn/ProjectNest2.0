const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const roles = require("../utils/userRoles");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "user must have an email"],
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    firstName: {
      type: String,
      required: [true, "user must have first name"],
    },
    lastName: {
      type: String,
      default: " ",
    },
    middleName: String,
    role: {
      type: String,
      required: [true, "user must have a role"],
      enum: {
        values: roles,
        message: `role must be one of: ${roles.join(", ")}`,
      },
      default: "student",
    },
    photo: {
      type: String,
      default: "default-user-photo.jpg",
    },
    password: {
      type: String,
      required: [true, "user must have a password"],
      minlength: [8, "password must have atlease 8 characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "please re-enter the password"],
      minlength: [8, "password must have atlease 8 characters"],
      validate: {
        //only validates on CREATE and SAVE not with UPDATE
        validator: function (val) {
          return this.password === val;
        },
        message: "password and confirm password did not match",
      },
    },
    isGoogleSignUp: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
      },
    ],
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    return JWTTimestamp < Date.parse(this.passwordChangedAt) / 1000;
  }
  return false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.isGoogleSignUp) {
    this.password = undefined;
    this.confirmPassword = undefined;
    next();
  }

  this.password = await bcrypt.hash(this.password, 12); //hash(string to hash, salt)
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
