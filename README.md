# Slot Machine

***

## To Do For Design

- ~~Create a heading.~~
- ~~Create a description.~~
- Create box div
  - Multiplier buttons
  - Spin button
  - Credits box
- Create the point system (pay table) and possibly show a pay line as the next div.
- Create a div with the three to five reels (slots).

***

## To Do For JavaScript

- Create an event where the images in the reels spin.
- Create an event where when the spin ends, the images that are within the center row are maybe either lit up or the other images become opaque.
- The multipler buttons will need to decrease the credit amount.
- Wins will need to add to the credit amount.
- The spin button will have to take into account the last multiplier used and take this from the credits/apply to the possible winnings.
- Change the color of buttons when clicked.
  - For multiplier buttons, the color change will remain indefinitely until another multiplier button is pressed.
  - For spin button, it will only happen on a click on and will be temporary.
- When user gets a free spin, it should automatically spin again or they can click spin. Either way, choosing a multiplier should be disabled until spin is finished.

***

### Other Ideas

- Should there be hidden prizes that the user can cash out for like at an arcade? They could be hidden behind images of wrapped presents and an event would reveal the "prize" underneath.

### Issues/Bugs

- The pay table boxes need to be adjusted so that things stay inside when page is shrunk/expanded. Possibly a flex issue or need to make the images responsive.
