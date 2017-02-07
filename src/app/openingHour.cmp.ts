import {openHourCtrl} from "./openingHour.ctrl";

export const schedule: angular.IComponentOptions = {
  template: require('./openingHour.html'),
  controller: openHourCtrl,
  controllerAs: "hourVm"
};
