<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div v-if="userRole == 'admin'" class="container">
        <div class="row justify-content-md-center">
            <div class="col col-7">
                <div class="text-center my-5">
                    <h1>Usuários</h1>
                </div>
                <UserForm />
                <UserRetrieve />
            </div>
        </div>
    </div>
    <div v-if="userRole != 'admin'">
        <div class="text-center my-5">
            <h1>Você não está autorizado a ver esta página</h1>
        </div>
    </div>
</template>

<script>
import UserForm from '../components/user/UserForm.vue'
import UserRetrieve from '../components/user/UserRetrieve.vue'
export default {

    data() {
        return {
            userRole: '',
        }
    },

    mounted() {
        this.userRole = localStorage.getItem('userRole')
    },

    name: 'UserView',
    components: {
        UserForm,
        UserRetrieve
    }
}
</script>

<style>

</style>