## aframe-selected-component

An Selected component for [A-Frame](https://aframe.io) VR.

### Properties

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Usage

#### Browser Installation

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/latest/aframe.min.js"></script>
  <script src="https://rawgit.com/scenevr/selected-component/master/dist/aframe-selected-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity selected="exampleProp: exampleVal"></a-entity>
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-selected-component
```

Then register and use.

```js
require('aframe');
require('aframe-selected-component');
```
