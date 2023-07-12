<template>
    Olá!
    <v-btn v-if="isAdm">Gerar Relatório 1</v-btn>
    <v-btn v-if="isAdm">Gerar Relatório 2</v-btn>
    <v-btn v-if="isEsc">Gerar Relatório 3</v-btn>
    <v-btn v-if="isEsc">Gerar Relatório 4</v-btn>
    <v-btn v-if="isPil">Gerar Relatório 5</v-btn>
    <v-btn v-if="isPil">Gerar Relatório 6</v-btn>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        isAdm() {
            return this.$store.state.token == "Administrador"
        },
        isEsc() {
            return this.$store.state.token == "Escuderia"
        },
        isPil() {
            return this.$store.state.token == "Piloto"
        }
    }
}
</script>