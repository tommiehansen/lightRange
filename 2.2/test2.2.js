/*-----------------------------------------------------
*******************************************************
*****************************************************
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

	LIGHTRANGE
	simple date range selection
	2016-09-13

<<<<<<< HEAD
=======
=======
	
	LIGHTRANGE
	simple date range selection
	14:44 2015-12-17
	
>>>>>>> origin/master
>>>>>>> origin/master
*****************************************************
*******************************************************
-----------------------------------------------------*/

'use strict';

// small helpers
function _id(e) { return document.getElementById(e); }
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
//function _e(e) { return document.querySelector(e); }
//function _ee(e) { return document.querySelectorAll(e); }
//function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ f(e[i]); }}
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

	// show calendar
	show: function(monthsNum){
		main.className = 'show';

<<<<<<< HEAD
=======
=======
	
	// show calendar
	show: function(monthsNum){
		main.className = 'show';
		//_id('lrovr').classList.add('on');
		
>>>>>>> origin/master
>>>>>>> origin/master
		if(firstRun) {
			firstRun = false;
			lightRange.initMonths();
		}

	},
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
	
>>>>>>> origin/master
>>>>>>> origin/master
	// error messages
	err: function(txt){
		alert(txt); // fix better error handling @ future
	},
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

	hide: function(){
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


			}) // end for-loop

<<<<<<< HEAD
=======
=======
	
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
			
>>>>>>> origin/master
>>>>>>> origin/master
			i=0;
			_for(td, function(e){
				i++;
				if(i > s1i && i < s2i ) { e.classList.add('range'); }
			})
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

		}

	}, // end hoverRange()

	// navigation
	nav: function(e){

<<<<<<< HEAD
=======
=======
			
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
		
>>>>>>> origin/master
>>>>>>> origin/master
		var	dp = lr_dp,
			curX,
			curId = e.id,
			calWidth = dp.offsetWidth;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

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

<<<<<<< HEAD
=======
=======
		
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
		
>>>>>>> origin/master
>>>>>>> origin/master
		if( curId == 'prev' && curX < 0 ){
			if( calWidth < 500 ) { curX = curX+100; }
			else { curX = curX + 50; }
			_id('next').classList.remove('off');
		}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

		else if( curId == 'prev' && curX > len ){
			e.classList.add('off');
		}


<<<<<<< HEAD
=======
=======
		
		else if( curId == 'prev' && curX > len ){
			e.classList.add('off');
		}
		
		
>>>>>>> origin/master
>>>>>>> origin/master
		// 12/2 = 6 views total.
		// 6 = @ 600% the views are gone!
		// (12/2)-1+'00%' = max slide
		dp.style.transform = 'translateX(' + curX + '%)';
		//dp.style.transform = 'translateX(' + curX + '%)';
		dp.className = curX;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

	},


<<<<<<< HEAD
=======
=======
		
	},
	
	
>>>>>>> origin/master
>>>>>>> origin/master
	/*-----------------------------------------------------

		LARGE ANNOYING FUNCTIONS

<<<<<<< HEAD
	-----------------------------------------------------*/

=======
<<<<<<< HEAD
	-----------------------------------------------------*/

=======
	-----------------------------------------------------*/	
	
>>>>>>> origin/master
>>>>>>> origin/master
	/*
		USER SELECT
		1.04kb
	*/
	/* todo: add action for setting input 1 + hidden input 2+3 */
	select: function(e, main){
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

		// selection 1 + 2
		var	sel1 = _id('sel1'),
			sel2 = _id('sel2');

		/* first selection does not exist */
		if( sel1 === null ){

			e.id = 'sel1';
			sel1 = e;
			sel1.classList.add('sel1');

			// set date #1
			var selDate = $(e).parents('div').attr('rel') + ',' + e.innerText;
			this.set( selDate, 'from' );

			// mark all previous as disabled
			// and fix so that one cannot select end-date backwards in time
			var td = main.querySelectorAll('tbody td'),
				i=0,
				s1i = 1000; //dummy value

			_for(td, function(e){
				i++;
				if( e.id == 'sel1' ) { s1i = i; }
				if(i < s1i){ e.classList.add('disabled'); }
			})

		} // end first selection exist


		/* first exist but not second */
		else if( sel2 === null && e.id !== 'sel1' && e.className.indexOf('disabled') === -1 ){ // prevent making #2 to #1

			e.id = 'sel2';
			sel2 = e;
			sel2.classList.add('sel2');

			// set date #2
			var selDate = $(e).parents('div').attr('rel') + ',' + e.innerText;
			this.set( selDate, 'to' );

			// selection is complete
			var par = e.parentNode,		// tr
				parPar = main;			// tbody (main)

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

			// re-trigger click (make click 3 have the action of creating a new #1 selection)
			$(e).trigger('click');

		}

	}, // end select()

	/* SET DATES */
	set: function(date, fromTo){

		var cur,
			str = '',
			to = _id('lr_dateTo'),
			from = _id('lr_dateFrom');

		if(date !== 'reset'){

			fromTo = fromTo || 'from'; // default = from

			// BASE DATE + VARs
			var date = new Date(date); // create date from user selected date

			var y = date.getFullYear().toString(),
				m = date.getMonth(),
				d = date.getDate().toString(),
				day = date.getDay(),
				monthNice = monthLong[m].substr(0,3);


				// shift day numbering (we start at monday)
				if(day === 0) { day = 6; }
				else { day = day-1;}

				var dayNice = dayLong[day];

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
			cur.querySelector('.lr_date').innerHTML = str;

			// set nice dates to input
			cur.setAttribute('data-date', d + ' ' + monthNice);

			// set system date @ data-date tag
			m=m+1;
			if(m<10) m = '0' + m; // add leading zero
			if(d<10) d = '0' + d;
			cur.setAttribute('data-systemdate', y + '-' + m + '-' + d);

		} // end if( date !== 'reset' )


		// RESET
		else {
			cur = _id('lr_fromTo');
			var str = to.getAttribute('data-initial'); // FIX: This is not translateable as is

			to.classList.add('off');

			//daysNum.classList.add('off');
			//daysNum.querySelector('em').innerHTML = 0; // FIX: Combine with above?

			to.classList.remove('active'); // FIX: Combine with classList.add above
			from.classList.remove('active'); // Fix: Combine with above?

			to.querySelector('.lr_date').innerText = str;
		}

	}, // end set()


	getMonth: function(month, year, monthArr, dayArr, dayString){

		var days = [];

		var now = new Date(),
			nowMonth = now.getMonth(),
			nowYear = now.getFullYear(),
<<<<<<< HEAD
=======
=======
			
	}, // end select()
	
	/* SET DATES */
	set: function(date, fromTo){
		
		
	},
	
	
	getMonth: function(month, year, monthArr, dayArr, dayString){

		var days = [];
		
		var now = new Date(),
			nowMonth = now.getMonth(),
>>>>>>> origin/master
>>>>>>> origin/master
			nowDay = now.getDate();

		// set days 1
		var date = new Date(year, month, 0),
			totalDays = date.getDate(),
			endDay = date.getDay();
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
		
>>>>>>> origin/master
>>>>>>> origin/master
		// set days 2
		date.setDate(0);
		var startDay = date.getDay(0),
			nextMonthStart = false,
			prevMonthDays = 0;
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
				
>>>>>>> origin/master
>>>>>>> origin/master
		// check if startdate isn't 0 (startdate of current month starts at first index)
		if( this.startDay !== 0 ) { prevMonthDays = (new Date(year,month-1,0)).getDate() - startDay; }

		// Begin looping through days
		var count = 0,
			day,
			i=0,
			out='';
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
			
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

				days[days.length] = day.date

			}; // end loop

			// BEGIN OUTPUT
			out += '<div rel="'+ year + ',' + month +'"><em>' + monthArr[month-1] + ' <u>' + year + '</u></em><table><thead><tr>';
			out += dayString;
			out += '</thead><tbody>';

			// check if month = current month and current year
			var isCurMonth = false,
				cssClass = '';

			if(month-1 == nowMonth && year == nowYear ) { isCurMonth = true; }

<<<<<<< HEAD
=======
=======
				
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
			
>>>>>>> origin/master
>>>>>>> origin/master
			// All days
			i=0;
			for(var key in days){ // 42x / month
				i++;

				// START row
				if(i === 1) out += '<tr>';
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
					
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD

					}
					// current month -- ERR, also marks next years month as 'ld'
=======
<<<<<<< HEAD

					}
					// current month -- ERR, also marks next years month as 'ld'
=======
						
					}
					// current month
>>>>>>> origin/master
>>>>>>> origin/master
					else if( isCurMonth && days[key] <= nowDay ){
						cssClass = 'ld';
						if(days[key] == nowDay) cssClass = 'today';
						out += '<td class="'+ cssClass +'"><i>'+days[key]+'</i></td>';
					}
					// ordinary day
					else {
						out += '<td><i>'+days[key]+'</i></td>'; // USE DAY + month data
					}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

				// END row
				if(i === 7) { i = 0; } // end row (omitting </tr>)

			}

			// push end
			out += '</tbody></table></div>'; // end div

<<<<<<< HEAD
=======
=======
			
				// END row
				if(i === 7) { i = 0; } // end row (omitting </tr>)
				
			}
			
			// push end
			out += '</tbody></table></div>'; // end div
			
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master


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

<<<<<<< HEAD
=======
=======
			
		
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
			
>>>>>>> origin/master
>>>>>>> origin/master
			// pre-push 2 first months
			if( totalNum-monthNum === 2 ){
				var perfStart = performance.now(); // Begin perf measure
				dp.insertAdjacentHTML('beforeend', out);
				out=''; // reset string
				var perfEnd = performance.now();
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
				//console.log('getMonth perf @ 2 months: ' + Math.round((perfEnd-perfStart)*100, 2)/100 + 'ms');
			}

		} // end while-loop

		monthNum = totalNum; // reset monthNum

<<<<<<< HEAD
=======
=======
				console.log('getMonth perf @ 2 months: ' + Math.round((perfEnd-perfStart)*100, 2)/100 + 'ms');
			}
			
		} // end while-loop
		
		monthNum = totalNum; // reset monthNum
		
>>>>>>> origin/master
>>>>>>> origin/master

		// insert rest of the months, use setTimeout to push to last in que (and to pre-render 2x first)
		setTimeout(function(){
			var perfStart = performance.now(); // Begin perf measure
			dp.insertAdjacentHTML('beforeend', out);
			var perfEnd = performance.now();
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
			//console.log('getMonth perf @ rest of months: ' + Math.round((perfEnd-perfStart)*100, 2)/100 + 'ms');

			// create array with all td's for later use
			allTD = main.getElementsByTagName('td');

		}, 4); // 4ms = min (else ignored in some browsers)

	}, // end initMonths()


	/*
		APPLY
	*/

	apply: function(){
		var from = _id('lr_dateFrom'),
			to = _id('lr_dateTo'),
			fromNice = from.getAttribute('data-date'),
			toNice = to.getAttribute('data-date'),
			fromSys = from.getAttribute('data-systemdate'),
			toSys = to.getAttribute('data-systemdate');

		// set visual 'nice' date
		input.value = fromNice + ' - ' + toNice;

		// set system dates
		_id('date1').value = fromSys;
		_id('date2').value = toSys;
	},


	/*
		INIT + BINDS
	*/
	init: function(){

		// main elems
		main		= _id('lr_cal'), // main selector
		dp			= _id('lr_dp'); // container for all datepickers

<<<<<<< HEAD
=======
=======
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
			
>>>>>>> origin/master
>>>>>>> origin/master
		// input
		input		= _id('lr_input'),
		config		= input.getAttribute('data-monthsNum').split(','), // split to array
		dayLong		= input.getAttribute('data-days').split(','),
		dayShort	= [],
		monthLong	= input.getAttribute('data-months').split(','),
		monthShort	= [];
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master

		// config
		monthNum	= config[0],
		monthStart	= config[1];

<<<<<<< HEAD
=======
=======
			
		// config
		monthNum	= config[0],
		monthStart	= config[1];
			
>>>>>>> origin/master
>>>>>>> origin/master
		// others
		firstRun	= 1,		// if has been initialized before
		sel1		= false,	// selection 1
		sel2		= false,	// selection 2
		allTD;					// all the td's in the table

		// set short names; dayShort + monthShort
		for(var i=0;i<7;i++){ dayShort[i] = dayLong[i].substr(0,3); } // set dayShort array based on dayLong
		for(var i=0;i<12;i++){ monthShort[i] = monthLong[i].substr(0,3); } // set monthShort based on monthLong
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master



		// init binds
		$(input).on('click', this.show);
		$(input).trigger('click');

		$('#lr_nav').on('click', '.nav', function(){ lightRange.nav(this); } )

		// click day
		$(main).on('click', 'tbody td', function(){ lightRange.select(this, _id('lr_cal')); });

		// hover + throttle
		var hoverTimer = 30,
		hoverId;

		// should check if selection made
		$(main).on('mouseenter', 'tbody td', function(){
			clearTimeout(hoverId);
			hoverId = setTimeout(lightRange.hoverRange, hoverTimer, this);
		})


		// Main datepicker actions
		$(main).on('click', '.lr_btn', function(e){
			e.preventDefault();
			var t = $(this);

			// OK/Apply
			if( t.hasClass('green') ){
				if( !_id('sel2') ){
					lightRange.err('Please choose a return date'); // fix this
					return false;
				}
				lightRange.apply();
			}

		})

	},


} /* end lightRange */







/*-----------------------------------------------------

	# KEYBOARD NAV ADDON
	0.19kb minified

-----------------------------------------------------*/


$(document).on('keydown', function(e){

	var keyCode = e.keyCode || e.which;

	switch (keyCode) {
		case 37: // left
			$(_id('prev')).trigger('click');
			e.preventDefault();
			break;
		case 39: // right
			$(_id('next')).trigger('click');
			e.preventDefault();
			break;
	}

})


/*-----------------------------------------------------

	# MOUSE WHEEL ADDON
	0.58 bytes minified

-----------------------------------------------------*/

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
	 rcal = $('#lr_dp');

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
<<<<<<< HEAD
=======
=======
		
		
		
		// init binds
		$(input).on('click', this.show);
		$(input).trigger('click');
		
		$('#lr_nav').on('click', '.nav', function(){ lightRange.nav(this); } )
		
	},
	

} /* end lightRange */
>>>>>>> origin/master
>>>>>>> origin/master
