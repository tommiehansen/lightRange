/*-----------------------------------------------------
*******************************************************
*****************************************************
	
	LIGHTRANGE
	Simple date range selection
	2016-01-28
	Tommie Hansen
	
*****************************************************
*******************************************************
-----------------------------------------------------*/

// INIT
;(function($, window, document, undefined) {
	
	'use strict';

	/* Start performance measurement */
	var perfStart = performance.now();
	
	/* Helpers */
	function _id(e) { return document.getElementById(e); }
	//function _e(e) { return document.querySelector(e); }
	//function _ee(e) { return document.querySelectorAll(e); }
	//function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ f(e[i]); }}
	function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ if(f(e[i]) === false) break; }}
	function _data(e,attr) { return e.getAttribute('data-' + attr); }
	// break-version for escaping loops via return false;
	
	
	/* Base VARs */
	var main =	_id('cal'),
		r_ovr = _id('r_ovr'),
		r_dp =	_id('r_dp'),
		r_actions = _id('r_actions'),
		r_nav = _id('r_nav'),
		isInit = false,
		curDate;
		
	/* BASE conf VARs */
	var dayLongArr,
		monthArr,
		dayArr;
	
	
	
	/*-----------------------------------------------------
	
	Begin rangeCal ns
	
	-----------------------------------------------------*/
	
	var rangeCal = {
		
		/* Init */
		init: function(field){
			
			// set arrays
			dayLongArr = _data(field, 'days').split(',');
			monthArr = _data(field, 'months').split(',');
			dayArr = [];
			
			var monthsNum = _data(field, 'monthsNum').split(','),
				offset = monthsNum[1],
				monthsNum = monthsNum[0];
				
			// create 3-letter days
			_for(dayLongArr, function(e){
				dayArr.push( e.substring(0, 3) );
			});
			
			// Bind field
			field.onclick = function(){
				rangeCal.show(monthsNum, offset);
			}
			
		},
		
		/* Show */
		show: function(monthsNum, offset){
			
			// add classes
			main.className = 'show';
			r_ovr.className = 'on';
			
			// use isInit to check if the calendar has already been triggered
			// else just show the calendar without re-processing month and binds
			if(!isInit){
				
				var now = new Date(),
					month = now.getMonth(), // note: getMonth = zero-based index
					year = now.getFullYear();
					
				// apply offset
				month = month + parseInt(offset);
				
				curDate = month + ',' + year;
				
				this.getMonth(monthsNum, curDate); // get month
				this.binds(monthsNum); // initiliaze all binds once
				isInit = 1;
			}
			
		},
		
		/* Hide */
		hide: function(){
			main.className = '';
		},
		
		/* Error */
		err: function(){},
		
		/* Hover Range */
		hoverRange: function(){},
		
		/* Navigation */
		nav: function(){},
		
		/* Binds */
		binds: function(monthsNum){
			
			// click day
			$(main).on('click', 'tbody td', function(){
				rangeCal.select(this);
			});
			
			// month navigation
			$(r_nav).on('click', '.nav', function(){ rangeCal.nav(this, monthsNum); } )
			
			// OK/Cancel buttons
			$(r_actions).on('click', 'button', function(){
				
				var ok = true;
				
				// Cancel
				if( this.className.indexOf('red') > -1 ){
					// reset form and close (or just close)
				}
				
				// OK button
				else {
					// validate selections
				}
				
				
				// close if OK
				if(ok) rangeCal.hide();
				
			})
			
		},
		
		/* Navigation */
		nav: function(e, monthsNum){
			
			var curX,
				curId = e.id;
			
			
			var cur, month, year;
			cur = curDate.split(',');
			month = cur[0];
			year = cur[1];
			
			if( curId == 'next' ) {	
				month++;
				if( month > 11 ) { month=0; year++; }
				_id('prev').classList.remove('off');
			}
			
			else if( curId == 'prev' ) { // else if because people uses 'next' more then 'prev'
				month--;
				if( month < 0 ) { month=11; year--; }
				
			}
			
			curDate = month+','+year; // set new curdate
			rangeCal.getMonth(monthsNum, curDate); // get next/prev months
			
		},
		
		/*-----------------------------------------------------

		LARGE FUNCTIONS

		-----------------------------------------------------*/	
		
		/* User select action */
		select: function(){},
		
		/* Set dates */
		set: function(){},
		
		/* Generate a month */		
		genMonth: function(year, month){
			
			// month info, fork off of github
			var monthData = function(){
			var date=new Date(year,month,0);this.totalDays=date.getDate();this.endDay=date.getDay();date.setDate(0);this.startDay=date.getDay(0);this.days=[];this.nextMonthStart=false;var prevMonthDays=0;if(this.startDay!==0)prevMonthDays=(new Date(year,month-1,0)).getDate()-this.startDay;var count=0;for(var i=0;i<42;i++){var day={};if(i<this.startDay)day.date=prevMonthDays=prevMonthDays+1;else if(i>this.totalDays+(this.startDay-1)){day.date=count=count+1;if(!this.nextMonthStart)this.nextMonthStart=i}else day.date=i-this.startDay+1;this.days[this.days.length]=day.date}
			};
			
			var m = {};
			monthData.call(m, year, month); // returns object to m, wants 1-12 index
			return m;
		
		},
		
		/* Get month */
		getMonth: function(monthsNum, curDate){
			
			var perfStart = performance.now(); // Begin perf measure
		
			var now = curDate.split(','),
				month = now[0],
				year = now[1],
				out = [], // out array
				i,
				nextMonth,
				nextYear;
			
			
			// Loop through monthsNum
			while(monthsNum--){
				
				month++; // add 1 month for each iteration
				
				// apply new year if month becomes 13, (jan = 1, dec = 12 etc)
				if(month === 13) { year++; month = 1; }
				
				// generate month
				var m = this.genMonth(year, month);
				
				
				/* Begin output */
				
				// Month title/year + weekdays
				out.push('<div class="r_month"><em class="r_title">' + monthArr[month-1] + ' <span>' + year + '</span></em><table><thead><tr>');
				_for(dayArr, function(e){ out.push('<td>' + e + '</td>'); }) // push weekday names
				 
				 // end thead, begin tbody
				out.push('</tr></thead><tbody>');
				
				// begin days
				i=0;
				var key;
				for(key in m.days){
					i++;
					
					// START row
					if(i === 1) out.push('<tr>');
					
						// not in current month
						if( key < m.startDay || (key >= m.nextMonthStart) ) {
							out.push('<td class="notCurMonth" data-date="'+ '' +'"><i>'+m.days[key]+'</i></td>');
						}
						else {
							out.push('<td data-date="'+ curDate +'"><i>'+m.days[key]+'</i></td>');
						}
				
					// END row
					if(i === 7) { out.push('</tr>'); i=0; }
					
				} // end for-loop
				
				
				// push end
				out.push('</tbody></table></div>'); // end .r_table etc
				
				
			} // end loop
			
			// output out-array to #dp
			r_dp.innerHTML = out.join('');
			
			
			
			
			// PERF: Output to log
			var perfEnd = performance.now();
			var str  = 'getMonth perf: ' + (perfEnd-perfStart) + 'ms';
			console.log(str);
			
		} // end getMonth
		
	};
	
	
	
	/* INIT ON RUN */
	rangeCal.init(_id('dateField'));
	
	
	/* LOG PERFORMANCE */
	var perfEnd = performance.now();
	var str  = 'init perf: ' + (perfEnd-perfStart) + 'ms';
	console.log(str);
	
	
})(jQuery,window,document);