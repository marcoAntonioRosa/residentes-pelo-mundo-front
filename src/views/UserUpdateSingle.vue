<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="row justify-content-md-center">
        <div class="col col-7" v-for="user in users" :key="user.id">
            <div v-if="(user.id == loggedUserId || (loggedUserRole == 'admin' && user.userRole == 'student'))">
                <div class="text-center my-5">
                    <h1>Editar perfil</h1>
                </div>
                <div class="card mb-3">
                    <UserUpdate :id="user.id" :name="user.name" :emailAddress="user.emailAddress"
                        :userRole="user.userRole" :initialDate="user.initialDate" :endDate="user.endDate"
                        @onGoBack="goToTestimonies()" />
                </div>
            </div>
            <div v-else>
                <div class="text-center my-5">
                    <h1>Você não está autorizado a ver esta página</h1>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import User from '../services/user'
import UserUpdate from '../components/user/UserUpdate.vue'
export default {

    data() {
        return {
            users: [],
            isAuthorized: false,
            loggedUserId: '',
            loggedUserRole: ''
        }
    },

    async mounted() {

        try {

            this.loggedUserId = localStorage.getItem('userId')
            this.loggedUserRole = localStorage.getItem('userRole')

            const userId = this.$route.params.id

            const rawUser = await User.getOne(userId)

            if (!rawUser.data)
                throw 'User not found'

            const { id, name, emailAddress, userRole, initialDate, endDate } = rawUser.data

            let formatedInitialDate = ''
            let formatedEndDate = ''

            if (initialDate && endDate) {
                formatedInitialDate = this.convertDate(initialDate)
                formatedEndDate = this.convertDate(endDate)
            }

            const newUser = {
                id,
                name,
                emailAddress,
                userRole,
                formatedInitialDate,
                formatedEndDate,
                initialDate,
                endDate
            }

            this.users.push(newUser)

        } catch (error) {
            console.log("An error has occurred: " + error);
        }

    },

    name: 'UserUpdateSingleView',
    components: {
        UserUpdate
    },

    methods: {

        convertDate(date) {
            const slicedDate = new Date(date)//.toISOString().slice(0,10)
            const year = slicedDate.getFullYear()
            const month = slicedDate.getMonth() + 1
            const day = slicedDate.getDate() + 1;

            return day + '/' + month + '/' + year
        },

        goToTestimonies() {
            this.$router.push('../testimony')
        }
    }
}
</script>

<style>

</style>