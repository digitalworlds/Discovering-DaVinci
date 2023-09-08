import posx from "../assets/Cubemap/posx.png";
import posy from "../assets/Cubemap/posy.png";
import posz from "../assets/Cubemap/posz.png";
import negx from "../assets/Cubemap/negx.png";
import negy from "../assets/Cubemap/negy.png";
import negz from "../assets/Cubemap/negz.png";

AFRAME.registerComponent("cube-env-map", {
  schema: {
    extension: { default: "jpg" },
    format: { default: "RGBAFormat" },
    enableBackground: { default: false }
  },

  init: function() {
    const data = this.data;

    this.texture = new THREE.CubeTextureLoader().load([
      posx,
      negx,
      posy,
      negy,
      posz,
      negz
    ]);

    this.texture.format = THREE[data.format];

    if (data.enableBackground) {
      this.el.sceneEl.object3D.background = this.texture;
    }

    this.applyEnvMap();
    this.el.addEventListener("object3dset", this.applyEnvMap.bind(this));
  },

  applyEnvMap: function() {
    const mesh = this.el.getObject3D("mesh");
    const envMap = this.texture;

    if (!mesh) return;

    mesh.traverse(function(node) {
      if (node.material && "envMap" in node.material) {
        node.material.envMap = envMap;
        node.material.metalness = 0.95;
        node.material.roughness = 1;
        node.material.needsUpdate = true;
      }
    });
  }
});