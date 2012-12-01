/**
 * Basic Game Class Object
 *
 * Depends on
 *   Class.js  
 * 
 */

(function (window, undefined) {

  var GameClass = Class.extend({

    unique_id: function () {
      return ~~( new Date().getTime() + Math.random()*10000000 );
    },

    unique_name: function () {
      return ( this.name +'_'+ this.id );
    },

    getColor: function (color) {
      return 'rgba('+ color.join( ', ' ) +')';
    }

  });

  window.GameClass = GameClass;
} (window));