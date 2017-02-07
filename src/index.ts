import * as angular from 'angular';

import { schedule } from './app/openingHour.cmp';
import 'angular-ui-router';
import 'moment/moment.js';
import 'angular-moment/angular-moment.js';
import "moment-duration-format/lib/moment-duration-format.js";

import routesConfig from './routes';

import './style/index.scss';

export const app: string = 'app';

angular
	.module(app, ['ui.router', 'angularMoment'])
  	.config(routesConfig)
	.component('app', schedule);
