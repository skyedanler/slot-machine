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

***

## To Do For JavaScript

- Create an event where the images in the reels spin.
- Create an event where when the spin ends, the images that are within the center row are maybe either lit up or the other images become opaque.
- ~~The multipler buttons will need to decrease the credit amount.~~
- Wins will need to add to the credit amount.
- ~~The spin button will have to take into account the last multiplier used and take this from the credits/apply to the possible winnings.~~
- ~~Change the color of buttons when clicked.~~
  - ~~For multiplier buttons, the color change will remain indefinitely until another multiplier button is pressed.~~
  - ~~For spin button, it will only happen on a click on and will be temporary.~~
- When user gets a free spin, it should automatically spin again or they can click spin. Either way, choosing a multiplier should be disabled until spin is finished.
- After a spin function is executed, I want to have a note saying if the user won or lost. 

***

### Other Ideas

- Should there be hidden prizes that the user can cash out for like at an arcade? They could be hidden behind images of wrapped presents and an event would reveal the "prize" underneath.
- ~~A note mentioning if the user is out of credits or not. Or perhaps the multipliers and spin button just all become disabled without a note.~~

### Issues/Bugs

- The pay table boxes need to be adjusted so that things stay inside when page is shrunk/expanded. Possibly a flex issue or need to make the images responsive.
- ~~Credits are not decreasings when the buttons are pressed.~~
- My main focus right now is making sure things work based on my code and learning. This is why I created project.js and only connect to that one in my HTML. Later, I will spend more time on organizing project.js into the smaller and more specific files (reels.js, credits.js, buttons.js) I originally made and connecting between those.
