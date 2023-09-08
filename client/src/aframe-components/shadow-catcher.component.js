// https://stackoverflow.com/questions/35710130/shadow-catcher-in-three-js-shadow-on-transparent-material/35711403#35711403
AFRAME.registerComponent("shadow-catcher", {
  init: function() {
    var el = this.el;

    var material = new THREE.ShadowMaterial();
    var geometry = new THREE.PlaneBufferGeometry(50, 50, 50);

    material.opacity = 0.5;

    var mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    el.setObject3D("mesh", mesh);
  }
});