<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col col-4">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label class="form-label">Email:</label>
                <input class="form-control" type="email" placeholder="seu@email.com" v-model="credentials.emailAddress"
                  required>
              </div>
              <div class="mb-3">
                <label class="form-label">Senha:</label>
                <input class="form-control" type="password" placeholder="Digite sua senha"
                  v-model="credentials.password" required>
              </div>
              <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import axios from 'axios'
import Login from '../services/authentication'
export default {

  async mounted() {

    try {
      const authorization = localStorage.getItem('Authorization')
      const refreshToken = localStorage.getItem('refreshToken')

      if (authorization && refreshToken) {
        this.redirectToHome()
      }
        

    } catch (error) {
      console.log("An error has occurred: " + error);
    }
  },

  data() {
    return {
      credentials: {
        emailAddress: '',
        password: ''
      }
    }
  },

  methods: {
    async login() {

      try {

        const authorization = await Login.login(this.credentials)

        if (!authorization.data)
          return;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + authorization.data.accessToken
        axios.defaults.headers.common['refreshToken'] = authorization.data.refreshToken
        localStorage.setItem('Authorization', 'Bearer ' + authorization.data.accessToken)
        localStorage.setItem('refreshToken', authorization.data.refreshToken)
        localStorage.setItem('userId', authorization.data.userId)
        localStorage.setItem('userName', authorization.data.userName)
        localStorage.setItem('userRole', authorization.data.userRole)

        window.location.reload()

      } catch (error) {
        console.log("An error has occurred: " + error);
      }

    },

    redirectToHome() {
      this.$router.push('/')
    }
  }

}

</script>

<style>
.bg-unochapeco {
  background: #093855;
}

.btn.btn-primary {
  background: #093855;
  border: #093855;
}
</style>