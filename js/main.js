let addPlayer = document.getElementById('add-player')
addPlayer.addEventListener('click', newPlayer)

function newPlayer(){
  let list = document.getElementById('players')
  let li = document.createElement("li");
  li.classList.add('player')
  //li.appendChild(document.createTextNode("New PLayer"));
  li.innerHTML = `
            <span class="name" contenteditable="true">Enter name here</span>
            <div class="score">0</div>
            <button class="plus">+</button>
            <button class="minus">-</button>
            `
  list.appendChild(li);
  selectElementContents(li.querySelector('.name'))
  // scoreUp();
  // scoreDown();
}

function scoreUp(){
  let plusButtons = document.querySelectorAll('.plus')
  plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log(button.parentNode)
      let scoreBox = button.parentNode.querySelector('.score')
      console.log(scoreBox)
      let score = parseInt(scoreBox.textContent)
      console.log('og=' + score)
      let newScore = score+1
      scoreBox.textContent = newScore
    });
});
}

function scoreDown(){
  let minusButtons = document.querySelectorAll('.minus')
  minusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let score = button.parentNode.querySelector('.score')
    console.log(score.innerHTML)
    score.innerHTML = parseInt(score.innerHTML)-1
  });
});
}

//from https://stackoverflow.com/questions/6139107/programmatically-select-text-in-a-contenteditable-html-element/6150060#6150060
function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

document.getElementById("players").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.matches("button")) {
		// List item found!  Output the ID!
     let scoreBox = e.target.parentNode.querySelector('.score')
      console.log(e.target.parentNode.querySelector('.score'))
      let score = parseInt(scoreBox.textContent)
      // console.log('og=' + score)
      if(e.target.matches("button.plus")){
         var newScore = score+1
      } else if(e.target.matches("button.minus")){
         var newScore = score-1
      }
      scoreBox.textContent = newScore
	}
});


var duration;
var display;
//revist timer https://stackoverflow.com/questions/16134997/how-to-pause-and-resume-a-javascript-timer
function startTimer(duration, display, state) {
			    let timer = duration, minutes, seconds;
			    setInterval(function () {
			        minutes = parseInt(timer / 60, 10);
			        seconds = parseInt(timer % 60, 10);

			        minutes = minutes < 10 ? "0" + minutes : minutes;
			        seconds = seconds < 10 ? "0" + seconds : seconds;

			        display.textContent = minutes + ":" + seconds;

			        if (--timer < 0) {
			            timer = 0;
			        }
			    }, 1000);
			    
			}

			let timerButton = document.getElementById('timer-start');
		
			  timerButton.addEventListener('click', () => {
			    const destination = document.getElementById('time-display');
			    duration = parseInt(document.getElementById('time').value)*60;
          startTimer(duration, destination, 'running');
			});


//MODAL

//http://multisitetwo.local/cyber/wp-json/wp/v2/card
//http://multisitetwo.local/cyber/wp-json/wp/v2/framework/
var exampleModal = document.getElementById('exampleCard')
exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  
  var modalBodyInput = exampleModal.querySelector('.modal-body')

  modalBodyInput.innerHTML = cardContentJson[Math.floor(Math.random()*cardContentJson.length)];
})    



//fetch cards
const url = 'http://multisitetwo.local/cyber/wp-json/wp/v2/card?per_page=99'
const holder = document.getElementById('data')
var cardContentJson = [];
 $(document).ready(function() {
      var def = new jQuery.Deferred();
      $.ajax({
        url: url,
        jsonp: "cb",
        dataType: 'json',
        success: function(data) {         
            $.each(data, function(index, item) {
              console.log(item)
              console.log(item.acf.types.name)
              cardContentJson.push("<div class='" + item.acf.types.slug + "'>" + item.title.rendered + "</div>")
            }); //each          
          } //success
      }); //ajax  
      console.log(cardContentJson)
    }); //ready
