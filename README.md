# lightRange
##### Main goal
Date range picker under 5kb (compiled, non-gzip) specifically for flight- and hotel dates selection.

Everything alpha for now.

-

##### Preview
Version 2015.12.22: http://cdn.rawgit.com/tommiehansen/lightRange/master/test2.html (popup testing + misc changes)
Version 2015.10.18: http://cdn.rawgit.com/tommiehansen/lightRange/master/test.html

Tip: Resize the browser until the calendar becomes a 'single month' and refresh to see the mobile/small screen example.

This version has a lot of testing-stuff littering test.html for things such as testing different colors etc via colorPicker (html5) or Google Material Design etc.


Current:
Optimizing codebase.

##### Updates

2016.05.13  
Working towards a 0.5 release without any temp/test/random -stuff. I've not committed anything since there isn't anything tangitable to commit. The current working version is a subset of the old stuff and i'm going through line-per-line to make everything better. Basically i've teared every function apart and i've added better naming schemes for everything etc.

2016.03.17    
A lot of testing has been going on to optimize the first initialization and display. As a result the first init + display calendar of 50 months has gone from ~130ms (mobile, android galaxy s4 test phone) to ~20ms. I use the Galaxy S4 + mobile Chrome as a baseline for performance testing. It is literally 10x slower at js then my desktop which make it ideal for testing. 

To achieve the performance bump i split the months into two parts and used js's native execution que to have  all 2+ months be ran after the two first. This has the effect that the user *see* the 2 first months and the UI in ~20ms time. Since users take ~100-150ms to react to a new 'view' it doesn't matter if the rest of the months take ~100ms to render since the rest of the months won't be displayed before the user interacts with the UI. In reality the script is actually slower as a total but to the user (and especially on weak devices) it will appear to be 10x faster.

##### Tests


###### 2015.12.22
USER TEST #1 (mobile):

a) User did not understand that 2nd selection had to be done to select return date.

Solution:
Fix "Apply"; should either be "Select 2nd date" or should trigger a warning pop-up saying "Please select a return date" when button is triggered and no second selection exist.
Option #2 is to add some sort of effect to "Select a date" on arrival; have it blink 2x as fast or something to steal focus.
+ let "Apply" be grayed out
+ change to native swedish

Another solution is to have a message close to the 1st selected date and remove the whole "header" that show the dates since the user isn't looking in that general area when selecting dates.

b) User did not understand that swipe-gestures could be used and opted to use the arrows

Solution: None, this is purely optional.
