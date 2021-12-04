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
               console.log(item)
               let postId = item.id;
               let slug = item.acf.types.slug;
               let title = item.title.rendered;
              // console.log(item.acf.types.name)
              cardContentJson.push(`<div data-post-id="${postId}" class="${slug} modal-card">${title}</div>`)
            }); //each          
          } //success
      }); //ajax  
      console.log(cardContentJson)
    }); //ready