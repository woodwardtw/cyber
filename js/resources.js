const thisUrl = window.location.href;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cardId = urlParams.get('id')


//https://cards.alplearn.com/wp-json/wp/v2/card/90
//fetch cards
const url = 'https://cards.alplearn.com/wp-json/wp/v2/card/'+cardId
const holder = document.getElementById('data')
var cardContentJson = [];
 $(document).ready(function() {
      var def = new jQuery.Deferred();
      $.ajax({
        url: url,
        jsonp: "cb",
        dataType: 'json',
        success: function(data) {         
               console.log(data)
               let postId = data.id;
               let slug = data.acf.types.slug;
               let question = data.title.rendered;
             
               if(data.acf.resources){
                    var resource = data.acf.resources;
               } else {
                    var resource = "<div>We're still growing our resources and will have information here soon!</div>";
               }

               const cardHolder = document.querySelector('#question')
               cardHolder.innerHTML = question;

               const resourceHolder = document.querySelector('#resource')
               resourceHolder.innerHTML = resource;
              // console.log(item.acf.types.name)
             // cardContentJson.push(`<div data-post-id="${postId}" class="${slug} modal-card">${title}</div>`)
            const emailLink = document.querySelector('#email-me')
            emailLink.href = `mailto:?subject=COSN's%20Cybersecurity%20Question&body=${question}%0D%0A%0D%0Afrom%20${thisUrl}`

            const tweetLink = document.querySelector('#tweet-me')
            tweetLink.href = `https://twitter.com/intent/tweet?text=${question} ${thisUrl}&hashtags=cosn%2CDell%2Ccybersecurity`;       
          } //success
           
      }); //ajax  
       
    }); //ready

