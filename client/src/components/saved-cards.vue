<template>
    <div class="saved-cards">
        {{saved_cards.length||0}}
        <button @click="useSavedCard">Use</button>
    </div>
</template>

<script>
export default {
    name: 'SavedCards',
    props: {
        saved_cards: Array
    },
    methods: {
        async useSavedCard() {
            let used_card = this.saved_cards.pop()
            let response = await this.$store.dispatch('updatePower', 'USE_SAVED_CARD')
            this.$emit('useSavedCard', used_card)
        }
    }
}
</script>

<style>
    .saved-cards {
        display: inline;
        margin: 5px;
    }
</style>
