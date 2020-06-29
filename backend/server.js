const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// const newUsersRouter = require('./routes/signUp');
// const usersRouter = require("./routes/users");
// const typesRouter = require("./routes/types");
// const medsRouter = require("./routes/medicines");

// app.use('/new_users', newUsersRouter);
// app.use('/users', usersRouter);
// app.use('/types', typesRouter);
// app.use('/meds', medsRouter);
const userRouter = require('./routes/users');
const signUpRouter = require('./routes/signUp');
const signInRouter = require('./routes/signIn');
const logOutRouter = require('./routes/logOut');

app.use('/user', userRouter);
app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/logout', logOutRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});