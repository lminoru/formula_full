<template>
  <v-card class="mx-auto" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          FÓRMULA 1 - FIA
        </div>
        <v-form>
          <v-container>
            <v-col>
              <v-row rows="12" md="4">
                <v-text-field v-model="username" :counter="10" label="Login" required></v-text-field>
              </v-row>

              <v-row rows="12" md="4">
                <v-text-field v-model="password" :counter="10" label="Senha" type="password" required></v-text-field>
              </v-row>
            </v-col>
          </v-container>
        </v-form>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="outlined" @click="submit">
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: null,
      password: null,
      response: null,
      loading: false,
    }
  },
  methods: {
    async submit() {
      this.loading = true
      await this.BackendValidate();
    },
    async BackendValidate() {
      axios
        .get('http://localhost:5000/login?username=' + this.username + '&password=' + this.password)
        .then(response => (this.response = response.data))
    }
  },
  watch: {
    response() {
      if (this.response) {
        // Lógica de autenticação aqui
        // Por exemplo, fazer uma solicitação ao servidor para verificar as credenciais
        // Simulando uma resposta bem-sucedida
        const token = this.response.tipo;
        this.$store.commit('login', token)

        this.loading = false;

        // Redireciona para a rota protegida após o login
        this.$router.push('/overview');
      }
    },
  },

}
</script>
