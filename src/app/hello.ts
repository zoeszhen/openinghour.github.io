import {openHourCtrl} from "./openingHour.ctrl";

export const hello: angular.IComponentOptions = {
  template: require('./hello.html'),
  controller: openHourCtrl,
  controllerAs: "hourVm"
};
