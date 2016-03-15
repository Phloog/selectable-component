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

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var self = this;

    this.el.addEventListener('click', function (e) {
      if (e.target === self.el) {
        self.select(null);
        return;
      }

      self.select(e.target);
    });
  },

  select: function (entity) {
    this.selected = entity;

    var event = new Event('selected');
    event.selected = this.selected;
    this.el.dispatchEvent(event);

    var obj = this.el.object3D;

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
