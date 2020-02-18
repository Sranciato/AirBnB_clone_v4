const idList = [];
const nameList = [];

function htmlForPlace (place) {
  const article = $(`
    <article>
      <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night">
          $${place.price_by_night}
        </div>
      </div>
      <div class="information">
        <div class="max_guest">
          <i class="fa fa-users fa-3x" aria-hidden="true"></i>
          <br/>
          ${place.max_guest} Guests
        </div>
        <div class="number_rooms">
          <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
          <br />
          ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
          <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
          <br />
          ${place.number_bathrooms} Bathroom
        </div>
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article>
    `);
  $('.places').append(article);
}

$(() => {
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      idList.push($(this).data('id'));
      nameList.push($(this).data('name'));
    } else {
      const index = idList.indexOf($(this).data('id'));
      idList.splice(index, 1);
      nameList.splice(index, 1);
    }
    if (idList.length < 1) {
      $('.amenities h4').text('\xa0');
    } else {
      $('.amenities h4').text(nameList.join(', '));
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      $('#api_status').addClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    success: function (response) {
      for (const place of response) {
        htmlForPlace(place);
      }
    }
  });
  $('button').click(function(){
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({amenities: idList}),
      contentType: 'application/json',
      success: function (response) {
        for (const place of response) {
          console.log("on click!")
          htmlForPlace(place);
        }
      }
    });
  });
});
