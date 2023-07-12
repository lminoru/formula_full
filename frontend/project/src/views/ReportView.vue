<template>
    <v-card width="800" class="mx-auto">
        <v-text-field v-if="isAdm" v-model="city_name" :counter="10" label="Nome da cidade" required></v-text-field>
        <v-btn v-if="isAdm" @click="consultarRel1">Gerar Relatório 1</v-btn>
        <v-btn v-if="isAdm" @click="consultarRel2">Gerar Relatório 2</v-btn>
        <v-btn v-if="isEsc" @click="consultarRel3">Gerar Relatório 3</v-btn>
        <v-btn v-if="isEsc" @click="consultarRel4">Gerar Relatório 4</v-btn>
        <v-btn v-if="isPil" @click="consultarRel5">Gerar Relatório 5</v-btn>
        <v-btn v-if="isPil" @click="consultarRel6">Gerar Relatório 6</v-btn>
        <v-data-table v-if="showTabel" v-model:items-per-page="itemsPerPage" :headers="headers" :items="content"
            item-key="status" class="elevation-1"></v-data-table>
    </v-card>
</template>

<script setup>
import axios from 'axios';
import { VDataTable } from 'vuetify/labs/VDataTable'
</script>

<script>
export default {
    data() {
        return {
            showTabel: false,
            headers: null,
            content: null,
            itemsPerPage: 5,
            city_name: "",
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
    },
    methods: {
        //  ADMINISTRADOR
        async consultarRel1() {
            await axios.get('http://localhost:8090/relatorio_estados')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Status', align: 'center', key: 'status' },
                        { title: 'Contagem', align: 'center', key: 'count' }
                    ]
                    this.showTabel = true;
                })
        },
        async consultarRel2() { //mockado
            //this.city_name -> axios
            await axios.get('http://localhost:8090/piloto_correu_escuderia?constructor=ferrari&driver=Carlos')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Nome Completo', align: 'center', key: 'full_name' },
                        { title: 'Data de Nascimento', align: 'center', key: 'dob' },
                        { title: 'Nacionalidade', align: 'center', key: 'nationality' },
                    ]
                    this.showTabel = true;
                })
        },

        //  ESCUDERIA
        async consultarRel3() { //mockado
            await axios.get('http://localhost:8090/pilotos_vitorias_escuderia?constructor=' + this.$store.state.username)
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Nome', align: 'center', key: 'piloto_nome' },
                        { title: 'Vitórias', align: 'center', key: 'quantidade_vitorias' }
                    ]
                    this.showTabel = true;
                })
        },
        async consultarRel4() { //mockado
            await axios.get('http://localhost:8090/qtd_resultados_estados?constructor=' + this.$store.state.username)
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Status', align: 'center', key: 'status' },
                        { title: 'Quantidade', align: 'center', key: 'quantidade' }
                    ]
                    this.showTabel = true;
                })
        },

        //  PILOTO
        async consultarRel5() { //mockado
            await axios.get('http://localhost:8090/vitorias_piloto?driver=' + this.$store.state.username)
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Ano', align: 'center', key: 'ano' },
                        { title: 'Corrida', align: 'center', key: 'corrida' },
                        { title: 'Quantidade de Vitórias', align: 'center', key: 'quantidade_vitorias' },

                    ]
                    this.showTabel = true;
                })
        },
        async consultarRel6() { //mockado
            await axios.get('http://localhost:8090/piloto_resultados_estado?driver=' + this.$store.state.username)
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Status', align: 'center', key: 'status' },
                        { title: 'Quantidade', align: 'center', key: 'quantidade' },
                    ]
                    this.showTabel = true;
                })
        },
    }
}
</script>