const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

console.log(PORT);

mongoose.connect('mongodb+srv://developer:BUgVjhMDhOUWmUWu@cluster0.9aocvfd.mongodb.net/test',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
const { authMiddleware } = require('./middleware/authMiddleware.js');

const { usersRouter } = require('./routers/userRouter.js');
const { authRouter } = require('./routers/authRouter');
const { charityProjectRouter } = require('./routers/charityProjectRouter');
const { warriorRehabilitationRouter } = require('./routers/warriorRehabilitationRouter');
const { helpRequestRouter } = require('./routers/helpRequestRouter');
const { feedbackRouter } = require('./routers/feedbackRouter');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(express.static('uploads'));
app.use(morgan('tiny'));

app.use('/api/users/me', authMiddleware, usersRouter);
app.use('/api/auth', authRouter);

app.use('/api/charityProject', authMiddleware, charityProjectRouter);
app.use('/api/warriorRehabilitation', authMiddleware, warriorRehabilitationRouter);
app.use('/api/helpRequest', authMiddleware, helpRequestRouter);
app.use('/api/feedback', authMiddleware, feedbackRouter);

const start = async () => {
  try {
    app.listen(PORT);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

// ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  res.status(500).send({ message: err.message });
}
