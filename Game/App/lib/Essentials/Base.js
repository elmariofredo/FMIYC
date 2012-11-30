
/**
 * Get Unique id
 * @return {Integer} Unique id based on timestamp and random
 */
var uniq_id = function() {
  return ~~(new Date().getTime()+ Math.random()*10000000);
}

/**
 * Get Screen Width
 * @return {Integer} Screen Width
 */
function getWidth() {
  if( typeof( window.innerWidth ) == 'number' ) {
    return window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    return document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    return document.body.clientWidth;
  }
}

/**
 * Get Screen Height
 * @return {Integer} Screen Height
 */
function getHeight() {
  if( typeof( window.innerWidth ) == 'number' ) {
    return window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    return document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientHeight || document.body.clientHeight ) ) {
    return document.body.clientHeight;
  }
}

/**
 * Get Height to keep proportions
 * @param  {[type]} pWidth  [description]
 * @param  {[type]} pHeight [description]
 * @return {[type]}         [description]
 */
var getPropotionalHeight = function(pWidth, pHeight) {
  return pHeight*(getHeight()/pWidth)
}


var centerImage = function(position, size) {
  return ( position - ( size / 2 ) );
}


