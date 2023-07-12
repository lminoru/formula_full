<template>
    <v-card width="800" class="mx-auto">
        <v-card-title>
            Bem vindo, {{ username }}
        </v-card-title>

        <v-divider class="mb-4"></v-divider>

        <v-card-text>
            <div class="d-flex align-center" v-for="info in infos" :key="info.title">
                <v-label class="mr-2 font-weight-bold">{{ info.title }}:</v-label>
                <v-label>{{ info.content }}</v-label>
            </div>

        </v-card-text>

        <v-divider class="mb-4" v-if="isAdm || isEsc"></v-divider>

        <v-card-actions v-if="isAdm" class="d-flex justify-space-between">
            <v-btn variant="outlined" @click="cadastrarEscuderiaInit">Cadastrar Escuderia</v-btn>
            <v-btn variant="outlined" @click="cadastrarPilotoInit">Cadastrar Piloto</v-btn>
        </v-card-actions>

        <!-- Seção de checar/listar pilotos que correram pela escuderia [escuderia]-->
        <v-card-actions v-if="isEsc">
            <v-text-field variant="outlined" clearable label="Forename de piloto" v-model="forename_driver"></v-text-field>
            <v-btn variant="outlined" density="comfortable" class="ml-10 mb-5" @click="consultarPiloto">Consultar</v-btn>
        </v-card-actions>

        <!-- listagem dos pilotos [escuderia] -->
        <v-data-table v-if="forenameFound" v-model:items-per-page="itemsPerPage" :headers="headers" :items="drivers"
            item-key="name" item-value="name" class="elevation-1"></v-data-table>

        <!-- Seção de cadastro de escuderia [admin]-->
        <v-container v-if="insertInitEsc">
            <v-col>
                <v-row rows="12" md="4">
                    <v-text-field v-model="insEscuderia.ConstructorRef" :counter="10" label="ConstructorRef"
                        required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insEscuderia.Name" :counter="10" label="Name" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insEscuderia.Nationality" :counter="10" label="Nationality"
                        required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insEscuderia.URL" :counter="10" label="URL" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-btn variant="outlined" density="comfortable" @click="cadastrarEscuderia">Cadastrar</v-btn>
                </v-row>
            </v-col>
        </v-container>

        <!-- Seção de cadastro de pilotos -->
        <v-container v-if="insertInitDri">
            <v-col>
                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Driverref" :counter="10" label="Driverref" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Number" :counter="10" label="Number" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Code" :counter="10" label="Code" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Forename" :counter="10" label="Forename" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Surname" :counter="10" label="Surname" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Date_of_Birth" :counter="10" label="Date of Birth"
                        required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-text-field v-model="insDriver.Nationality" :counter="10" label="Nationality" required></v-text-field>
                </v-row>

                <v-row rows="12" md="4">
                    <v-btn variant="outlined" density="comfortable" @click="cadastrarPiloto">Cadastrar</v-btn>
                </v-row>
            </v-col>
        </v-container>

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
            username: "",
            infos: [],
            infos_api: null,
            itemsPerPage: 5,
            headers: [
                { title: 'Nome Completo', align: 'start', key: 'full_name' },
                { title: 'Data de Nascimento', align: 'end', key: 'dob' },
                { title: 'Nacionalidade', align: 'end', key: 'nationality' },
            ],
            forename_driver: "",
            forenameFound: false,
            insertInitEsc: false,
            insertInitDri: false,
            drivers: [],
            insEscuderia: { ConstructorRef: "", Name: "", Nationality: "", URL: "" },
            insDriver: { Driverref: "", Number: "", Code: "", Forename: "", Surname: "", Date_of_Birth: "", Nationality: "" },
            status_cadastro: null
        }

    },
    mounted() {
        // receber dados do back
        this.carregarInfos();
    },
    computed: {
        isAdm() {
            return this.$store.state.token == "Administrador"
        },
        isEsc() {
            return this.$store.state.token == "Escuderia"
        }
    },
    methods: {
        carregarInfos() {
            console.log(this.$store.state.token);
            if (this.isAdm) {
                axios.get('http://localhost:8090/quantidades_geral?username=' + this.$store.state.username)
                    .then(response => (this.infos_api = response.data))
            }
            else if (this.isEsc) {
                axios.get('http://localhost:8090/informacoes_escuderia?constructor=' + this.$store.state.username)
                    .then(response => (this.infos_api = response.data))
            }
            else {
                axios.get('http://localhost:8090/informacoes_piloto?driver=' + this.$store.state.username)
                    .then(response => (this.infos_api = response.data))
            }


        },
        consultarPiloto() {
            axios.get('http://localhost:8090/piloto_correu_escuderia?constructor=' + this.$store.state.username + '&driver=' + this.forename_driver)
                .then(response => (this.drivers = response.data))

        },
        cadastrarEscuderia() {
            //enviar req ao banco
            axios
                .post('http://localhost:8090/inserir_escuderia?constructorref=' + this.insEscuderia.ConstructorRef + '&name=' + this.insEscuderia.Name + '&nationality=' + this.insEscuderia.Nationality + '&url=' + this.insEscuderia.URL)
                .then(response => (this.status_cadastro = response.status))
            this.insertInitEsc = false;
        },
        cadastrarPiloto() {
            //enviar req ao banco                                (driverid, driverref, number, code, forename, surname, dob, nationality)
            axios
                .post('http://localhost:8090/inserir_piloto?driverref=' + this.insDriver.Driverref + '&number=' + this.insDriver.Number + '&code=' + this.insDriver.Code + '&forename=' + this.insDriver.Forename + '&surname=' + this.insDriver.Surname + '&dob=' + this.insDriver.Date_of_Birth + '&nationality=' + this.insDriver.Nationality)
                .then(response => (this.status_cadastro = response.status))
            this.insertInitDri = false;
        },
        cadastrarEscuderiaInit() {
            this.insertInitEsc = true;
        },
        cadastrarPilotoInit() {
            this.insertInitDri = true;
        }
    },
    watch: {
        infos_api() {
            if (this.infos_api) {
                switch (this.$store.state.token) {
                    case 'Administrador':
                        this.username = 'Admin';
                        this.infos = [
                            { title: "Quantidade de pilotos cadastrados", content: this.infos_api['quantidade_pilotos'] },
                            { title: "Quantidade de escuderias cadastradas", content: this.infos_api['quantidade_escuderias'] },
                            { title: "Quantidade de corridas cadastradas", content: this.infos_api['quantidade_corridas'] },
                            { title: "Quantidade e de temporadas (seasons) cadastradas", content: this.infos_api['quantidade_temporadas'] }
                        ];
                        break;
                    case 'Escuderia':
                        this.username = this.infos_api['escuderia_nome'];
                        this.infos = [
                            { title: "Quantidade de vitórias da escuderia", content: this.infos_api['quantidade_vitorias'] },
                            { title: "Quantidade de pilotos diferentes que já correram pela escuderia", content: this.infos_api['quantidade_pilotos'] },
                            { title: "Primeiro ano em que há dados da escuderia na base", content: this.infos_api['primeiro_ano'] },
                            { title: "Úlltimo ano em que há dados da escuderia na base", content: this.infos_api['ultimo_ano'] }
                        ];
                        break;
                    case 'Piloto':
                        this.username = this.infos_api['forename'] + " " + this.infos_api['surname'];
                        this.infos = [
                            { title: "Quantidade de vitórias da escuderia", content: this.infos_api['quantidade_vitorias'] },
                            { title: "Primeiro ano em que há dados do piloto na base", content: this.infos_api['primeiro_ano'] },
                            { title: "Último ano em que há dados do piloto na base", content: this.infos_api['ultimo_ano'] },
                        ];
                        break;
                    default:
                        break;

                }
            }
        },
        drivers() {
            if (this.drivers) {
                this.forenameFound = true;
            }
        }
    },
}
</script>

<style scoped>
@import 'vuetify/dist/vuetify.min.css';

.d-flex {
    display: flex;
}

.align-center {
    align-items: center;
}

.mr-2 {
    margin-right: 8px;
}

.text-center {
    text-align: center;
}

.container {
    display: flex;
    align-items: center;
}
</style>
  