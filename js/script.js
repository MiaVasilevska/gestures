//Get the gesture and the gesture element
const touchArea = document.getElementById("gesture");
const gestureOutput = document.getElementById("desciption");


//Click and Double click
let timer;
let isSwiped = false;

    touchArea.onclick = event => {
    isSwiped = false;
    if (event.detail === 1) {
      if(!hasMoved){
        if (event.detail === 1) {
          timer = setTimeout(() => {
            gestureOutput.innerHTML = "<img src='images/tapping.png'/>";
          }, 200)
    }
      }
    } else if (event.detail === 2) {
      clearTimeout(timer)
      gestureOutput.innerHTML = "<img src='images/double tapping.png'/>";
      isClick = false;
    }
 };


 //Holding

 var onlongtouch; 
 var time;
 var touchduration = 500; //length of time we want the user to touch before we do something

 function touchstart(e) {
     e.preventDefault();
     if (!time) {
         time = setTimeout(onlongtouch, touchduration);
     }
 }
 
 function touchend() {
     //stops short touches from firing the event
     if (time) {
         clearTimeout(time);
         time = null;
     }
 }
 
 onlongtouch = function() { 
     time = null;
     gestureOutput.innerHTML = "<img src='images/holding.png'/>";
 };
 
 touchArea.addEventListener("mousedown", touchstart, false);
 touchArea.addEventListener("mouseup", touchend, false);
 

//swipe touch and mouse

 
 //Initial mouse X and Y positions are 0
 
let mouseX = 0;
let initialX = 0;
let mouseY = 0;
let initialY = 0;
let isClick;
let hasMoved = false;
let deviceType = "";

 //Events for touch and mouse
 let events = {
   mouse: {
     down: "mousedown",
     move: "mousemove",
     up: "mouseup",
   },
   touch: {
     down: "touchstart",
     move: "touchmove",
     up: "touchend",
   },
 };
  
 //Detect touch device
 const isTouchDevice = () => {
   try {
     //Try to create TouchEvent (it would fail for desktops and throw error)
     document.createEvent("TouchEvent");
     deviceType = "touch";
     return true;
   } catch (e) {
     deviceType = "mouse";
     return false;
   }
 };
 
 //Get left and top of touchArea
 let rectLeft = touchArea.getBoundingClientRect().left;
 let rectTop = touchArea.getBoundingClientRect().top;
 
 //Get Exact X and Y position of mouse/touch
 const getXY = (e) => {
   mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
   mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
 };
 
 isTouchDevice();
 
 //Start Swipe
 touchArea.addEventListener(events[deviceType].down, (event) => {
   isSwiped = true;
   hasMoved = false;
   //Get X and Y Position
   getXY(event);
   initialX = mouseX;
   initialY = mouseY;
 });
 
 //Mousemove / touchmove
 touchArea.addEventListener(events[deviceType].move, (event) => {

  if (!isTouchDevice()) {
     event.preventDefault();
   }
   if (isSwiped) {
     getXY(event);
     let diffX = mouseX - initialX;
     let diffY = mouseY - initialY;
     if (Math.abs(diffY) > Math.abs(diffX)) {
      gestureOutput.innerHTML = diffY > 0 ? "<img src='images/arrow down new..png'/>" : "<img src='images/arrow up.png'/>";
     } else {
      gestureOutput.innerHTML = diffX > 0 ? "<img src='images/Arrow-right-512.png'/>" : "<img src='images/arrow left.png'/>";
     }
     hasMoved = true;
   }
 });
 
 //Stop moving
 touchArea.addEventListener(events[deviceType].up, () => {
  if(hasMoved){
   isSwiped = false;
  }
 });
 
  touchArea.addEventListener("mouseleave", () => {
    isSwiped = false;
  });
 
 window.onload = () => {
   isSwiped = false;
 };


