import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema(
  {
    fund: String,
    investment: String,
    amount: Number,
    expense: Number,
    fees: Number,
    percent: Number,
    shares: Number,
    shareprice: Number,
    currentestimatedvalue: Number,
    user: {
      type: mongoose.Schema.Type.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
