import mongoose from 'mongoose';

const fundSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const investmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const expenseSchema = mongoose.Schema(
  {
    fund: [fundSchema],
    investment: [investmentSchema],
    amount: Number,
    expense: Number,
    fees: Number,
    percent: Number,
    shares: Number,
    shareprice: Number,
    currentestimatedvalue: Number,
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

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
