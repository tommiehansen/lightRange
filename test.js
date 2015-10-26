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
	var monthData=function(year,month){var date=new Date(year,month,0);this.totalDays=date.getDate();this.endDay=date.getDay();date.setDate(0);this.startDay=date.getDay(0);this.days=[];this.nextMonthStart=false;var prevMonthDays=0;if(this.startDay!==0)prevMonthDays=(new Date(year,month-1,0)).getDate()-this.startDay;var count=0;for(var i=0;i<42;i++){var day={};if(i<this.startDay)day.date=prevMonthDays=prevMonthDays+1;else if(i>this.totalDays+(this.startDay-1)){day.date=count=count+1;if(!this.nextMonthStart)this.nextMonthStart=i}else day.date=i-this.startDay+1;this.days[this.days.length]=day.date}};
	
	
	/* monthdata wihout previous/next months 
	var monthData = function(year, month) {
		var date = new Date(year, month, 0);
		this.totalDays = date.getDate();
		this.endDay = date.getDay();
		date.setDate(0);
		this.startDay = date.getDay(0);
		this.days = [];
		this.nextMonthStart = false;
		var prevMonthDays = 0;
		//if (this.startDay !== 0) prevMonthDays = (new Date(year, month - 1, 0)).getDate() - this.startDay;
		var count = 0;
		for (var i = 0; i < 42; i++) {
			var day = {};
			if (i < this.startDay) day.date = ''; //day.date = prevMonthDays = prevMonthDays + 1;
			else if (i > this.totalDays + (this.startDay - 1)) {
				//day.date = count = count + 1;
				day.date='';
				if (!this.nextMonthStart) this.nextMonthStart = i
			} else day.date = i - this.startDay + 1;
			this.days[this.days.length] = day.date
		}
	};
	*/
	
	// year, month, mainSelector to append to
	function getMonth(year, month, main, numCalendar){
		numCalendar = numCalendar||1; // number or just 1
		
		// BASE VARs / VAR cache
		var ni = 0,
			i = 0,
			monthNice,
			dayNice,
			m,
			days,
			startDay,
			endDay,
			totalDays,
			nextMonth,
			nextMonthStart,
			nextYear,
			curDate,
			key,
			out = '';
			
		// begin loop
		for(ni;ni<numCalendar;ni++){
			
			// increase month
			month++;
			if(month === 13) { month=1; year++; }
			
			// month data
			m = {};
			monthData.call(m, year, month); // returns object to m, wants 1-12 index
			
			// SET VARs
			days			= m.days;
			startDay		= m.startDay;
			endDay			= m.endDay;
			totalDays		= m.totalDays;
			nextMonthStart 	= m.nextMonthStart;
			monthNice 		= monthArr[month-1]; // zero-based index
			
			
			if(month > 12) { nextMonth = 1; nextYear = year+1; } else { nextMonth=month; nextYear = year; }
			
			
			// BEGIN out
			out += '<div class="r_month">';
			out += '<em class="r_title">' + monthNice + ' <span>' + year + '</span></em>';
			out += '<table>';
					
				// weekdays
				out += '<thead><tr>';
				_for(dayArr, function(e){ out += '<td>' + e + '</td>'; })
				out += '</tr></thead>';
					
				// days
				out += '<tbody>';
				for(key in days){
					
					i++;
					curDate = nextYear + '-' + nextMonth + '-' + days[key];
					
					// start row
					if(i === 1) out += '<tr>';					
					
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
							
							out += '<td class="notCurMonth" data-date="'+ curDate +'"><i>'+days[key]+'</i></td>';
							
						}
						
						// the rest, current month
						else {
							out += '<td data-date="'+ curDate +'"><i>'+days[key]+'</i></td>';
						}
					

					// end row
					if(i === 7) { out += '</tr>'; i=0; }
					
				}
				out += '</tbody>';
			out += '</table>';
			out += '</div>'; // end r_month
			

			
			
			
			
			
			// LOG LOG LOG
			if(ni<4){
				
				//console.log( monthNice );
				//console.log(m);
			}
			
		} // end loop
		
		$('#dp').html(out);
		
		/*
		
		var days = m.days,
			startDay = m.startDay,
			endDay = m.endDay,
			totalDays = m.totalDays,
			nextMonthStart = m.nextMonthStart,
			len = days.length,
			key, str = '', i=0;
		
		
		// weekdays
		str += '<table>';	
		str += '<thead><tr>';
		_for(dayArr, function(e){ str += '<td>' + e + '</td>'; })
		str += '</tr></thead></tbody>'
		
		// table cells
		var curDate;
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
		
		
		var table = main.querySelectorAll('table');
		
		$(main).html(str);
	
	*/
	
	} // getMonth() end
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*-----------------------------------------------------

		INIT ON LOAD

	-----------------------------------------------------*/
	
	
	
	// init on load
	var main = _id('dp'); // datePicker main div
		
	var now = new Date()
	var month = now.getMonth(),
		date = now.getDate(),
		year = now.getFullYear(),
		totalMonths = 24;
		
	// getmonth year, month, mainSelector, number of months
	getMonth(year, month, main, totalMonths);
	
	
	
	
	
	
	/*-----------------------------------------------------

		BINDS

	-----------------------------------------------------*/
	

	$(main).on('click', 'tbody td', function(){ userSelect(this, main); });
	
	var rNav = $('#r_nav'),
		dp = _id('dp');
	
	rNav.on('click', '.nav', function(e){
		
		var curX,
			curId = this.id;
			
		if( dp.className == '' ) { curX = 0; dp.className = 0; }
		else {
			curX = dp.className;
			curX = parseInt(curX);
		}
		
		var len = totalMonths;
			len = (len/2)-1+'00';
			len = '-' + len
		
		if(curId == 'next' && curX > len ){
			curX = curX-50;
			_id('prev').classList.remove('off');
		}
		else if(curId == 'next' && curX <= len) {
			this.classList.add('off');
		}
		
		if(curId == 'prev' && curX < 0 ){
			curX = curX+50;
			_id('next').classList.remove('off');
			
		}
		else if(curId == 'prev' && curX > len) {
			this.classList.add('off');
		}
		
		// 12/2 = 6 views total.
		// 6 = @ 600% the views are gone!
		// (12/2)-1+'00%' = max slide
		
		dp.style.transform = 'translateX(' + curX + '%)';
		dp.className = curX;

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
			break;
		case arrow.down:
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