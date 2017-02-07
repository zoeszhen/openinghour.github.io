import * as angular from "angular";
import * as moment from 'moment';

export class openHourCtrl {
	static $name = "openHourCtrl";
	public openingHourData: Array<any>;
	//@ngInject
	constructor(private $http: angular.IHttpService) {
		//get json file through http
		this.$http
			.get('app/openingHour.json')
			.then((response) => {
				//read response data
				this.openingHourData = this.readData(response.data);
			})
			.catch((err) => {
			})
	}
	//read the raw data and arrange data into a new datastracture make it easy to read
	//hourList = [
	// 	{
	// 		day: "weekdays";
	// 		openTime: ["timeRage"]
	// 	}
	// ]
	public readData(data): any{
		var hourList: Array<any> = [];
		angular.forEach(data, (val, key)=>{
			// push each day's opening data object into array
			hourList.push({
				'day': key,
				'openTime': this._elementRead(val)
			});
		});
		//return the new arrange data
		return hourList;
	}

	private _elementRead(val): any{
		var period: Array<string> = [];
		//if the array is empty or length less than 1 then it is close
		//no need to go through anymore
		if(!val || val.length < 1){
			return ["close"];
		}
		//slice the array into open and close pair
		let pairHours = this._pairSlicer(val);

		pairHours.forEach((item) => {
			let timeElement = this._timeCalculator(item[0].value) + " - " + this._timeCalculator(item[1].value);
			period.push(timeElement);
		});
		//return the time period set 
		return period;
	}

	//slice the array into open and close pair set
	private _pairSlicer(rawArray): any{
		var temp = rawArray.slice();
		var pairArray = [];

		while (temp.length) {
			pairArray.push(temp.splice(0, 2));
		}
		//return the open and close pair
		return pairArray;
	}

	//calculate seconds into hours
	//function using moment.js to calculate
	private _timeCalculator(time): string{
		//max seconds value is 86399 that means 11.59:59pm ≈ 12am
		if (time >= 86399){
			return "12:00 AM"
		}
		//if it is over 12hours (43200), then set it to pm
		if(time > 43200){ 
			let hours = (<any>moment.duration((time - 43200), "second")).format("HH:mm");
			return hours + " PM";
		}else{
		//otherwise then set it to am	
			let hours = (<any>moment.duration((time), "second")).format("HH:mm");
			return hours + " AM" ;
		}
	}
	//check if restaurant is open now
	//return the boolean
	public isOpen(timeArray, day): boolean {
		let nameOfToday = moment().format('dddd');
		//if it is close or not today's name 
		//return false
		if (timeArray[0] === "close" || nameOfToday.toLowerCase() !== day) {
			return false;
		}

		var now = moment();
		let periodSet = timeArray.split(" - ");
		// return if it is open 
		return now.isBetween(moment(periodSet[0], 'HH:mm a'), moment(periodSet[1], 'HH:mm a'));
	
	}
	
	//check if it is able to make a reservation
	public ableToReserve(time): string{
		if(time[0] === "close"){
			return "We are closing today";
		}
		return "Make a reservation";
	}

}
