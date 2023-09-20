import express, { json, urlencoded } from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import chalk from 'chalk';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { myContract } from './instance.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import eventRouter from './routes/scevents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

(async function () {
  console.log(chalk.bgBlue('Listening for Events...'));
  myContract.events.Issued().on('data', (event) => {
    console.log(chalk.bgRedBright('*****EVENT OCCURED*****'));
    console.log(event);
    console.log(chalk.bgRedBright('**********************'));
  });
})();

export default app;
