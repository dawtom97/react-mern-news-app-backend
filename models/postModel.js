import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  area: String,
  selectedFile: String,
  legitCount: {
    type:[String],
    default: [],
  },
  fakeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lon: Number,
  lat: Number,
});

export const Post = mongoose.model("Post", postSchema);
