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
	//function _for(e,f) { var i, len=e.length; for(i=0;i<len;i++){ if(f(e[i]) === false) break; }}
	//function _data(e,attr) { return e.getAttribute('data-' + attr); }
		
	/* GLOBAL SCOPE / SETUP */	
	var	main = _id('cal'),
		r_dp = main.querySelector('#r_dp'),
		r_dpi = _id('r_dpi'), // calendar input field
		firstRun = true,
		dayLong = r_dpi.getAttribute('data-days').split(','),
		monthLong = r_dpi.getAttribute('data-months').split(','),
		dayShort = [],
		monthShort = [],
		monthConf = r_dpi.getAttribute('data-monthsNum').split(','),
		monthNum = monthConf[0],
		monthStart = monthConf[1],
		sel1 = false, // selection 1 + 2
		sel2 = false;
		
	// generate short days + months
	for(var i=0;i<7;i++){ dayShort[i] = dayLong[i].substr(0,3); }
	for(var i=0;i<12;i++){ monthShort[i] = monthLong[i].substr(0,3); }
	
	
	/*-----------------------------------------------------
	
	Begin rangeCal ns
	
	-----------------------------------------------------*/
	
	var rangeCal = {
		
		/* Show */
		show: function(){
			
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
				
				// set curdate
				curDate = month + ',' + year;
				
				this.getMonth(curDate); // get month
				this.binds(); // initiliaze all binds once
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
		binds: function(){
			
			// initialize datepicker
			$(r_dpi).on('click', this.showCal);
			
			// click day
			$(main).on('click', 'tbody td', this.select);
			
			// month navigation
			//$(r_nav).on('click', '.nav', function(){ rangeCal.nav(this, monthsNum); } )
			
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
		nav: function(e){
			
			var curX,
				curId = e.id;
		},
		
		/*-----------------------------------------------------

		LARGE FUNCTIONS

		-----------------------------------------------------*/	
		
		/* User select action */
		select: function(){},
		
		/* Set dates */
		set: function(){},
		
		/* Output month */
		getMonth: function(curDate){
			
			var perfStart = performance.now(); // Begin perf measure
			
			// PERF: Output to log
			var perfEnd = performance.now();
			console.log('getMonth perf @ 50 months: ' + (perfEnd-perfStart) + 'ms');
			
		} // end getMonth
		
	};
	
	
	/* INIT ON RUN */
	rangeCal.binds();
	
	
	/* LOG PERFORMANCE */
	var perfEnd = performance.now();
	var str  = 'init perf: ' + (perfEnd-perfStart) + 'ms';
	console.log(str);
	
	
})(jQuery,window,document);