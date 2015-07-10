$(document).ready(function () {
  $.getJSON('https://api.github.com/users/icyflame', function (data) {
    $("#avatar-image").attr('src', data.avatar_url);
  });
});
