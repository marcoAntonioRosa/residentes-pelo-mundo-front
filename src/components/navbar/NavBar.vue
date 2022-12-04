<template>
  <nav class="navbar navbar-expand-lg bg-unochapeco px-5 d-flex justify-content-between">
    <div class="p-2">
      <router-link to="/" class="navbar-brand text-light">Residentes Pelo Mundo</router-link>
    </div>
    <div class="p-2">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/testimony" class="nav-link text-light">Relatos</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/company" class="nav-link text-light">Empresas</router-link>
        </li>
        <li class="nav-item" v-if="userRole == 'admin'">
          <router-link to="/user" class="nav-link text-light">Usuários</router-link>
        </li>
      </ul>
    </div>
    <div class="p-2">
      <ul class="navbar-nav">
        <li v-if="!userName" class="nav-item">
          <router-link to="/login" class="nav-link text-light">Login</router-link>
        </li>

        <div v-if="userName" class="dropdown">
          <a class="btn btn-secondary dropdown-toggle nav-link" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">{{ userName }}</a>
          <ul class="dropdown-menu">
            <li class="nav-item dropdown-item">
              <router-link :to="'/user/' + this.userId" class="nav-link text-light">Perfil</router-link>
            </li>
            <li class="nav-item dropdown-item">
              <a class="nav-link text-light" v-on:click="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
import axios from 'axios'
import Authentication from '../../services/authentication'
export default {

  data() {
    return {
      userId: '',
      userName: '',
      userRole: ''
    }
  },

  async mounted() {
    try {

      this.userId = localStorage.getItem('userId')
      this.userName = localStorage.getItem('userName')
      this.userRole = localStorage.getItem('userRole')

    } catch (error) {
      console.log("An error has occurred: " + error);
    }
  },

  methods: {
    async logout() {
      try {

        await Authentication.logout()

        this.userId = ''
        this.userName = ''
        this.userRole = ''

        delete axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["refreshToken"];

        localStorage.removeItem('Authorization')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        localStorage.removeItem('userRole')

        this.$router.push('/login')

      } catch (error) {
        console.log("An error has occurred: " + error);
      }
    },
  }
}

</script>

<style>
.bg-unochapeco {
  background: #093855;
}

nav .btn {
  background: transparent;
  border: 0;
}

.btn.btn-secondary.dropdown-toggle.nav-link {
  color: #fff;
  background: transparent;
}

.dropdown-menu {
  background-color: #093855b6;
  cursor: pointer;
}

.dropdown-item:focus,
.dropdown-item:hover {
  background-color: #9ea2a5b6
}
</style>