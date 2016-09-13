/*-----------------------------------------------------
*******************************************************
*****************************************************

	LIGHTRANGE
	simple date range selection
	2016-09-13

*****************************************************
*******************************************************
-----------------------------------------------------*/

'use strict';

// small helpers
function _id(e) { return document.getElementById(e); }
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

			i=0;
			_for(td, function(e){
				i++;
				if(i > s1i && i < s2i ) { e.classList.add('range'); }
			})

		}

	}, // end hoverRange()

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
			str = '';

		if(date !== 'reset'){

			fromTo = fromTo || 'from'; // default = from

			// BASE DATE + VARs
			var date = new Date(date); // create date from user selected date

			// Create format friendly date (year, month, day)
			var str = {
				'year': date.getFullYear(),
				'month': date.getMonth()+1,
				'day': date.getDate()
			};


			// set dates to input
			var attr = 'data-date' + fromTo;
			main.setAttribute(attr, JSON.stringify(str));

		} // end if( date !== 'reset' )

		// RESET
		else {
			main.removeAttribute('data-datefrom');
			main.removeAttribute('data-dateto');
		}

	}, // end set()


	getMonth: function(month, year, monthArr, dayArr, dayString){

		var days = [];

		var now = new Date(),
			nowMonth = now.getMonth(),
			nowYear = now.getFullYear(),
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
			out += '<div rel="'+ year + ',' + month +'"><em>' + monthArr[month-1] + ' <u>' + year + '</u></em><table><thead><tr>';
			out += dayString;
			out += '</thead><tbody>';

			// check if month = current month and current year
			var isCurMonth = false,
				cssClass = '';

			if(month-1 == nowMonth && year == nowYear ) { isCurMonth = true; }

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
					// current month -- ERR, also marks next years month as 'ld'
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
				dp.insertAdjacentHTML('beforeend', out);
				out=''; // reset string
			}

		} // end while-loop

		monthNum = totalNum; // reset monthNum


		// insert rest of the months, use setTimeout to push to last in que (and to pre-render 2x first)
		setTimeout(function(){
			dp.insertAdjacentHTML('beforeend', out);

			// create array with all td's for later use
			allTD = main.getElementsByTagName('td');

		}, 4); // 4ms = min (else ignored in some browsers)

	}, // end initMonths()


	/*
		APPLY
	*/

	/*
		# APPLY + format date(s)
	*/
	apply: function(){

		var from = main.getAttribute('data-datefrom'), // yyyy-m-d
			to = main.getAttribute('data-dateto');

			from = JSON.parse(from);
			to = JSON.parse(to);

		// set visual 'nice' date
		var fromNice = from.day + ' ' + monthShort[from.month];
		var toNice = to.day + ' ' + monthShort[to.month];
		input.value = fromNice + ' - ' + toNice;

		// set system dates
		var fromSys = from.year + '-' + from.month + '-' + from.day,
			toSys = to.year + '-' + to.month + '-' + to.day;


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
		for(var i=0;i<7;i++){ dayShort[i] = dayLong[i].substr(0,2); } // set dayShort array based on dayLong
		for(var i=0;i<12;i++){ monthShort[i] = monthLong[i].substr(0,3); } // set monthShort based on monthLong



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

/*

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
*/
