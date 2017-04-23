var EventHandler = {
	on: function(options, success){
		document.addEventListener(options.action, function(event){
			var target = event.target;
			while(target != document){
				if(target.getAttribute(options.attr)){
					success.call(this, event, target, options.attr);
					return;
				}
				target = target.parentNode;
			}
		}, false);
	}
};

var Ajax = {
	getXHR: function(){
  	var xhr;
  	try {
    	xhr = new ActiveXObject("Msxml2.XMLHTTP");
  	} catch (e) {
    	try {
      	xhr = new ActiveXObject("Microsoft.XMLHTTP");
    	} catch (E) {
      	xhr = false;
    	}
  	}
  	if (!xhr && typeof XMLHttpRequest != 'undefined') {
    	xhr = new XMLHttpRequest();
  	}
  	return xhr;
	},
	post: function(url, onSendData, callback){
		var xhr = this.getXHR(),
		 		onSendData = JSON.stringify(onSendData);

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(onSendData);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				callback.call(xhr.responseText);
			}
		};
	},
  get: function(url, callback){
    var xhr = this.getXHR();

		xhr.open('GET', options.url, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(null);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				callback.call(xhr.responseText);
			}
		};
  },
  page: function(pageName, callback){
    var xhr = this.getXHR();
		globalMenuIsActive = false;

		xhr.open('GET', 'pages/' + pageName + '.html', true);
		xhr.send(null);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				callback.call(xhr.responseText);
			}
		};
  }
};

function addClass(DOM_Element, className){
	DOM_Element.classList.add(className);
}

function removeClass(DOM_Element, className){
	DOM_Element.classList.remove(className);
}

function getStyles(DOM_Element, property){
	var propertyValue = getComputedStyle(DOM_Element)[property];
	return +propertyValue.substr(0, propertyValue.length - 2);
}

function removeElement(DOM_Element){
	DOM_Element.parentNode.removeChild(DOM_Element);
}

function isEmptyObject(object){
	for(key in object){
		if(object.hasOwnProperty(key)){
			return false;
		}
	}
	return true;
}
