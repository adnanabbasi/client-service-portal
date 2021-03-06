import mongoose from 'mongoose';

const profileSchema = mongoose.Schema(
  {
    address: String,
    ssn: String,
    image: String,
    isInvestor: {
      type: Boolean,
      required: true,
      default: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
