/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* globals AFRAME, Event, THREE */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	/**
	 * Selected component for A-Frame.
	 */
	AFRAME.registerComponent('selectable', {
	  schema: { },

	  /**
	   * Called once when component is attached. Generally for initial setup.
	   */
	  init: function () {
	    this.selected = null;
	  },

	  getScene: function () {
	    var result = this.el;

	    while (result.parentNode && result.nodeName !== 'a-scene') {
	      result = result.parentNode;
	    }

	    return result;
	  },

	  /**
	   * Called when component is attached and when component data changes.
	   * Generally modifies the entity based on the data.
	   */
	  update: function (oldData) {
	    var self = this;

	    var preventDefault = false;

	    this.getScene().addEventListener('click', function (e) {
	      if (preventDefault) {
	        return;
	      }

	      self.select(null);
	    });

	    this.el.addEventListener('click', function (e) {
	      if (e.target === self.el) {
	        return;
	      }

	      self.select(e.target);

	      preventDefault = true;

	      // fixme: gross
	      setTimeout(function () {
	        preventDefault = false;
	      }, 5);
	    });
	  },

	  select: function (entity) {
	    var obj = this.el.object3D;

	    this.selected = entity;

	    var event = new Event('selected');
	    event.selected = this.selected;
	    this.el.dispatchEvent(event);

	    if (this.bbox) {
	      obj.remove(this.bbox);
	      delete this.bbox;
	    }

	    if (this.selected) {
	      this.bbox = new THREE.BoundingBoxHelper(this.selected.object3D, '#ff7700');
	      this.bbox.update();
	      obj.add(this.bbox);
	    }
	  },

	  /**
	   * Called when a component is removed (e.g., via removeAttribute).
	   * Generally undoes all modifications to the entity.
	   */
	  remove: function () {
	    if (this.bbox) {
	      this.el.object3D.remove(this.bbox);
	    }

	    // Unassign
	    this.selected = null;
	    this.bbox = null;
	  },

	  /**
	   * Called on each scene tick.
	   */
	  tick: function (t) {
	    if (this.bbox) {
	      this.bbox.update();
	    }
	  },

	  /**
	   * Called when entity pauses.
	   * Use to stop or remove any dynamic or background behavior such as events.
	   */
	  pause: function () { },

	  /**
	   * Called when entity resumes.
	   * Use to continue or add any dynamic or background behavior such as events.
	   */
	  play: function () { }
	});


/***/ }
/******/ ]);