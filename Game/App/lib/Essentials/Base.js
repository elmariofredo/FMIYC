
/**
 * Get Unique id ! DEPRECATED USE GameClass.unique_id instead !
 * @return {Integer} Unique id based on timestamp and random
 */
var uniq_id = function() {
  return ~~(new Date().getTime()+ Math.random()*10000000);
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


