import * as angular from "angular";
import * as moment from 'moment';

export class openHourCtrl {
	static $name = "openHourCtrl";
	public openingHourData: Array<any>;
	public test = "sfj";

	constructor(private $http: angular.IHttpService) {
		let hours = (<any>moment.duration(64800, "second")).format("h:mm");
		this.$http
			.get('app/openingHour.json')
			.then((response) => {
				// console.log("response", response);
				this.openingHourData = this.readData(response.data);
				console.log("dat", this.openingHourData);
			})
			.catch((err) => {
			})
	}

	public readData(data){
		// console.log(data);
		var hourList: Array<any> = [];
		angular.forEach(data, (val, key)=>{
			// console.log("key, val", key, val);
			let test = this._elementRead(val);
			// console.log("test", test);
			let item = {
				'day': key,
				'openTime': this._elementRead(val)
			};

			hourList.push(item);
		});
		 console.log("hourList", hourList);
		return hourList;
	}

	private _elementRead(val){
		// console.log("val", val);
		var period: Array<string> = [];
		if(!val || val.length < 1){
			// console.log("return?");
			return "close";
		}

		let pairHours = this._pairSlicer(val);

		pairHours.forEach((item) => {
			let timeElement = this._timeCalculator(item[0].value) + "-" + this._timeCalculator(item[1].value)
			period.push(timeElement);
			// console.log("period", period, timeElement);
		});

		return period;
	}

	private _pairSlicer(rawArray){
		var temp = rawArray.slice();
		var pairArray = [];

		while (temp.length) {
			pairArray.push(temp.splice(0, 2));
		}
		return pairArray;
	}

	private _timeCalculator(time){
		if(time > 43200){
			let hours = (<any>moment.duration((time - 43200), "second")).format("h:mm");
			return hours + " pm";
		}else{
			let hours = (<any>moment.duration((time), "second")).format("h:mm");
			return hours + " am";
		}
	}

}
