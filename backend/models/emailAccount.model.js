import mongoose from 'mongoose';

const emailAccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['gmail', 'outlook', 'yahoo', 'icloud', 'custom'],
    default: 'gmail'
  },
  label: {
    type: String,
    trim: true
  },
  customHost: {
    type: String,
    trim: true
  },
  customPort: {
    type: Number,
    default: 993
  },
  tls: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastFetched: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
emailAccountSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const EmailAccount = mongoose.model('EmailAccount', emailAccountSchema);

export default EmailAccount;
