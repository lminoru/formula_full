<template>
    <v-card width="800" class="mx-auto">
        <v-card-title>
            Bem vindaa, {{ username }}
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

        <v-card-actions v-if="isEsc">
            <v-text-field variant="outlined" clearable label="Forename de piloto" v-model="forename_driver"></v-text-field>
            <v-btn variant="outlined" density="comfortable" class="ml-10 mb-5" @click="consultarPiloto">Consultar</v-btn>
        </v-card-actions>

        <v-data-table v-if="forenameFound" v-model:items-per-page="itemsPerPage" :headers="headers" :items="drivers"
            item-key="name" item-value="name" class="elevation-1"></v-data-table>

        <!-- Seção de cadastro de escuderia -->
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
                    <v-text-field v-model="insDriver.Surname" :counter="10" label="ForeSurnamename" required></v-text-field>
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
import { VDataTable } from 'vuetify/labs/VDataTable'
</script>
  
<script>
export default {
    data() {
        return {
            username: "",
            infos: [],
            itemsPerPage: 5,
            headers: [
                { title: 'Nome Completo', align: 'start', key: 'name' },
                { title: 'Data de Nascimento', align: 'end', key: 'bornDate' },
                { title: 'Nacionalidade', align: 'end', key: 'nationality' },
            ],
            forename_driver: "",
            forenameFound: false,
            insertInitEsc: false,
            insertInitDri: false,
            drivers: [],
            insEscuderia: { ConstructorRef: "", Name: "", Nationality: "", URL: "" },
            insDriver: { Driverref: "", Number: "", Code: "", Forename: "", Surname: "", Date_of_Birth: "", Nationality: "" },
        }

    },
    mounted() {
        // receber dados do back

        this.username = this.$store.state.username;
        console.log("mounted:");
        console.log("store.username:", this.$store.state.username);
        console.log("store.token:", this.$store.state.token);

        switch (this.$store.state.token) {
            case 'Administrador':
                this.infos = [
                    { title: "Quantidade de pilotos cadastrados", content: '20' },
                    { title: "Quantidade de escuderias cadastradas", content: '12' },
                    { title: "Quantidade de corridas cadastradas", content: '48' },
                    { title: "Quantidade e de temporadas (seasons) cadastradas", content: '3' }
                ];
                break;
            case 'Escuderia':
                this.infos = [
                    { title: "Quantidade de vitórias da escuderia", content: '20' },
                    { title: "Quantidade de pilotos diferentes que já correram pela escuderia", content: '12' },
                    { title: "Primeiro ano em que há dados da escuderia na base", content: '2000' },
                    { title: "Úlltimo ano em que há dados da escuderia na base", content: '2018' }
                ];
                break;
            case 'Piloto':
                this.infos = [
                    { title: "Quantidade de vitórias da escuderia", content: '20' },
                    { title: "Primeiro ano em que há dados do piloto na base", content: '2001' },
                    { title: "Último ano em que há dados do piloto na base", content: '2019' },
                ];
                break;
            default:
                break;

        }
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
        consultarPiloto() {
            console.log("gggg");
            //fazer req ao back
            //passa o forename
            //forename_driver
            //drivers = response
            this.forenameFound = true;
            //else forenameFound = false;
            this.drivers = [
                {
                    name: 'Frozen Yogurt',
                    bornDate: '24/03/2022',
                    nationality: 'French',
                },
                {
                    name: 'Frozen Yogurt',
                    bornDate: '24/03/2022',
                    nationality: 'French',
                }, {
                    name: 'Frozen Yogurt',
                    bornDate: '24/03/2022',
                    nationality: 'French',
                }, {
                    name: 'Frozen Yogurt',
                    bornDate: '24/03/2022',
                    nationality: 'French',
                }, {
                    name: 'Frozen Yogurt',
                    bornDate: '24/03/2022',
                    nationality: 'French',
                },
            ];
        },
        cadastrarEscuderia() {
            //enviar req ao banco
            this.insertInitEsc = false;
        },
        cadastrarPiloto() {
            //enviar req ao banco
            this.insertInitDri = false;
        },
        cadastrarEscuderiaInit() {
            this.insertInitEsc = true;
        },
        cadastrarPilotoInit() {
            this.insertInitDri = true;
        }
    }
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
  