const idList = [];
const nameList = [];
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
});
