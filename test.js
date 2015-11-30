if(window.ActiveXObject || "ActiveXObject" in window){
	alert('bad browser detected, this will not work properly.');
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
	
	
	// onCSSAnimationEnd
	/*
	var s = document.body || document.documentElement, s = s.style, prefixAnimation = '', prefixTransition = '';

	$.fn.extend({
		onCSSAnimationEnd: function( callback ) {
			var $this = $( this ).eq( 0 );
			$this.one( 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', callback );
			if( ( prefixAnimation == '' && !( 'animation' in s ) ) || $this.css( prefixAnimation + 'animation-duration' ) == '0s' ) callback();
			return this;
		}
	});
	*/

	
	// add dates to output
	function lurker(date,fromTo){
		
		var main = _id('fromTo'),
			y, m, d, day, cur, monthNice, dayNice, str='';
		
		
		// check if we're not resetting the texts
		if(date !== 'reset'){
			
			fromTo=fromTo||'from'; // default = from
			
			// BASE DATE + VARs
			var date = new Date(date);
				
			y = date.getFullYear().toString();
			m = date.getMonth();
			d = date.getDate().toString();
			day = date.getDay();
			
			monthNice = monthArr[m].substr(0,3);
			dayNice = dayLongArr[day];
			
			// Split day
			var dayNice1 = dayNice.substr(0,3),
				dayNice2 = dayNice.substr(3, 20);
			
			if( fromTo == 'from' ){
				cur = _id('dateFrom');
				_id('dateTo').classList.remove('off');
			}
			else {
				cur = _id('dateTo');
			}
			
			cur.classList.add('active');
			str = dayNice1 + '<span class="hideSmall">' + dayNice2 + '</span>, ' + d + ' ' + monthNice + ' ' + y;
			
		}
		
		// reset
		else {
			cur = main;			
			str = 'Select a date'; // make this multi-lang capable via data-attributes
			
			var dateTo = _id('dateTo'),
				daysNum = _id('daysNum');
			
			dateTo.classList.add('off');
			daysNum.classList.add('off');
			daysNum.querySelector('em').innerHTML = 0;
			
			dateTo.classList.remove('active');
			_id('dateFrom').classList.remove('active');
			
			dateTo.querySelector('.r_date').innerText = str;
			
			
		}
		
		// Text selectors
		var $cur = $(cur); 
		var r_date = $cur.children('.r_date');
			
		// Set text (date)
		r_date.html(str);
		
	}
	
	
	// returns total selected days
	function showDateDiff(date1,date2,sel2){
		
		// Create dates
		var dmy1 = new Date(date1),
			dmy2 = new Date(date2);
			
		var days = Math.abs(Math.ceil( dmy1.getTime() / (3600*24*1000)) - Math.ceil( dmy2.getTime() / (3600*24*1000)));
		days++;
		
		
		//if(days < 30) log('You selected ' + days + ' days');
		//else log('You selected ' + days + ' days, this is quite a lot. Are you sure?');
		
		return days;
		
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
			sel1 = e;
			sel1.classList.add('sel1');
			lurker( sel1.getAttribute('data-date'));
			
			// mark all previous as disabled			
			var td = main.querySelectorAll('tbody td'),
				i=0, s1i = 9999;
				
			_for(td, function(e){
				i++;
				if( e.id == 'sel1' ) { s1i = i; }
				if(i < s1i){ e.classList.add('disabled'); }
			})
			
			//console.log( e.index );
			
		}
		
		// first exist but not second
		else if( sel2 === null && e.id !== 'sel1' && e.className.indexOf('disabled') === -1 ){ // prevent making #2 to #1
			e.id = 'sel2';
			sel2 = e;
			sel2.classList.add('sel2');
			
			// set texts
			lurker( sel2.getAttribute('data-date'), 'to');
			
			// show total selected days
			var numDays = showDateDiff( sel1.getAttribute('data-date'), sel2.getAttribute('data-date') );
			
			_id('daysNum').querySelector('em').innerHTML = numDays;
			_id('daysNum').classList.remove('off');

				
			// selection is complete
			var par = e.parentNode,			// tr
				parPar = main;				// tbody (main)
				
				var td = main.querySelectorAll('td'),
					go = false,
					stop = false,
					i=0,
					s1i=0,
					s2i=999;
			
			// add classes to td's between selections
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
		// this should select 1 again instead...
		else {
			lurker('reset');
			var td = main.querySelectorAll('td');
			_for(td, function(e){ e.classList.remove('range','disabled'); })
			sel1.classList.remove('sel1');
			sel1.removeAttribute('id');
			if(sel2 !== null){
				sel2.classList.remove('sel2');
				sel2.removeAttribute('id');
			}
			
			$(e).trigger('click'); // this isn't super nice...
		}
		
	}

	
	
	
	
	
	
	
	
	
	/*-----------------------------------------------------
		
		GET MONTH DATA
		Fork of github thingy
		
	-----------------------------------------------------*/


	// month info,fork off of github
	var monthData=function(year,month){var date=new Date(year,month,0);this.totalDays=date.getDate();this.endDay=date.getDay();date.setDate(0);this.startDay=date.getDay(0);this.days=[];this.nextMonthStart=false;var prevMonthDays=0;if(this.startDay!==0)prevMonthDays=(new Date(year,month-1,0)).getDate()-this.startDay;var count=0;for(var i=0;i<42;i++){var day={};if(i<this.startDay)day.date=prevMonthDays=prevMonthDays+1;else if(i>this.totalDays+(this.startDay-1)){day.date=count=count+1;if(!this.nextMonthStart)this.nextMonthStart=i}else day.date=i-this.startDay+1;this.days[this.days.length]=day.date}};
	
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
			
			
		} // end loop
		
		$('#dp').html(out);
	
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
		totalMonths = 12;
		
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
			curId = this.id,
			calWidth = dp.offsetWidth;
			
		if( dp.className == '' ) { curX = 0; dp.className = 0; }
		else {
			curX = dp.className;
			curX = parseInt(curX);
		}
		
		// calculate max percentage
		var len = totalMonths;
		if(calWidth > 500) { len = len/2; 	}
		len = len-1+'00';
		len = '-' + len;
		
		if(curId == 'next' && curX > len ){
			if(calWidth < 500) { curX = curX-100; }
			else { curX = curX-50; }
			
			_id('prev').classList.remove('off');
		}
		else if(curId == 'next' && curX <= len) {
			this.classList.add('off');
		}
		
		if(curId == 'prev' && curX < 0 ){
			if(calWidth < 500) { curX = curX+100; }
			else { curX = curX+50; }
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
	
	
	
	/*-----------------------------------------------------

		EXTRAS
		Todo: Have this be plugins/extensions
		Current @ 1.5kb uncompressed

	-----------------------------------------------------*/
	
	
	// show selection on hover
	// add this as some sort of plugin, adds ~0.6kb to total
	
	var hoverTimer = 20,
		hoverId;
	
	$(main).on('mouseenter', 'tbody td', function(){
		clearTimeout(hoverId);
		hoverId = setTimeout(hoverRange, hoverTimer, this); // use throttling for perf reasons
	});
	
	
	function hoverRange(t){
		
		var sel1 = _id('sel1'), // later move all this outside of mouseenter for perf reasons; note: calendar must ofc exist *BEFORE* all binds
			sel2 = _id('sel2');
				
		if( sel1 !== null && sel2 == null ){
			
			var td = document.querySelectorAll('tbody td'), // later move outside for perf reasons
				i=0, s1i=0, s2i=0, sel2, sel1data,
				t = t;
			
			_for(td, function(e){
				i++;
				
				e.classList.remove('selCur','range');
				t.classList.add('selCur');
				
				if( e.id == 'sel1' ) { s1i = i;  sel1 = e.getAttribute('data-date'); }		// get index of selection 1 and start from this <td>				
				if( e.className.indexOf("selCur") > -1 ) { s2i = i+1; sel2 = e.getAttribute('data-date'); }
				
				var dateDiff = showDateDiff(sel1, sel2);
				
				_id('daysNum').querySelector('em').innerText = dateDiff;
				_id('daysNum').classList.remove('off');
				
				
			}) // end for-loop
			
			i=0;
			_for(td, function(e){
				i++;
				if(i > s1i && i < s2i ) { e.classList.add('range'); }
				
			})
			
		} // end if sel1 !== null
		
	};
	
	
	
	
	/*-----------------------------------------------------

	Keyboard/mouse navigation
	Adds: ~0.7kb

	-----------------------------------------------------*/
	
	
	
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
	
   
    // Important option
    // timer delay in ms, higher = better perf but less responsive ui
    var menuTimer = 60,
		timerId,
		navPrev = $(_id('prev')),
		navNext = $(_id('next')),
		collectUp = 0,
		collectDown = 0;

    // VARs
    var win = $(window),
		rcal = $('#r_cals');
    
    // Evil window scroll function	
	rcal.on('mousewheel DOMMouseScroll', function (event) {
		clearTimeout(timerId);
		
		//var delta = event.originalEvent.wheelDelta;
		if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
			// up
			collectUp++;
			collectDown = 0;
			
		}
		else {
			// down
			collectDown++;
			collectUp = 0;
		}
		
		
		timerId = setTimeout(function(){
			
			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
				if(collectUp < 2) collectUp = 1;
				//up
				while(collectUp--){ navPrev.trigger('click'); } // navPrev/next should be a function that takes X interations in order to multiple value when scrolling fast instead of firing 10x times etc.
			}
			else {
			  //down
			  if(collectDown < 2) collectDown = 1;
			  while(collectDown--){ navNext.trigger('click'); }
			}
		
		}, menuTimer);
		
		event.preventDefault();
	 
	});
	
	
	/*-----------------------------------------------------

	MISC

	-----------------------------------------------------*/	
	
	
	
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