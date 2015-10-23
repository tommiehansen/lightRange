if(window.ActiveXObject || "ActiveXObject" in window){
	alert('bad browser detected.');
}

// INIT
;(function($, window, document, undefined) {

	'use strict';

	// helpers
	function _id(e) { return document.getElementById(e); }
	function _e(e) { return document.querySelector(e); }
	function _ee(e) { return document.querySelectorAll(e); }
	function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ f(e[i]); }}
	function log(e, before) { before=before||''; console.log(before+e); }
	
	
	// default stuff : get from data-values later on (even though slower)
	var monthArr	= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var dayArr		= ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var dayLongArr	= ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var month, year;
	
	
	
	// add dates to output
	function lurker(date,fromTo){
		
		var main = _id('fromTo'),
			y, m, d, day, cur, mNice, dayNice;
		
		
		// check if we're not resetting the texts
		if(date !== 'reset'){
			
			fromTo=fromTo||'from'; // default = from
			
			// BASE DATE + VARs
			var date = new Date(date);
				
			y = date.getFullYear().toString();
			m = date.getMonth();
			d = date.getDate().toString();
			day = date.getDay();
			
			mNice = monthArr[m] + ' ' + y;
			dayNice = dayLongArr[day];
			
			if( fromTo == 'from' ){
				cur = _id('dateFrom');
				_id('dateTo').classList.remove('off');
			} else { cur = _id('dateTo'); }
			
		}
		else {
			cur = main;
			d='';
			mNice = 'Select a date'; // make this multi-lang capable via data-attributes
			dayNice = '';
			
			_id('dateTo').classList.add('off');
		}
		
		// Text selectors
		var $cur = $(cur);
		var r_date 		= $cur.find('.r_date'),
			r_monthYear = $cur.find('.r_monthYear'),
			r_day		= $cur.find('.r_day');
			
			
		// Set texts
		r_date.text(d);
		r_monthYear.text(mNice);
		r_day.text(dayNice);
		
		
	}
	
	
	/*-----------------------------------------------------

	USER SELECT ACTION

	-----------------------------------------------------*/
	
	var firstSelect = {};
	function userSelect(e,main){
		
		var	sel1 = _id('sel1'),
			sel2 = _id('sel2');
			
		// first selection doesn't exist
		if( sel1 === null ){
			e.id = 'sel1';
			e.classList.add('sel1');
			lurker( e.getAttribute('data-date'));
		}
		
		// first exist but not second
		else if( sel2 === null && e.id !== 'sel1' ){ // prevent making #2 to #1
			e.id = 'sel2';
			e.classList.add('sel2');
			
			// set texts
			lurker( e.getAttribute('data-date'), 'to');
				
			// selection is complete
			var par = e.parentNode,			// tr
				parPar = main;				// tbody (main)
				
				var td = main.querySelectorAll('td'),
					go = false,
					stop = false,
					i=0,
					s1i=0,
					s2i=999;
			
			_for(td, function(e){
				i++;
				
				if( e.id == 'sel1' ) { go=1; s1i = i; }
				if( e.id == 'sel2' ) { stop=1; s2i = i; }
				
				if( s1i < s2i && go ){
					if(go){ e.classList.add('range'); }
				} 
				if(stop){ go=0; }
				
			})			
			
			
		}
		
		// both selections exist
		else {
			lurker('reset');
			var td = main.querySelectorAll('td');
			_for(td, function(e){ e.classList.remove('range'); })
			sel1.classList.remove('sel1');
			sel1.id='';
			if(sel2 !== null){
				sel2.classList.remove('sel2');
				sel2.id='';
			}
		}
		
	}

	
	
	
	
	
	
	
	
	
	/*-----------------------------------------------------
		
		GET MONTH DATA
		Fork of github thingy
		
	-----------------------------------------------------*/


	// month info,fork off of github
	var monthInformation=function(year,month){var date=new Date(year,month,0);this.totalDays=date.getDate();this.endDay=date.getDay();date.setDate(0);this.startDay=date.getDay(0);this.days=[];this.nextMonthStart=false;var prevMonthDays=0;if(this.startDay!==0)prevMonthDays=(new Date(year,month-1,0)).getDate()-this.startDay;var count=0;for(var i=0;i<42;i++){var day={};if(i<this.startDay)day.date=prevMonthDays=prevMonthDays+1;else if(i>this.totalDays+(this.startDay-1)){day.date=count=count+1;if(!this.nextMonthStart)this.nextMonthStart=i}else day.date=i-this.startDay+1;this.days[this.days.length]=day.date}};
	
	
	// year, month, mainSelector to append to
	function getMonth(year, month, main){
		var m = {};
		monthInformation.call(m, year, month); // returns object to m
		
		var days = m.days,
			startDay = m.startDay,
			endDay = m.endDay,
			totalDays = m.totalDays,
			nextMonthStart = m.nextMonthStart,
			len = days.length,
			key, str = '', i=0;
	
		// table header
		var nextMonth, nextYear; // support double calendar view
		if(month > 12) { nextMonth = 1; nextYear = year+1; } else { nextMonth=month; nextYear = year; }
		_id('month').innerHTML = monthArr[month-2] + '<span class="hideDesk"> ' + year + '</span><span class="hideSmall"> &mdash; ' + monthArr[nextMonth-1] + ' ' + nextYear +'</span>'; // month-array is zero-based index
		str += '<table>';	
		str += '<thead><tr>';
		_for(dayArr, function(e){ str += '<td>' + e + '</td>'; })
		str += '</tr></thead></tbody>'
		
		var curDate;
		// table cells
		for(key in days){
			i++;
			
			curDate = nextYear + '-' + nextMonth + '-' + days[key];

			if(i === 1) str += '<tr>';
			
			// not in current month
			if( key < startDay || ( key >= nextMonthStart ) )  {
				
				switch(true){
					case key < startDay && nextMonth != 1:
						curDate = nextYear + '-' + (nextMonth-1) + '-' + days[key];		// previous month = month-1
						break;
					case key < startDay && nextMonth == 1:
						curDate = (nextYear-1) + '-' + 12 + '-' + days[key];		// previous month is december the year before
						break;
					case key >= nextMonthStart && nextMonth != 12:
						curDate = nextYear + '-' + (nextMonth+1) + '-' + days[key];		// next month = month+1
						break;
					case key >= nextMonthStart && nextMonth == 12:
						curDate = nextYear+1 + '-' + 1 + '-' + days[key];			// next month is january next year
						break;
				}
				
				str += '<td class="notCurMonth" data-date="'+ curDate +'"><i>'+days[key]+'</i></td>';
			}
			
			// the rest
			else { str += '<td data-date="'+ curDate +'"><i>'+days[key]+'</i></td>'; }
			
			if(i === 7) { str += '</tr>'; i=0; }

		}
		str += '</tbody></table>';
		
		
		//appendMonth(main, str);
		
		
		var table = main.querySelectorAll('table');
		
		if( table.length === 0 ){
			$(main).html(str);
			
			// get another calendar
			month=month+1;
			getMonth(year, month, main);
		}
		
		// table exist
		else {
			$(main).append(str);
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*-----------------------------------------------------

		INIT ON LOAD

	-----------------------------------------------------*/
	
	
	
	// init on load
	var main = _id('dp'); // datePicker main div
		
	var now = new Date();
	var month = now.getMonth()+1, // getMonth() wants non-zero-based index
		date = now.getDate(),
		year = now.getFullYear();
		
	getMonth(year, month, main, 2); // year, month, mainSelector, number of calendars
	
	
	
	
	
	
	
	
	
	
	/*-----------------------------------------------------

		BINDS

	-----------------------------------------------------*/
	

	$(main).on('click', 'tbody td', function(){ userSelect(this, main); });
	
	var disp = $('#disp');
	disp.on('click', '.nav', function(){
		
		main.innerHTML = '';
		if(this.id == 'next'){ month++; }
		else { month--; }
		
		if(month > 12) { month=1; year++; }
		if(month < 1) { month=12; year--; }
		
		// get month
		getMonth(year, month, main);

	})
	
	$(document).on('keydown', function(e){
		
		var keyCode = e.keyCode || e.which,
			arrow = {left: 37, up: 38, right: 39, down: 40 };
			
		switch (keyCode) {
		case arrow.left:
			$(_id('prev')).trigger('click');
			e.preventDefault();
			break;
		case arrow.right:
			$(_id('next')).trigger('click');
			e.preventDefault();
			break;
		case arrow.up:
			year++;
			month--;
			$(_id('next')).trigger('click');
			e.preventDefault();
			break;
		case arrow.down:
			year--;
			month--;
			$(_id('next')).trigger('click');
			e.preventDefault();
			break;
		}
		
		
		
	})
	
	
	
	
	/*
	var tip=null;
	// TEMP HOVER TO SHOW DATA-DATE
	$(main).on('mouseenter', 'tbody td', function(){
		
		var d = this.getAttribute('data-date');
		this.innerHTML += '<div id="tip" class="tip">'+d+'</div>';
		tip = _ee('.tip');
		
	})
	.on('mouseleave', 'tbody td', function(){
		$(tip).remove();
	});
	*/
	
	


})(jQuery, window, document); // end() init