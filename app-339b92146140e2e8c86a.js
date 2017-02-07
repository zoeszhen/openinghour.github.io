webpackJsonp([0],{408:function(t,e){},409:function(t,e,n){"use strict";var r=n(788);e.schedule={template:n(632),controller:r.openHourCtrl,controllerAs:"hourVm"}},410:function(t,e,n){"use strict";function r(t,e,n){n.html5Mode(!0).hashPrefix("!"),e.otherwise("/"),t.state("app",{url:"/",component:"app"})}r.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],e.__esModule=!0,e.default=r},632:function(t,e){t.exports='<div class="container">\n\t<div class="row">\n\t\t<h1>\n\t\t\tOpening Hours\n\t\t</h1>\t\t\n\t</div>\n\t<div class="row">\n\t\t<div class="col-md-8 center-block">\n\t\t\t<ul class="list-group" ng-repeat="item in hourVm.openingHourData">\n\t\t  \t\t<li class="list-group-item hour-list-item">\n\t\t  \t\t\t<div class="row">\n\t\t  \t\t\t\t<div class="col-md-5">\n\t\t  \t\t\t\t\t<h2>{{item.day | uppercase}}</h2> \n\t\t  \t\t\t\t</div>\n\t\t  \t\t\t\t<div class="col-md-7">\n\t\t\t  \t\t\t\t<h3 ng-repeat="time in item.openTime">\n\t\t\t  \t\t\t\t\t{{time}}\n\t\t\t\t  \t\t\t\t<span class="open-now" ng-show="hourVm.isOpen(time, item.day)">\n\t\t\t\t  \t\t\t\t\tOpen Now!\n\t\t\t\t  \t\t\t\t</span>\n\t\t\t  \t\t\t\t</h3> \n\t\t\t  \t\t\t\t\n\t\t  \t\t\t\t</div>\n\t\t  \t\t\t\t<a class="overlay" href=# target="_blank" ><span class="make-reservation">{{hourVm.ableToReserve(item.openTime)}}</span></a>\n\t\t  \t\t\t</div>\n\t\t  \t\t</li>\n\t\t  \t</ul>\n\t\t</div>\n\t\t\n\t</div>\n  \t\n</div>'},788:function(t,e,n){"use strict";var r=n(58),o=n(0),a=function(){function t(t){var e=this;this.$http=t,this.$http.get("app/openingHour.json").then(function(t){e.openingHourData=e.readData(t.data)}).catch(function(t){})}return t.$inject=["$http"],t.prototype.readData=function(t){var e=this,n=[];return r.forEach(t,function(t,r){n.push({day:r,openTime:e._elementRead(t)})}),n},t.prototype._elementRead=function(t){var e=this,n=[];if(!t||t.length<1)return["close"];var r=this._pairSlicer(t);return r.forEach(function(t){var r=e._timeCalculator(t[0].value)+" - "+e._timeCalculator(t[1].value);n.push(r)}),n},t.prototype._pairSlicer=function(t){for(var e=t.slice(),n=[];e.length;)n.push(e.splice(0,2));return n},t.prototype._timeCalculator=function(t){if(t>=86399)return"12:00 AM";if(t>43200){var e=o.duration(t-43200,"second").format("HH:mm");return e+" PM"}var e=o.duration(t,"second").format("HH:mm");return e+" AM"},t.prototype.isOpen=function(t,e){var n=o().format("dddd");if("close"===t[0]||n.toLowerCase()!==e)return!1;var r=o(),a=t.split(" - ");return r.isBetween(o(a[0],"HH:mm a"),o(a[1],"HH:mm a"))},t.prototype.ableToReserve=function(t){return"close"===t[0]?"We are closing today":"Make a reservation"},t}();a.$name="openHourCtrl",e.openHourCtrl=a},846:function(t,e,n){"use strict";var r=n(58),o=n(409);n(114),n(0),n(113),n(115);var a=n(410);n(408),e.app="app",r.module(e.app,["ui.router","angularMoment"]).config(a.default).component("app",o.schedule)}},[846]);