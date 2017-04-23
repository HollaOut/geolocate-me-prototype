var globalMenuIsActive = false;
var CURRENT_USER_ID = 1;
var globalWrapper = document.getElementById('wrapper');

window.addEventListener('load', Rest.useToken(), false);

document.addEventListener('click', function(event){
  var target = event.target,
      menu = document.getElementById('menu');

  while(target != document){
    if(target.getAttribute('data-toggle-menu') ||
    (target == menu && globalMenuIsActive))
    {
      removeClass(menu, 'hide');
      addClass(menu, 'show');

      menu.style.left = 0;
      globalMenuIsActive = true;

      return;
    }
    target = target.parentNode;
  }
  if(globalMenuIsActive){
    removeClass(menu, 'show');
    addClass(menu, 'hide');
    menu.style.left = '-81vw';
    globalMenuIsActive = false;
  }
}, false);

var Friends = {
  active: false,
  toggle: function(){
    var friendsWrapper = document.getElementById('friends');

    if(Friends.active){
      friends.style.display = 'none';
      Friends.active = false;
    } else {
      friends.style.display = 'block';
      Friends.active = true;
    }
  }
}
