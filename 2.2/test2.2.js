/*-----------------------------------------------------
*******************************************************
*****************************************************
	
	LIGHTRANGE
	simple date range selection
	14:44 2015-12-17
	
*****************************************************
*******************************************************
-----------------------------------------------------*/

'use strict';

// small helpers
function _id(e) { return document.getElementById(e); }
//function _e(e) { return document.querySelector(e); }
//function _ee(e) { return document.querySelectorAll(e); }
//function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ f(e[i]); }}
function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ if(f(e[i]) === false) break; }} // break-version for escaping loops via return false;


// BASE VARs, set globally and set values on init
var main,
	dp,
	input,
	config,
	dayLong,
	dayShort,
	monthLong,
	monthShort,
	monthNum,
	monthStart,
	firstRun,
	sel1,
	sel2,
	allTD;

var lightRange = {
	
	// show calendar
	show: function(monthsNum){
		main.className = 'show';
		//_id('lrovr').classList.add('on');
		
		if(firstRun) {
			firstRun = false;
			lightRange.initMonths();
		}

	},
	
	// error messages
	err: function(txt){
		alert(txt); // fix better error handling @ future
	},
	
	hide: function(){
		//main.removeClass('show');
		main.className = '';
	},
	
	hoverRange: function(t){
		
		var sel1 = _id('sel1'), // later move all this outside of mouseenter for perf reasons; note: calendar must ofc exist *BEFORE* all binds
			sel2 = _id('sel2');
			
		if( sel1 !== null && sel2 == null ){
			
			var td = allTD, // allTD created on init
				i=0, s1i=0, s2i=0, sel2, sel1data;	
			
			
			_for(td, function(e){
				i++;
				
				e.classList.remove('selCur','range');
				t.classList.add('selCur');
				
				if( e.id == 'sel1' ) { s1i = i;  sel1 = e.getAttribute('data-date'); }		// get index of selection 1 and start from this <td>				
				if( e.className.indexOf("selCur") > -1 ) { s2i = i+1; sel2 = e.getAttribute('data-date'); }
						
				daysNum.querySelector('em').innerText = rangeCal.dateDiff(sel1, sel2);
				daysNum.classList.remove('off');
				
				
			}) // end for-loop
			
			i=0;
			_for(td, function(e){
				i++;
				if(i > s1i && i < s2i ) { e.classList.add('range'); }
			})
			
		}
		
	},
	
	// difference in days
	dateDiff: function(date1, date2, sel2){
		
		// Create dates
		var dmy1 = new Date(date1),
			dmy2 = new Date(date2),
			days = Math.abs(Math.ceil( dmy1.getTime() / (3600*24*1000)) - Math.ceil( dmy2.getTime() / (3600*24*1000)));
		
		days++;
		return days;
		
	},
	
	// navigation
	nav: function(e){
		
		var	dp = lr_dp,
			curX,
			curId = e.id,
			calWidth = dp.offsetWidth;
		
		if( dp.className == '' ){  curX = 0; dp.className = 0; } // perf: change from class to something else
		else { curX = parseInt(dp.className); }
		
		// calculate max percentage
		//var len  = monthNum; // set @ init // doesnt work
		var len = monthNum;
		
		if( calWidth > 500 ) { len = len / 2; } // responsive
		len = len-1+'00';
		len = '-' + len;
		
		if( curId == 'next' && curX > len ){
			
			if( calWidth < 500 ) { curX = curX-100; }
			else { curX = curX-50; }
			
			_id('prev').classList.remove('off');
			
		}
		
		else if( curId == 'next' && curX <= len ){
			e.classList.add('off');
		}
		
		if( curId == 'prev' && curX < 0 ){
			if( calWidth < 500 ) { curX = curX+100; }
			else { curX = curX + 50; }
			_id('next').classList.remove('off');
		}
		
		else if( curId == 'prev' && curX > len ){
			e.classList.add('off');
		}
		
		
		// 12/2 = 6 views total.
		// 6 = @ 600% the views are gone!
		// (12/2)-1+'00%' = max slide
		dp.style.transform = 'translateX(' + curX + '%)';
		//dp.style.transform = 'translateX(' + curX + '%)';
		dp.className = curX;
		
	},
	
	
	/*-----------------------------------------------------

		LARGE ANNOYING FUNCTIONS

	-----------------------------------------------------*/	
	
	/*
		USER SELECT
		1.04kb
	*/
	/* todo: add action for setting input 1 + hidden input 2+3 */
	select: function(e, main){
			
	}, // end select()
	
	/* SET DATES */
	set: function(date, fromTo){
		
		
	},
	
	
	getMonth: function(month, year, monthArr, dayArr, dayString){

		var days = [];
		
		var now = new Date(),
			nowMonth = now.getMonth(),
			nowDay = now.getDate();

		// set days 1
		var date = new Date(year, month, 0),
			totalDays = date.getDate(),
			endDay = date.getDay();
		
		// set days 2
		date.setDate(0);
		var startDay = date.getDay(0),
			nextMonthStart = false,
			prevMonthDays = 0;
				
		// check if startdate isn't 0 (startdate of current month starts at first index)
		if( this.startDay !== 0 ) { prevMonthDays = (new Date(year,month-1,0)).getDate() - startDay; }

		// Begin looping through days
		var count = 0,
			day,
			i=0,
			out='';
			
			for(i; i < 42; i++) {
				day = {};
				if(i < startDay) {
					day.date = prevMonthDays = prevMonthDays + 1; 	// prev months days
				}
				else if(i > totalDays + (startDay - 1)) {
					// days after current month
					day.date = count = count + 1;
					if (!nextMonthStart) nextMonthStart = i
				}
				else {
					day.date = i - startDay + 1; // regular in-month days
				}
				
				days[days.length] = day.date
			
			}; // end loop
			
			// BEGIN OUTPUT
			out += '<div rel="'+ month + '/' + year +'"><em>' + monthArr[month-1] + ' <u>' + year + '</u></em><table><thead><tr>';
			out += dayString;
			out += '</thead><tbody>';
			
			// check if month = current month
			var isCurMonth = false,
				cssClass = '';
				
			if(month-1 == nowMonth) { isCurMonth = true; }
			
			// All days
			i=0;
			for(var key in days){ // 42x / month
				i++;

				// START row
				if(i === 1) out += '<tr>';
					
					// check if prev month (in relation to current visible month)
					if( key < startDay || key >= nextMonthStart ){

						if( isCurMonth && key < nextMonthStart ) {
							out += '<td class="nc ld"><i>'+days[key]+'</i></td>';
						}
						else {
							var curMonth = month;
							if(key => nextMonthStart ) { curMonth = month+1; } else { curMonth = month-1; }
							out += '<td class="nc" rel="'+ curMonth +'"><i>'+days[key]+'</i></td>';
						}
						
					}
					// current month
					else if( isCurMonth && days[key] <= nowDay ){
						cssClass = 'ld';
						if(days[key] == nowDay) cssClass = 'today';
						out += '<td class="'+ cssClass +'"><i>'+days[key]+'</i></td>';
					}
					// ordinary day
					else {
						out += '<td><i>'+days[key]+'</i></td>'; // USE DAY + month data
					}
			
				// END row
				if(i === 7) { i = 0; } // end row (omitting </tr>)
				
			}
			
			// push end
			out += '</tbody></table></div>'; // end div
			
			// return string
			return out;

	}, // end getMonth



	// initialize month generation
	initMonths: function(){

		// generate months
		var out = '',
			today = new Date(),
			day = today.getDate(),
			month = today.getMonth(),
			year = today.getFullYear(),
			totalNum = monthNum, // cache initial
			dayString = '';
			
		
		// add month offset if set
		if( monthStart !== 0 ) month += (+monthStart);
		
		for(var i=0;i<7;i++){
			dayString += '<th>' + dayShort[i];
		}
		
		while(monthNum--){
		
			// add 1 month for each iteration
			month++;
			
			// apply new year if month becomes 13, (jan = 1, dec = 12 etc)
			if(month === 13) { year++; month = 1; }
			
			// add html to string
			out += lightRange.getMonth(month, year, monthLong, dayShort, dayString);
			
			// pre-push 2 first months
			if( totalNum-monthNum === 2 ){
				var perfStart = performance.now(); // Begin perf measure
				dp.insertAdjacentHTML('beforeend', out);
				out=''; // reset string
				var perfEnd = performance.now();
				console.log('getMonth perf @ 2 months: ' + Math.round((perfEnd-perfStart)*100, 2)/100 + 'ms');
			}
			
		} // end while-loop
		
		monthNum = totalNum; // reset monthNum
		

		// insert rest of the months, use setTimeout to push to last in que (and to pre-render 2x first)
		setTimeout(function(){
			var perfStart = performance.now(); // Begin perf measure
			dp.insertAdjacentHTML('beforeend', out);
			var perfEnd = performance.now();
			console.log('getMonth perf @ rest of months: ' + Math.round((perfEnd-perfStart)*100, 2)/100 + 'ms');
		}, 4); // 4ms = min (else ignored in some browsers)

	},
	
		
	/*	
		INIT + BINDS
	*/
	init: function(){
		
		// main elems
		main		= _id('lr_cal'), // main selector
		dp			= _id('lr_dp'); // container for all datepickers
			
		// input
		input		= _id('lr_input'),
		config		= input.getAttribute('data-monthsNum').split(','), // split to array
		dayLong		= input.getAttribute('data-days').split(','),
		dayShort	= [],
		monthLong	= input.getAttribute('data-months').split(','),
		monthShort	= [];
			
		// config
		monthNum	= config[0],
		monthStart	= config[1];
			
		// others
		firstRun	= 1,		// if has been initialized before
		sel1		= false,	// selection 1
		sel2		= false,	// selection 2
		allTD;					// all the td's in the table

		// set short names; dayShort + monthShort
		for(var i=0;i<7;i++){ dayShort[i] = dayLong[i].substr(0,3); } // set dayShort array based on dayLong
		for(var i=0;i<12;i++){ monthShort[i] = monthLong[i].substr(0,3); } // set monthShort based on monthLong
		
		
		
		// init binds
		$(input).on('click', this.show);
		$(input).trigger('click');
		
		$('#lr_nav').on('click', '.nav', function(){ lightRange.nav(this); } )
		
	},
	

} /* end lightRange */
