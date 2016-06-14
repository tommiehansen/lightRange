/*-----------------------------------------------------
*******************************************************
*****************************************************
	
	LIGHTRANGE
	simple date range selection
	
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

// BASE VARs
var monthArr,
	dayArr = [],
	dayLongArr,
	monthsNum,
	main = _id('cal'),
	allTD, // cache this globally (all td's in tables)
	isInit = false,
	daysNum;

var rangeCal = {
	
	// show calendar
	show: function(monthsNum){
		main.className = 'show';
		_id('lrovr').classList.add('on'); // show background layer
		
		if(!isInit) { 
			isInit = 1;
			this.binds();
			this.getMonths(monthsNum); // slow function
			//daysNum = _id('daysNum');
		}

	},
	
	// error messages
	err: function(txt){
		alert(txt); // fix better error handling @ future
	},
	
	// bind events
	binds: function(){
		
		// click
		$(main).on('click', 'tbody td', function(){ rangeCal.select(this, main); });
		
		// hover + throttle
		var hoverTimer = 30,
		hoverId;
		
		// should check if selection made
		$(main).on('mouseenter', 'tbody td', function(){
			clearTimeout(hoverId);
			hoverId = setTimeout(rangeCal.hoverRange, hoverTimer, this);
		})
		
		
		// button actions
		$('#dactions').on('click', 'button', function(){
			
			var ok = true;
			
			// Cancel button
			if( this.className.indexOf('red') > -1 ){
				// reset form and close
			}
			// OK button
			else {
				// close the datepicker 
				
				// trigger error if selection 2 not made
				if( _id('sel2') == null ) { ok = false; rangeCal.err('Also choose a return date'); }
				
			}
			
			// close if OK
			//if(ok) main.className = '';
			if(ok) rangeCal.hide();
			
		})
		
		
		// date navigation
		$('#r_nav').on('click', '.nav', function(){ rangeCal.nav(this); } )
		
	},
	
	// hide and close routine
	hide: function(){
		main.className = '';
		_id('lrovr').className = ''; // hide background layer
		
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
						
				//daysNum.querySelector('em').innerText = rangeCal.dateDiff(sel1, sel2);
				//daysNum.classList.remove('off');
				
				
			}) // end for-loop
			
			i=0;
			_for(td, function(e){
				i++;
				if(i > s1i && i < s2i ) { e.classList.add('range'); }
			})
			
		}
		
	},
	
	// initialize
	init: function(field){
		
		dayLongArr = field.attr('data-days').split(',');
		monthArr = field.attr('data-months').split(',');
		monthsNum = field.attr('data-monthsNum');
		
		// create 3-letter days
		_for(dayLongArr, function(e){
			dayArr.push( e.substring(0, 3) );
		});
		
		
		
		// init binds
		field
		/*
		.on('focus', function(){
			perfStart = performance.now();
			rangeCal.show(monthsNum);
		})
		*/
		/*
		.on('touchstart', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).trigger('focus');
			
		})
		*/
		.on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			
			//_id('lrovr').className = 'show';	
			//$('#lrovr').show(); // instant = no problem with click/focus lag
			rangeCal.show(monthsNum);
			
		})
		
	},
	
	// navigation
	nav: function(e){
		
		var	dp = _id('dp'),
			curX,
			curId = e.id,
			calWidth = dp.offsetWidth;
		
		if( dp.className == '' ){  curX = 0; dp.className = 0; } // perf: change from class to something else
		else { curX = parseInt(dp.className); }
		
		// calculate max percentage
		var len  = monthsNum; // set @ init
		
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
		
		// vars: this, main
		
		// selection 1 + 2
		var	sel1 = _id('sel1'),
			sel2 = _id('sel2');
			
			
		/* first selection does not exist */	
		if( sel1 === null ){
			
			e.id = 'sel1';
			sel1 = e;
			sel1.classList.add('sel1');
			
			// set date #1
			this.set( sel1.getAttribute('data-date') );
			
			// mark all previous as disabled			
			var td = main.querySelectorAll('tbody td'),
				i=0, s1i = 1500;
				
			_for(td, function(e){
				i++;
				if( e.id == 'sel1' ) { s1i = i; }
				if(i < s1i){ e.classList.add('disabled'); }
			})
			
			//console.log( e.index );
			
		} // end first selection exist
		
		
		/* first exist but not second */
		else if( sel2 === null && e.id !== 'sel1' && e.className.indexOf('disabled') === -1 ){ // prevent making #2 to #1
		
			e.id = 'sel2';
			sel2 = e;
			sel2.classList.add('sel2');
			
			// set date #2
			this.set( sel2.getAttribute('data-date'), 'to' );			

			// selection is complete
			var par = e.parentNode,		// tr
				parPar = main;		// tbody (main)
				
			var	go = false,
				stop = false,
				i=0, s1i=0, s2i=1500;
				
			// add classes to td's between selections
			// perf: this loops through all existing td's on click (slow) -- alternative way?
			// create some sort of index on init?; main[0].querySelectorAll('td') = index; but do this when creating the td's instead of first creating and then indexing?
			_for(allTD, function(e){
				i++;
				
				if( e.id == 'sel1' ) { go=1; s1i = i; }
				if( e.id == 'sel2' ) { stop=1; s2i = i; }
				
				if( s1i < s2i && go ){
					if(go) e.className += ' range';
				} 
				
				if(stop) return false;
			})			
		
		} // end first exist but not second
		
		
		/* both selections exist -- reset */
		else {
			
			this.set('reset');
			
			_for( allTD, function(e) {
				e.classList.remove('range', 'disabled');
			});
			
			sel1.classList.remove('sel1');
			sel1.id = '';
			
			if(sel2 !== null) {
				sel2.classList.remove('sel2');
				sel2.id = '';
			}
			
			//daysNum.classList.remove('bounce');
			
			// re-trigger click (make click 3 have the action of creating a new #1 selection)
			$(e).trigger('click');
			
		}
			
	}, // end select()
	
	/*
		SET DATES
		0.79kb
	*/
	set: function(date, fromTo){
		
		/*
		var cur,
			str = '',
			to = _id('dateTo'),
			from = _id('dateFrom');
			
		// check if we're not resetting output
		if(date !== 'reset'){
			
			fromTo = fromTo || 'from'; // default = from
			
			// BASE DATE + VARs
			var date = new Date(date); // create date from user selected date
			
			var y = date.getFullYear().toString(),
				m = date.getMonth(),
				d = date.getDate().toString(),
				day = date.getDay(),
				monthNice = monthArr[m].substr(0,3);
				
				
				// shift day numbering (we start at monday)
				if(day === 0) { day = 6; }
				else { day = day-1;}
				
				var dayNice = dayLongArr[day];
				
			// Split day (for small screens)
			var dayNice1 = dayNice.substr(0,3),
				dayNice2 = dayNice.substr(3,20);
				
			
			if( fromTo == 'from' ){
				cur = from;
				to.classList.remove('off'); // if has class off remove it
			}
			else {
				cur = to;
			}
			
			cur.classList.add('active');
			str = dayNice1 + '<span class="hideSmall">' + dayNice2 + '</span>, ' + d + ' ' + monthNice + ' ' + y;
			
		} // end if( date !== 'reset' )
			
		
		// RESET
		else {
			cur = _id('fromTo');
			str = 'Select a date'; // FIX: This is not translateable as is
			
			to.classList.add('off');
			daysNum.classList.add('off');
			daysNum.querySelector('em').innerHTML = 0; // FIX: Combine with above?
			
			to.classList.remove('active'); // FIX: Combine with classList.add above
			from.classList.remove('active'); // Fix: Combine with above?
			
			to.querySelector('.r_date').innerText = str;
		}
		
		
		$(cur).find('.r_date').html(str);
		
		*/
		
		
	},
	
	/*
		GET MONTHS
		1.79 kb
	*/
	getMonths: function(monthsNum){
		
		// DEV: STAR TIME FOR RENDER CALENDAR
		var perfStart = performance.now();
		
		var now = new Date(),
			month = now.getMonth(),
			year = now.getFullYear();
		
		// VARs
		var i = 0,
			monthNice,
			dayNice,
			nextMonth,
			nextYear,
			curDate,
			key,
			out = [];
			
		// month info, fork off of github
		// 0.44 kb		
		// Fixed version
		var monthData=function(year,month){var date=new Date(year,month,0);this.totalDays=date.getDate();this.endDay=date.getDay();date.setDate(0);this.startDay=date.getDay(0);this.days=[];this.nextMonthStart=false;var prevMonthDays=0;if(this.startDay!==0)prevMonthDays=(new Date(year,month-1,0)).getDate()-this.startDay;var count=0;for(var i=0;i<42;i++){var day={};if(i<this.startDay)day.date=prevMonthDays=prevMonthDays+1;else if(i>this.totalDays+(this.startDay-1)){day.date=count=count+1;if(!this.nextMonthStart)this.nextMonthStart=i}else day.date=i-this.startDay+1;this.days[this.days.length]=day.date}};
		
		
		// begin loop
		while(monthsNum--){
			
			// increase month
			month++;
			if(month === 13) { month=1; year++; }
			
			// month data
			var m = {};
			monthData.call(m, year, month); // returns object to m, wants 1-12 index
			
			// SET VARs
			var days			= m.days,
				startDay		= m.startDay,
				endDay			= m.endDay,
				totalDays		= m.totalDays,
				nextMonthStart 	= m.nextMonthStart,
				monthNice 		= monthArr[month-1]; // zero-based index
			
			
			if(month > 12) { nextMonth = 1; nextYear = year+1; } else { nextMonth=month; nextYear = year; }
			
			
			// BEGIN out
			// 4171 elems @ 40 months with <td>
			out.push('<div class="r_month"><em class="r_title">' + monthNice + ' <span>' + year + '</span></em><table>');
					
				// weekdays
				out.push('<thead><tr>');
				_for(dayArr, function(e){ out.push('<td>' + e + '</td>'); })
					
				// days SLOW SLOW SLOW
				out.push('</tr></thead><tbody>');
				for(key in days){
					
					i++;
					curDate = nextYear + '-' + nextMonth + '-' + days[key];
					
					// start row
					if(i === 1) out.push('<tr>');
					
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
							
							out.push('<td class="notCurMonth" data-date="'+ curDate +'"><i>'+days[key]+'</i></td>');
							
						}
						// the rest, current month
						else {
							out.push('<td data-date="'+ curDate +'"><i>'+days[key]+'</i></td>');
						}
					

					// end row
					if(i === 7) { out.push('</tr>'); i=0; }
					
				}
			
			out.push('</tbody></table></div>'); // end .r_table etc
			
			
		} // end loop
		
		// throw all td's into a nodelist for later looping
		allTD = main.getElementsByTagName('td');
		
		// set html
		//_id('dp').innerHTML = out;
		_id('dp').innerHTML = out.join('');
		
		
		// DEV: GET ELAPSED RENDER TIME
		var perfEnd = performance.now();
		var str  = 'getMonths func: ' + (perfEnd-perfStart) + 'ms';
		//alert(str);
		console.log(str);
		
	}, // end getMonths()
	

	} /* end rangeCal */
	
	
	
	
	
	/*-----------------------------------------------------

	Keyboard/mouse navigation
	Adds: ~0.7kb

	-----------------------------------------------------*/
	
	/*
	
	
	
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
	
   
   // MOUSE WHEEL NAV
   
    // Important option
    // timer delay in ms, higher = better perf but less responsive ui
    var menuTimer = 30,
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
	
	*/

