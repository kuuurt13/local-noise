import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';

import config from './config/app';
import moduleRoutes from './modules/module.routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

moduleRoutes.forEach(ctrl => {
  const url = [config.apiUrl, ctrl.url].join('');

  ctrl.routes.forEach(route => {
    app.use(url, route);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
