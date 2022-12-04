<template>
    <div class="card-body">
        <h5 class="card-title">Editar usuário</h5>
        <form @submit.prevent="updateUser">
            <div class="mb-3">
                <label class="form-label">Nome:</label>
                <input class="form-control" type="text" placeholder="Digite seu nome" v-model="user.name" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Email:</label>
                <input class="form-control" type="email" placeholder="seu@email.com" v-model="user.emailAddress"
                    required>
            </div>
            <div class="mb-3">
                <label class="form-label">Senha:</label>
                <input class="form-control" type="password" placeholder="Digite sua senha" v-model="user.password">
            </div>
            <div v-if="loggedUserIsAdmin" class="mb-3">
                <label class="form-label">Função:</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="userRole" :value="true" v-model="isStudent"
                        checked>
                    <label class="form-check-label">Estudante</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="userRole" :value="false" v-model="isStudent">
                    <label class="form-check-label">Administrador</label>
                </div>
            </div>
            <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-secondary" @click="$emit('onGoBack')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Atualizar</button>
            </div>
        </form>
    </div>
</template>
    
<script>

import User from '../../services/user'
export default {

    props: ['id', 'name', 'emailAddress', 'password', 'userRole'],

    data() {
        return {
            loggedUserIsAdmin: false,
            isStudent: true,
            user: {
                id: '',
                name: '',
                emailAddress: '',
                password: '',
                userRole: '',

            },
        }
    },

    async created() {
        this.user.id = this.id
        this.user.name = this.name
        this.user.emailAddress = this.emailAddress
        this.user.password = this.password
        this.user.userRole = this.userRole
        this.isStudent = this.userRole == 'student'
        this.loggedUserIsAdmin = localStorage.getItem('userRole') == 'admin'
    },

    name: 'UserUpdate',
    components: {

    },

    methods: {
        async updateUser() {

            try {

                const userUpdated = await User.update(this.id, this.user)

                if (!userUpdated.data)
                    return;

                let loggedUserId = localStorage.getItem('userId')

                if (loggedUserId == this.id) {
                    localStorage.removeItem('userName')
                    localStorage.removeItem('userRole')
                    localStorage.setItem('userName', this.user.name)
                    localStorage.setItem('userRole', this.user.userRole)
                }
                
                window.location.reload()

            } catch (error) {
                console.log("An error has occurred: " + error);
            }

        },

    }

}
</script>
    
<style>

</style>