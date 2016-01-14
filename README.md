# lightRange
##### Main goal
Date range picker under 5kb (compiled, non-gzip) specifically for flight- and hotel dates selection.

Everything alpha for now.

-

##### Preview
Version 2015.12.22: http://cdn.rawgit.com/tommiehansen/lightRange/master/test2.html (popup testing + misc changes)
Version 2015.10.18: http://cdn.rawgit.com/tommiehansen/lightRange/master/test.html

This version has a lot of testing-stuff littering test.html for things such as testing different colors etc via colorPicker (html5) or Google Material Design etc.


-

Current:
Debating showing next/prev months within a view since it can be somewhat confusing and isn't reallt needed when showing 2x calendars. It only is good when swithing to mobile (under 500px) and when 1x calendar month is visible. The next/prev-months also add a lot of additional javascript and if-statements.

##### Tests


2015.12.22
--------------------------
USER TEST #1 (mobile):

a) User did not understand that 2nd selection had to be done to select return date.

Solution:
Fix "Apply"; should either be "Select 2nd date" or should trigger a warning pop-up saying "Please select a return date" when button is triggered and no second selection exist.
Option #2 is to add some sort of effect to "Select a date" on arrival; have it blink 2x as fast or something to steal focus.
+ let "Apply" be grayed out
+ change to native swedish

Another solution is to have a message close to the 1st selected date and remove the whole "header" that show the dates since the user isn't looking in that general area when selecting dates.

b) User did not understand that swipe-gestures could be used but opted for the arrows

Solution: None, this is purely optional.