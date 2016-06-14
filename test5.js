/*-----------------------------------------------------
*******************************************************
*****************************************************
	
	LIGHTRANGE
	Simple date range selection
	2016-05-08
	Tommie Hansen
	
*****************************************************
*******************************************************
-----------------------------------------------------*/

// INIT
;(function($, window, document, undefined) {
	
	'use strict';

	/* Start performance measurement */
	var perfStart = performance.now();
	
	/*-----------------------------------------------------
		
	GLOBAL
	only occurs once
	we don't want to constantly query the DOM
	
	todo: this shouldn't be run at each load
	but only if lighRange.init() is called
	
	-----------------------------------------------------*/
	
	/* Helpers */
	function _id(e) { return document.getElementById(e); }
	function _data(e,attr) { return e.getAttribute('data-' + attr); }
	function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ if(f(e[i]) === false) break; }} // break-version for escaping loops via return false;

		
	// calendar
	var	main		= _id('lr_main'), // main selector
		dp			= _id('lr_dp'); // container for all datepickers
		
	// input
	var input		= _id('lr_input'),
		config		= input.getAttribute('data-monthsNum').split(','), // split to array
		dayLong		= input.getAttribute('data-days').split(','),
		dayShort	= [],
		monthLong	= input.getAttribute('data-months').split(','),
		monthShort	= [];
		
	// config
	var monthNum	= config[0],
		monthStart	= config[1];
		
	// others
	var firstRun	= 1,		// if has been initialized before
		sel1		= false,	// selection 1
		sel2		= false,	// selection 2
		allTD;					// all the td's in the table
	
	// set short names; dayShort + monthShort
	for(var i=0;i<7;i++){ dayShort[i] = dayLong[i].substr(0,3); } // set dayShort array based on dayLong
	for(var i=0;i<12;i++){ monthShort[i] = monthLong[i].substr(0,3); } // set monthShort based on monthLong
	
	
	/*-----------------------------------------------------
	
	Begin lightRange ns
	
	-----------------------------------------------------*/
		
	
	var lightRange = {
		
		/* Show */
		show: function(){
			
			if(firstRun){
				firstRun = false; // set to false to not repeat actions
				
				
				// trigger month function
				lightRange.getMonths(monthNum);
				
			}
			
			
			// show calendars
			main.classList.add('show');
			
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
		nav: function(e){
			
			var curX,
				curId = e.id;
				
			
		},
		
		
		/*-----------------------------------------------------

		LARGE FUNCTIONS

		-----------------------------------------------------*/	
		
		/* user select action */
		select: function(){},
		
		/* set dates */
		set: function(){},
		
		/* output months */
		getMonths: function(monthNum){
			
			console.log('getMonths() @ ' + monthNum);
			
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
				out = '';
				
			// month info, fork off of github
			// 0.44 kb		
			// Fixed version
			var monthData=function(year,month){var date=new Date(year,month,0);this.totalDays=date.getDate();this.endDay=date.getDay();date.setDate(0);this.startDay=date.getDay(0);this.days=[];this.nextMonthStart=false;var prevMonthDays=0;if(this.startDay!==0)prevMonthDays=(new Date(year,month-1,0)).getDate()-this.startDay;var count=0;for(var i=0;i<42;i++){var day={};if(i<this.startDay)day.date=prevMonthDays=prevMonthDays+1;else if(i>this.totalDays+(this.startDay-1)){day.date=count=count+1;if(!this.nextMonthStart)this.nextMonthStart=i}else day.date=i-this.startDay+1;this.days[this.days.length]=day.date}};
			
			// begin loop
			while(monthNum--){
				
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
					monthNice 		= monthShort[month-1]; // zero-based index
				
				
				if(month > 12) { nextMonth = 1; nextYear = year+1; } else { nextMonth=month; nextYear = year; }
				
				
				// BEGIN out
				// 4171 elems @ 40 months with <td>
				var curDate = nextYear + '-' + nextMonth;
				
				out += '<div class="r_month" rel="'+ curDate +'"><em class="r_title">' + monthNice + ' <span>' + year + '</span></em><table>';
						
					// weekdays
					out +='<thead><tr>';
					_for(dayShort, function(e){ out += '<th>' + e + '</th>'; })
						
					// days SLOW SLOW SLOW
					out += '</tr></thead><tbody>';
					for(key in days){
						
						i++;						
						
						// start row
						if(i === 1) out += '<tr>';
						
							// not in current month
							if( key < startDay || ( key >= nextMonthStart ) )  {
								
								curDate += '-' + days[key]
								
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
								
								out += '<td class="notCurMonth" rel="'+ curDate +'"><i>'+days[key]+'</i></td>';
								
							}
							// the rest, current month
							else {
								out += '<td><i>'+days[key]+'</i></td>';
							}
						

						// end row
						if(i === 7) { out += '</tr>'; i=0; }
						
					}
				
				out += '</tbody></table></div>'; // end .r_table etc
				
				
			} // end loop
			
			// push to nodelist for later use
			allTD = main.getElementsByTagName('td');
			
			// push to dp
			lr_dp.innerHTML = out;
			
			
		}, // end getMonth
		
		
		
		/*-----------------------------------------------------

		INIT + BINDS

		-----------------------------------------------------*/
		
		init: function(){
			
			// bind to input
			input.addEventListener('click', this.show);
			
			
			// click day
			//dp.on('click', 'td', this.select); /* todo: remove jquery depedency */
			
			
			// month navigation
			//$(r_nav).on('click', '.nav', function(){ rangeCal.nav(this, monthsNum); } )
			
			// OK/Cancel buttons
			/*
			$(r_actions).on('click', 'button', function(){
				
				var ok = true;
				
				// Cancel
				if( this.className.indexOf('red') > -1 ){} // reset form and close (or just close)
				
				// OK button
				else {
					
					//if(thing + otherThing) ok = false;
					
				} // validate selections
				
				// close if OK
				if(ok) this.hide();
				
			})
			*/
			
		}
		
	};
	
	
	/* init */
	lightRange.init();
	
	
	/* LOG PERFORMANCE */
	var perfEnd = performance.now();
	var str  = 'init perf: ' + (perfEnd-perfStart) + 'ms';
	console.log(str);
	
	
})(jQuery,window,document);