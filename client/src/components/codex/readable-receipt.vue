<template>
  <div class="readable-receipt">
    <div v-for="(invention, index) in inventionPieces" :key="index">
      <div class="entry" v-for="(piece, index) in invention" :key="index">{{getReceiptEntry(piece)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadableReceipt",
  props: {
    receipt: ""
  },
  data() {
    return {
      inventionPieces: {}
    };
  },
  created() {
    this.parseReceipt();
  },
  methods: {
    parseReceipt() {
      let receipt = JSON.parse(this.receipt);

      if (receipt.length) {
        receipt.forEach(piece => {
          if (!this.inventionPieces[piece.invention])
            this.inventionPieces[piece.invention] = {};

          if (!this.inventionPieces[piece.invention][piece.piece])
            this.inventionPieces[piece.invention][piece.piece] = [];

          this.inventionPieces[piece.invention][piece.piece].push(piece);
        });
      }
    },
    pieceToString(piece) {
      let inventions = [
        "Ornithopter",
        "Aerial Screw",
        "Robotic Knight",
        "Printing Press",
        "Self-Propelled Cart"
      ];

      let pieces = [
        ["Wings", "Tail", "Body"],
        ["Rotary Wing", "Platform", "Mast"],
        ["Upper Body", "Lower Body", "Mechanical Parts"],
        ["Platen", "Typebed", "Pulley"],
        ["Frame", "Mechanical Parts", "Wheels and Axle"]
      ];

      return `${inventions[piece.invention]} ${
        pieces[piece.invention][piece.piece]
      }`;
    },
    getReceiptEntry(piece) {
      return `${piece.length} x ${this.pieceToString(piece[0])}`;
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: MyriadPro-SemiBold;
  src: url(../../assets/MYRIADPRO-SEMIBOLD.woff);
}

.readable-receipt {
  flex-wrap: wrap;
  width: calc(100vw * (750 / 1080));
  margin: auto;
}

div.entry {
  font-family: "MyriadPro-SemiBold";
  font-size: calc(100vw * (36 / 1080));
}

@media screen and (min-device-width: 536px) {
  div.entry {
    font-size: calc(536px * (36 / 1080));
  }
  .readable-receipt {
  width: calc(536px * (750 / 1080));
}
}
</style>