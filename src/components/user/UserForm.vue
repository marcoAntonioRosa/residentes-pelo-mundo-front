<template>
  <div class="card mb-5">
    <div class="card-body">
      <h5 class="card-title">Cadastrar usuário</h5>
      <form @submit.prevent="createUser">
        <div class="mb-3">
          <label class="form-label">Nome:</label>
          <input class="form-control" type="text" placeholder="Digite o nome" v-model="user.name" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input class="form-control" type="email" placeholder="email@email.com" v-model="user.emailAddress.toLowerCase" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Senha:</label>
          <input class="form-control" type="password" placeholder="Digite a senha" v-model="user.password" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Função:</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="student" :value="true" v-model="isStudent" checked>
            <label class="form-check-label">Estudante</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="student" :value="false" v-model="isStudent">
            <label class="form-check-label">Administrador</label>
          </div>
        </div>
        <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../../services/user'

export default {

  data() {
    return {
      isStudent: true,
      user: {
        name: '',
        emailAddress: '',
        password: '',
        userRole: '',
        initialDate: '',
        endDate: ''
      }
    }
  },

  name: 'UserForm',

  methods: {
    async createUser() {
      try {

        this.user.userRole = this.isStudent ? 'student' : 'admin'

        const userCreate = await User.create(this.user)

        if (!userCreate.data)
          return;

        window.location.reload()

      } catch (error) {
        console.log("An error has occurred: " + error);
      }
    }
  }
}

</script>

<style>

</style>