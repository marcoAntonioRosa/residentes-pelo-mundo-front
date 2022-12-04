<template>
    <div class="card mb-3" v-for="user in users" :key="user.id">
        <div class="card-body" v-if="!(user.id === this.editId)">
            <h5 class="card-title">{{ user.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ user.emailAddress }} ({{ user.userRole }})</h6>

            <div class="d-flex justify-content-end" v-if="(user.userRole == 'student' || user.id == loggedUserId)">
                <button type="button" class="btn btn-secondary me-3" @click="onEditMode(user.id)">Editar</button>
                <button type="button" class="btn btn-warning" @click="deleteUser(user.id)">Remover</button>
            </div>
        </div>
        <UserUpdate v-if="(user.id === this.editId)" :id="user.id" :name="user.name" :emailAddress="user.emailAddress"
            :userRole="user.userRole" @onGoBack="this.editId = ''" />
    </div>
</template>
  
<script>

import User from '../../services/user'
import UserUpdate from '../user/UserUpdate.vue'
export default {

    setup() {

    },

    data() {
        return {
            userRole: '',
            loggedUserId: '',
            users: [],
            isEditMode: false,
            editId: '',
        }
    },

    async created() {
        try {

            this.userRole = localStorage.getItem('userRole')
            this.loggedUserId = localStorage.getItem('userId')

            const rawUsers = await User.list();

            if (!rawUsers.data) {
                throw 'No user data'
            }

            rawUsers.data.forEach((user) => {

                const { id, name, emailAddress, userRole } = user

                const newUser = {
                    id,
                    name,
                    emailAddress,
                    userRole,
                }

                this.users.push(newUser)
            })

        } catch (error) {
            console.log("An error has occurred: " + error);
        }
    },

    name: 'UserRetrieve',
    components: {
        UserUpdate
    },

    methods: {
        async deleteUser(id) {

            await User.delete(id);

            window.location.reload()

        },

        onEditMode(id) {
            this.isEditMode = true;
            this.editId = id
        },

    },


}
</script>
  
<style>

</style>