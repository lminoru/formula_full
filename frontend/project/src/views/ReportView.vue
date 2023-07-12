<template>
    <v-card width="800" class="mx-auto">
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
            itemsPerPage: 5
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
                        { title: 'Status', key: 'status' },
                        { title: 'Contagem', key: 'count' }
                    ]
                    this.showTabel = true;
                })
        },
        async consultarRel2() { //mockado
            await axios.get('http://localhost:8090/piloto_correu_escuderia?constructor=ferrari&driver=Carlos')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Nome Completo', align: 'start', key: 'full_name' },
                        { title: 'Data de Nascimento', align: 'end', key: 'dob' },
                        { title: 'Nacionalidade', align: 'end', key: 'nationality' },
                    ]
                    this.showTabel = true;
                })
        },

        //  ESCUDERIA
        async consultarRel3() { //mockado
            await axios.get('http://localhost:8090/relatorio_estados')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Status', key: 'status' },
                        { title: 'Contagem', key: 'count' }
                    ]
                    this.showTabel = true;
                })
        },
        async consultarRel4() { //mockado
            await axios.get('http://localhost:8090/piloto_correu_escuderia?constructor=ferrari&driver=Carlos')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Nome Completo', align: 'start', key: 'full_name' },
                        { title: 'Data de Nascimento', align: 'end', key: 'dob' },
                        { title: 'Nacionalidade', align: 'end', key: 'nationality' },
                    ]
                    this.showTabel = true;
                })
        },

        //  PILOTO
        async consultarRel5() { //mockado
            await axios.get('http://localhost:8090/relatorio_estados')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Status', key: 'status' },
                        { title: 'Contagem', key: 'count' }
                    ]
                    this.showTabel = true;
                })
        },
        async consultarRel6() { //mockado
            await axios.get('http://localhost:8090/piloto_correu_escuderia?constructor=ferrari&driver=Carlos')
                .then(response => {
                    this.content = response.data
                    this.headers = [
                        { title: 'Nome Completo', align: 'start', key: 'full_name' },
                        { title: 'Data de Nascimento', align: 'end', key: 'dob' },
                        { title: 'Nacionalidade', align: 'end', key: 'nationality' },
                    ]
                    this.showTabel = true;
                })
        },
    }
}
</script>