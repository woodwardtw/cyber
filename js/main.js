let addPlayer = document.getElementById('add-player')
addPlayer.addEventListener('click', newPlayer);

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
      let scoreBox = button.parentNode.querySelector('.score')
      let score = parseInt(scoreBox.textContent)
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


let timerButton = document.getElementById('timer-start');
		
timerButton.addEventListener('click', () => {
  if($('#time-display').data('state')=='paused'){
    $("#time-display").timer('resume');
    return;
  }
  if($('#time-display').data('state')=='running'){
      $("#time-display").timer('remove')
    }
    $("#time-display").timer({
      countdown: true,
      format: '%M:%S',
      duration:  parseInt(document.getElementById('time').value)+'m',   
      callback: function() {
        alert('Time is up!');
      }
    });  
  
});

let timerPauseButton = document.getElementById('timer-pause');
    
timerPauseButton.addEventListener('click', () => { 
 $('#time-display').timer('pause');
})

//expand scroll to
$(".collapse").on("shown.bs.collapse", function(){
    var current = $(this);
    $([document.documentElement, document.body]).animate(
        {scrollTop: current.offset().top},
        100
    );
});



//MODAL




//fetch cards
const url = 'https://cards.alplearn.com/wp-json/wp/v2/card?per_page=99'
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
               // console.log(item)
               let postId = item.id;
               let slug = item.acf.types.slug;
               let title = item.title.rendered;
              // console.log(item.acf.types.name)
              cardContentJson.push(`<div data-post-id="${postId}" class="${slug} modal-card">${title}</div>
                <a class="learn-more" target="_blank" href="resources.html?id=${postId}">Learn More</a>`)
            }); //each          
          } //success
      }); //ajax  
       console.log(cardContentJson)
    }); //ready


let resuffleButton = document.getElementById('redeal');  
resuffleButton.addEventListener('click', () => { 
    resuffleCards(cardContentJson);
})


function resuffleCards(cardContentJson){
  console.log(cardContentJson);
  let levels = getLevels();
  const url = 'https://cards.alplearn.com/wp-json/wp/v2/card?per_page=99'+ levels;
  console.log(url);
  const holder = document.getElementById('data')
   $(document).ready(function() {
        var def = new jQuery.Deferred();
        $.ajax({
          url: url,
          jsonp: "cb",
          dataType: 'json',
          success: function(data) {         
              $.each(data, function(index, item) {
                 console.log(item)
                 let postId = item.id;
                 let slug = item.acf.types.slug;
                 let title = item.title.rendered;
                // console.log(item.acf.types.name)
                cardContentJson.push(`<div data-post-id="${postId}" class="${slug} modal-card">${title}</div>
                  <a class="learn-more" target="_blank" href="resources.html?id=${postId}">Learn More</a>`)
              }); //each          
            } //success
        }); //ajax  

      }); //ready
        console.log('after')
        console.log(cardContentJson)
 }

 function getLevels(){
  const checkboxes = document.querySelector('#level-checkboxes');
  const inputs = checkboxes.querySelectorAll('input');
  let selectedLevels = [];
  inputs.forEach((input) => {
    if(input.checked == true){
        selectedLevels.push(input.value)
    }
  });

  if (selectedLevels.length >0){
       return '&level=' + selectedLevels.join()
  } else {
    return;
  }
}


 //draw a card
let exampleModal = document.getElementById('exampleCard')
exampleModal.addEventListener('show.bs.modal', function (event) {
  let button = event.relatedTarget;
  let modalBodyInput = exampleModal.querySelector('.modal-body');
  modalBodyInput.innerHTML = cardContentJson[Math.floor(Math.random()*cardContentJson.length)+1]; //Math.floor(Math.random() * 10) + 1
  console.log(Math.floor(Math.random()*cardContentJson.length)+1);
  console.log(cardContentJson)
})    

