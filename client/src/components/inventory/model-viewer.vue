<template>
  <a-scene
    renderer="colorManagement: true;"
    ref="scene"
    embedded
    vr-mode-ui="enabled: false"
    loading-screen="enabled: false"
  >
    <a-entity
      shadow="cast: true; receive: true"
      cube-env-map
      ref="model"
      :rotation="inventionDetails.rotation"
      :position="inventionDetails.position"
      :scale="inventionDetails.scale"
      animation-mixer
    ></a-entity>
    <a-entity
      shadow-catcher
      :position="inventionDetails.shadowCatcherPosition"
      rotation="-90 0 0"
      shadow="receive: true"
    ></a-entity>
    <a-entity position="0 0 0" rotation="-10 180 0">
      <a-entity
        camera
        :orbit-controls="`target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: ${inventionDetails.cameraInitialPosition}; enableKeys: false; enablePan: false; enableZoom: false;`"
      ></a-entity>
    </a-entity>
    <a-entity light="type: ambient; color: #e1f7f7; intensity: 0.4"></a-entity>
    <a-entity
      light="type: directional; color: #FFF; intensity: 1; castShadow: true; shadowCameraTop: 10;shadowCameraLeft: -6.5; shadowCameraRight: 6.5; shadowCameraFar: 250;"
      position="0.5 2 1"
    ></a-entity>
    <a-entity light="type: directional; color: #FFF; intensity: 0.5;" position="0.5 1 -1"></a-entity>
  </a-scene>
</template>

<script>
// import "aframe";
import "aframe-orbit-controls";
import "aframe-extras/dist/aframe-extras.loaders";

import "../../aframe-components/cube-env-map.component";
import "../../aframe-components/shadow-catcher.component";

import envMapPath from "../../assets/Tomoco Studio.png";

const inventionDetails = [
  {
    rotation: "0 0 0",
    position: "0 -2 0",
    scale: "0.65 0.65 0.65",
    cameraInitialPosition: "-1.5 4 6",
    shadowCatcherPosition: "0 -2 0"
  },
  {
    rotation: "0 0 0",
    position: "0 -2 0",
    scale: "0.95 0.95 0.95",
    cameraInitialPosition: "0 3 -4",
    shadowCatcherPosition: "0 -2 0"
  },
  {
    rotation: "0 0 0",
    position: "0 -4 0",
    scale: "0.95 0.95 0.95",
    cameraInitialPosition: "2 2.5 -6",
    shadowCatcherPosition: "0 -4 0"
  },
  {
    rotation: "0 90 0",
    position: "0 -2.15 0",
    scale: "0.65 0.65 0.65",
    cameraInitialPosition: "4 2 -2",
    shadowCatcherPosition: "0 -2 0"
  },
  {
    rotation: "0 0 0",
    position: "-2 1 0",
    scale: "0.65 0.65 0.65",
    cameraInitialPosition: "0 3 -4",
    shadowCatcherPosition: "0 -2 0"
  }
];

export default {
  name: "ModelViewer",
  props: {
    invention_piece: 0
  },
  data() {
    return {
      gltfPath: "",
      inventionDetails: {}
    };
  },
  created() {
    this.envMapPath = envMapPath;
    this.inventionDetails = inventionDetails[this.invention_piece];
  },
  mounted() {
    let path = this.getGltfPath;
    this.$refs.model.setAttribute("gltf-model", path);
  },
  computed: {
    getGltfPath() {
      let path = this.formatGltfPath(this.invention_piece);
      return path;
    }
  },
  methods: {
    toggleDisplay() {
      let visible = this.$refs.model.getAttribute("visible");
      this.$refs.scene.style.zIndex =
        this.$refs.scene.style.zIndex == 0 ? 2002 : 0;
      this.$refs.model.setAttribute("visible", visible ? false : true);
    },
    formatGltfPath(invention_piece) {
      let inventionNumber = invention_piece;
      let inventionName = this.inventionToString(invention_piece);

      return `static/${inventionName}/${inventionName}.gltf`;
    },
    inventionToString(invention) {
      let names = [
        "Ornithopter",
        "AerialScrew",
        "RoboticKnight",
        "PrintingPress",
        "Cart"
      ];

      return names[invention];
    }
  }
};
</script>

<style scoped>
a-scene {
  height: calc(100vw * (530 / 1080)) !important;
  width: 100% !important;
}

@media screen and (min-device-width: 536px) {
  a-scene {
    height: calc(536px * (530 / 1080)) !important;
  }
}
</style>