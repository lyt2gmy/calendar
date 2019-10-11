/**
 * 生成简单的日历
 * 当前月份的日历
 * 
 * 备注：getCalendar 生成日历，可传入当前月份的号数，会高亮显示匹配的号数
 *  
 * author:Mike xia
 * time:2015-01-08
 */
var Calendar = {
	_today : new Date(),
	_date : new Date().getDate(),
	_day : new Date().getDay(),
	_month : new Date().getMonth() + 1,
	_year : new Date().getFullYear(),
	setDate:function(){
		this._date = new Date(this._today).getDate();
	},
	setDay:function(){
		this._day = new Date(this._today).getDay();
	},
	setMonth:function(){
		this._month = new Date(this._today).getMonth() + 1;
	},
	setYear:function(){
		this._year = new Date(this._today).getFullYear();
	},
	init:function(curDate){
		this._today = new Date(curDate);
		this.setDate();
		this.setDay();
		this.setMonth();
		this.setYear();
	},
	isLeap : function() {
		var year = this._year;
		if (year % 4 == 0 && year % 100 > 0) {
			return true;
		}
		if (year % 400 == 0 && year % 3200 > 0) {
			return true;
		}
		return false;
	},
	getLen : function() {
		if (this._month == 2) {
			if (this.isLeap()) {
				return 29;
			}
			return 28;
		}
		if (this._month < 8) {
			if (this._month % 2 > 0) {
				return 31;
			}
			return 30;
		}
		if (this._month % 2 > 0) {
			return 30;
		}
		return 31;
	},
	getCalendar : function(events) {
		var len = this.getLen();
		var d = new Date(this._year, this._month - 1, 1);
		var dfw = d.getDay();
		var arr = new Array();
		var tem = 0;
		var str = "";
		for (var i = 0; i < 6; i++) {
			arr[i] = new Array();
			for (var j = 0; j < 7; j++) {
				tem++;
				if (tem - dfw > 0 && tem - dfw <= len) {
					arr[i][j] = tem - dfw;
				} else {
					arr[i][j] = "";
				}
			}
		}
		
//		str += '<h4>'+this._year + '年' + this._month + '月'+ this._date + '日</h4>';//标题
		str += '<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">';
		str += '<thread><tr><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr></thread>';
		str += '<tbody>';
		for (var k = 0; k < 6; k++) {
			if (k == 5 && arr[k][0] == "")
				continue;
			str += '<tr>';
			for (var m = 0; m < arr[k].length; m++) {
				if(events.contains(arr[k][m])){
//					str += '<td class="red_tbg">' + arr[k][m] + '</td>';
					if(arr[k][m] == this._date){
						str += '<td class="cur_day red_tbg">' + arr[k][m] + '</td>';
					}else{
						str += '<td class="red_tbg">' + arr[k][m] + '</td>';
					}
				}else{
					//判断是否是当日
					if(arr[k][m] == this._date){
						str += '<td class="cur_day">' + arr[k][m] + '</td>';
						continue;
					}
					if(arr[k][m] == ""){
						str += '<td class="over">' + arr[k][m] + '</td>';
						continue;
					}
					str += '<td>' + arr[k][m] + '</td>';
				}
			}
			str += '</tr>';
		}
		str += '</tbody>';
		str += '</table>';
		return str;
	},
	nextMonth : function() {
		if (this._month == 12) {
			this._year++;
			this._month = 0;
		}
		this._month++;
	},
	nextYear : function() {
		this._year++;
	},
	previousMonth : function() {
		if (this._month == 1) {
			this._year--;
			this._month = 13;
		}
		this._month--;
	},
	previousYear : function() {
		this._year--;
	}
};

Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};
