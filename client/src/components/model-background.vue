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
      visible="false"
      :rotation="getInventionDetails.rotation"
      :position="getInventionDetails.position"
      :scale="getInventionDetails.scale"
      animation-mixer
    ></a-entity>
    <!-- <a-sphere position="0 -2 0" material="color:red"></a-sphere> -->
    <a-entity shadow-catcher :position="getInventionDetails.shadowCatcherPosition" rotation="-90 0 0" shadow="receive: true"></a-entity>
    <a-entity position="0 0 0" rotation="-10 180 0">
      <a-entity
        ref="camera"
        camera
        :orbit-controls="`target: ${getInventionDetails.cameraTarget}; minDistance: 0.5; maxDistance: 180; initialPosition: ${getInventionDetails.cameraInitialPosition}; enableKeys: false; enablePan: false; enableZoom: true;`"
      ></a-entity>
    </a-entity>
    <a-entity light="type: ambient; color: #e1f7f7; intensity: 0.4"></a-entity>
    <a-entity
      light="type: directional; color: #FFF; intensity: 1; castShadow: true; "
      position="0.5 1 1"
    ></a-entity>
    <a-entity light="type: directional; color: #FFF; intensity: 0.5;" position="0.5 1 -1"></a-entity>
  </a-scene>
</template>

<script>
// import "aframe";
import "aframe-orbit-controls";
import "aframe-extras/dist/aframe-extras.loaders";

import "../aframe-components/cube-env-map.component";
import "../aframe-components/shadow-catcher.component";

import envMapPath from "../assets/Tomoco Studio.png";

const inventionDetails = [
  [
    {
      rotation: "0 0 0",
      position: "0 -3 2.5",
      scale: "0.95 0.95 0.95",
      cameraInitialPosition: "1.5 2 -1",
      shadowCatcherPosition: "0 -3 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -3 1",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "0 1 4.5",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 180 0",
      position: "0 -4 0",
      scale: "1 1 1",
      cameraInitialPosition: "1 2 -3",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    }
  ],
  [
    {
      rotation: "0 270 0",
      position: "0 -2 0",
      scale: "1 1 1",
      cameraInitialPosition: "0 2 -4",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -2 0",
      scale: "1 1 1",
      cameraInitialPosition: "0 1 -3",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -3 0",
      scale: "1 1 1",
      cameraInitialPosition: "0 0.5 -2",
      shadowCatcherPosition: "0 -3 0",
      cameraTarget: "0 -2 0"
    }
  ],
  [
    {
      rotation: "0 0 0",
      position: "0 -3 0",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "1.5 1.5 -4",
      shadowCatcherPosition: "0 -3 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -4 0",
      scale: "0.75 0.75 0.75",
      cameraInitialPosition: "1.5 1.5 -4",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -2 0",
      scale: "0.75 0.75 0.75",
      cameraInitialPosition: "1.5 1.5 -4",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    }
  ],
  [
    {
      rotation: "0 0 0",
      position: "0 -2.15 2.5",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "2 1.5 -3.5",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -3.8 1.5",
      scale: "0.75 0.75 0.75",
      cameraInitialPosition: "2.5 1.5 -3",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 -1 0"
    },
    {
      rotation: "0 0 0",
      position: "0 -2.15 0",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "3 2.5 -4",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    }
  ],
  [
    {
      rotation: "0 0 0",
      position: "0 1 15",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "-2 4 -5",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 1 15",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "-2.5 3 -5",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    },
    {
      rotation: "0 0 0",
      position: "0 1 15",
      scale: "0.65 0.65 0.65",
      cameraInitialPosition: "-3.5 4 -2",
      shadowCatcherPosition: "0 -2 0",
      cameraTarget: "0 0 0"
    }
  ]
];

export default {
  name: "ModelBackground",
  props: {
    invention_piece: {}
  },
  data() {
    return {
      gltfPath: ""
    };
  },
  created() {
    this.envMapPath = envMapPath;
  },
  mounted() {
    // this.$refs.camera.getObject3D('camera').position.set(...this.getInventionDetails.cameraInitialPosition.split(' '))
  },
  updated() {
    this.$refs.camera.getObject3D('camera').position.set(...this.getInventionDetails.cameraInitialPosition.split(' '))
  },
  computed: {
    getGltfPath() {
      let path = this.formatGltfPath(this.invention_piece);
      return path;
    },
    getInventionDetails() {
      return inventionDetails[this.invention_piece.invention][this.invention_piece.piece]
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
      let inventionNumber = invention_piece.invention;
      let pieceNumber = invention_piece.piece + 1;

      let inventionName = this.inventionToString(invention_piece.invention);

      return `static/${inventionName}/${inventionName}_Piece_${pieceNumber}.gltf`;
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
  },
  watch: {
    invention_piece: function(newVal) {
      let path = this.formatGltfPath(newVal);
      this.$refs.model.setAttribute("gltf-model", path);
    }
  }
};
</script>

<style scoped>
a-scene {
  height: calc(var(--inner-height) * (530 / 1920)) !important;
  width: calc(100% * (915 / 1080)) !important;

  /* height: calc(var(--inner-height) * (530 / 1920) / (1023 / 514));
  width: calc(100vw * (((1023 - (2 * 51)) / 1080) / (1023 / 514))); */

  position: absolute !important;
  left: calc(100% * (82 / 1080)) !important;
  top: calc(var(--inner-height) * (-77 / 1920)) !important;

  /* clip-path: inset(76px 147px 45px 141px); */
  z-index: 0;
}
</style>