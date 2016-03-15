# Selectable component

Usage:

    <a-scene>
      <a-entity selectable>
        <a-cube position="-2 0 0"></a-cube>
        <a-cube position="2 0 0"></a-cube>
      </a-entity>

      <a-camera position="0 1.8 5">
        <a-entity
          cursor="maxDistance: 30; timeout: 500"
          position="0 0 -5"
          geometry="primitive: ring; radiusInner: 0.1; radiusOuter: 0.15; segmentsTheta: 32"
          material="color: #ff7700; shader: flat">
        </a-entity>
      </a-camera>
    <a-scene>

Now everything inside the first entity will be selectable. Focus the ring on it, and click, to put a bounding box around the selected entity. Fires a `selected` event on the element with the selectable attribute.

    document.querySelector('a-entity[selectable]').addEventListener('selected', (e) => {
      console.log(e.selected);
    });

Only one thing at a time can be selected, but I'm open to pull requests to allow multi-selection.

Click an element again to toggle selection.

Click anywhere else in the scene to remove the selection.