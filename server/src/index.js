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

/* Register Routes */
moduleRoutes.forEach(ctrl => {
  const url = [appConfig.apiUrl, ctrl.url].join('');

  ctrl.routes.forEach(route => {
    app.use(url, route);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
