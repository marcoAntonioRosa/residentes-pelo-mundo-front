<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-7">
                <div class="text-center my-5">
                    <h1>Empresas</h1>
                </div>
                <div v-if="userRole == 'admin'">
                    <CompanyForm />
                </div>
                <CompanyRetrieve />
            </div>
        </div>
    </div>
</template>

<script>
import CompanyForm from '../components/company/CompanyForm.vue'
import CompanyRetrieve from '../components/company/CompanyRetrieve.vue'
export default {

    data() {
        return {
            userRole: '',
        }
    },

    mounted() {
        this.userRole = localStorage.getItem('userRole')
    },
    name: 'CompanyView',
    components: {
        CompanyForm,
        CompanyRetrieve
    }
}
</script>

<style>

</style>