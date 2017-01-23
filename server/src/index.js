import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

/* Configs */
import appConfig from './configs/app';

/* Routes */
import moduleRoutes from './modules/module.routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

/* Register Routes */
moduleRoutes.forEach(ctrl => {
  const url = [appConfig.apiUrl, ctrl.url].join('');

  ctrl.routes.forEach(route => {
    app.use(url, route);
  });
});

app.listen(appConfig.port, function () {
  console.log(`App listening on port ${appConfig.port}`);
});
