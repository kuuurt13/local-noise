import 'babel-polyfill';
import 'datejs';
import express from 'express';
import bodyParser from 'body-parser';

/* Configs */
import appConfig from './configs/app';

/* Routes */
import moduleRoutes from './modules/module.routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
