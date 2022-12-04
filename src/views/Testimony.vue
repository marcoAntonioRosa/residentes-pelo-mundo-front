<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-7">
                <div class="text-center my-5">
                    <h1>Relatos dos residentes</h1>
                </div>
                <div v-if="userRole == 'student'">
                    <TestimonyForm />
                </div>
                <TestimonyRetrieve />
            </div>
        </div>
    </div>
</template>

<script>

import TestimonyForm from '../components/testimony/TestimonyForm.vue'
import TestimonyRetrieve from '../components/testimony/TestimonyRetrieve.vue'
export default {

    data() {
        return {
            userRole: '',
        }
    },

    created() {
        this.userRole = localStorage.getItem('userRole')
    },

    name: 'TestimonyView',
    components: {
        TestimonyForm,
        TestimonyRetrieve
    },

}
</script>

<style>

</style>