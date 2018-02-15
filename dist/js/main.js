// var appId = 'a971f7aec432915057c12fbd6cc3b0eeceb36bbf1aa2e5803640f63dd17c2a7c';
var appId = '5701b0e486ddba1908670f65038dbb2d64430eea5c7fed49c05c991129428042'
var page = 3;
var perPage = 20;


location.hash = page
uploadPhotos(page);

for (var i = 1; i <= 20; i++) {
  var pagin = document.createElement('a');
  pagin.classList.add('pagin');
  pagin.innerHTML = i;
  pagin.setAttribute('href', '#'+i)
  document.querySelector('.pagins-wrapper').appendChild(pagin);
}




function onload() {
  $('.card').click(function () {
    $('.modal-section').fadeIn();
    $('.modal-section .content').css({
      "transform": "scale(1)"
    });
    modalSetImage($(this)[0]);
    setMaster($(this)[0]);
    setDownloads($(this)[0]);
  });

  $('.modal-section .overlay').click(function () {
  $('.modal-section .content').css({
    "transform": "scale(.5)"
  });
  $('.modal-section').fadeOut();
  });

  
  $('.modal-section .downloads .download').click(function () {
    if ($('.modal-section .downloads .other-format').css('display') === 'none') {
    $('.modal-section .downloads .other-format').fadeIn();
    $('.modal-section .downloads .other-format').css({
      'transform': 'scale(1)'
    });
    } else {
      $('.modal-section .downloads .other-format').fadeOut();
      $('.modal-section .downloads .other-format').css({
        'transform': 'scale(.5)'
      });
    }
  });
}



function createElement() {
  var col = document.createElement('div');
  var card = document.createElement('div');
  col.classList.add('col-l');
  card.classList.add('card');
  col.appendChild(card);
  return col;
}

function setImage(el, data) {
  el.setAttribute('style', 'background-image: url('+ data.urls.small +')');
  el.setAttribute('full-image', data.urls.regular);
  el.setAttribute('color', data.color);
  el.setAttribute('autor-avatar', data.user.profile_image.small);
  el.setAttribute('autor-name', data.user.name);
  el.setAttribute('raw-download', data.urls.raw);
  el.setAttribute('full-download', data.urls.full);
}

function modalSetImage(obj) {
  $('.modal-section .overlay').css({
    'background-color': obj.getAttribute('color')
  });
  $('.modal-section .content .image').css({
    'background-image': 'url(' + obj.getAttribute('full-image') + ')',
    'background-color': obj.getAttribute('color')
  });
}

function setMaster(obj) {
  $('.modal-section .content .autor-info .autor-avatar').css({
    'background-image': 'url(' + obj.getAttribute('autor-avatar') + ')',
    'background-color': obj.getAttribute('color')
  });
  $('.modal-section .content .autor-info .autor-name')[0].innerHTML = obj.getAttribute('autor-name');
}

function setDownloads(obj) {
  $('.modal-section .downloads .other-format .raw')[0].setAttribute('href', obj.getAttribute('raw-download'));
  $('.modal-section .downloads .other-format .full-size')[0].setAttribute('href', obj.getAttribute('full-download'));
}




// for spa

window.onhashchange = function() {
  var currentPage = location.hash.slice(1);
  uploadPhotos(currentPage);
}


function uploadPhotos(page) {
  $('.container')[0].innerHTML = '';
  $.getJSON( "https://api.unsplash.com/photos?client_id=" + 
            appId+'&page=' + page + '&per_page=' + perPage
            , function( data ) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    col = createElement();
    setImage(col.querySelector('.card'), data[i])
    document.querySelector('.container').appendChild(col);
  }
  onload();
  });
}
