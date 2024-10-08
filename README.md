# Slot Machine

***

## To Do For Design

- ~~Create a heading.~~
- ~~Create a description.~~
- ~~Create box div~~
  - ~~Multiplier buttons~~
  - ~~Spin button~~
  - ~~Credits box~~
- ~~Create the point system (pay table) and possibly show a pay line as the next div.~~
- ~~Create a div with the three to five reels (slots).~~
- Edit symbols to be all the same size.
- ~~Create an event where when the spin ends, the images that are within the center row are maybe either lit up or the other images become opaque.~~
- Have the reels look like they're actually spinning with some type of transform in CSS.

***

## To Do For JavaScript

- ~~Create an event where the images in the reels spin.~~
- ~~The multipler buttons will need to decrease the credit amount.~~
- ~~Wins will need to add to the credit amount.~~
- ~~The spin button will have to take into account the last multiplier used and take this from the credits/apply to the possible winnings.~~
- ~~Change the color of buttons when clicked.~~
  - ~~For multiplier buttons, the color change will remain indefinitely until another multiplier button is pressed.~~
  - ~~For spin button, it will only happen on a click on and will be temporary.~~
- ~~Choosing a multiplier should be disabled until spin is finished.~~
- ~~After a spin function is executed, I want to have a note saying if the user won or lost.~~
- ~~When user gets a free spin, it should automatically spin again or they can click spin.~~

***

### Other Ideas

- ~~A note mentioning if the user is out of credits or not. Or perhaps the multipliers and spin button just all become disabled without a note.~~
- Make this appear nice on mobile phones.
- ~~Change the paytable or amount of symbols in each reel. It seems to be nearly impossible to get any wins. I know that's the point of slot machines but it doesn't make it enjoyable to play my game.~~
- Should there be hidden prizes that the user can cash out for like at an arcade? They could be hidden behind images of wrapped presents and an event would reveal the "prize" underneath.

### Issues/Bugs

- ~~Credits are not decreasings when the buttons are pressed.~~
- ~~I need to make sure that when I win, the credits are proportional to the multiplier clicked.~~
- ~~The message about winning, losing, needing more credits, etc. shouldn't shift the buttons down everytime it appears.~~

- The pay table boxes need to be adjusted so that things stay inside when page is shrunk/expanded. Possibly a flex issue or need to make the images responsive.
- My main focus right now is making sure things work based on my code and learning. This is why I created project.js and only connect to that one in my HTML. Later, I will spend more time on organizing project.js into the smaller and more specific files (reels.js, credits.js, buttons.js) I originally made and connecting between those.
