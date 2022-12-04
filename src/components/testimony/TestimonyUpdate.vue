<template>
    <div class="card card-testimony">
        <div class="card-body">
            <h5 class="card-title">Editar experiência</h5>
            <form @submit.prevent="updateTestimony">
                <div class="mb-3">
                    <label class="form-label">Título</label>
                    <input class="form-control" type="text" placeholder="Digite o título" v-model="testimony.title"
                        required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Início do estágio:</label>
                    <input class="form-control" placeholder="dd-mm-yyyy" v-model="testimony.initialDate" type="date">
                </div>
                <div class="mb-3">
                    <label class="form-label">Fim do estágio:</label>
                    <input class="form-control" placeholder="dd-mm-yyyy" v-model="testimony.endDate" type="date">
                </div>
                <div class="mb-3">
                    <label class="form-label">Descrição</label>
                    <textarea class="form-control textareaElement" type="text" placeholder="Minha experiência foi..."
                        v-model="testimony.description" required></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Empresa</label>
                    <select id="datalistOptions" v-model="stylizedCompanyName" class="form-control"
                        list="datalistOptions" placeholder="Digite para buscar uma empresa...">
                        <option v-for="company in companyList" :key="company.id"
                            v-on:click="getCompanyId(stylizedCompanyName)">
                            {{ company.id + ' - ' + company.companyName + '/' + company.tradingName }}
                        </option>
                    </select>
                </div>
                <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-secondary" @click="$emit('onCancel')">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Atualizar</button>
                </div>
            </form>
        </div>
    </div>
</template>
    
<script>

import Testimony from '../../services/testimony'
import Company from '../../services/company'
export default {

    props: ['id', 'companyId', 'title', 'initialDate', 'endDate', 'description'],

    data() {
        return {
            companyList: {},
            stylizedCompanyName: '',
            testimony: {
                companyId: '',
                title: '',
                initialDate: '',
                endDate: '',
                description: '',
            },
        }
    },

    async mounted() {

        try {
            this.testimony.companyId = this.companyId
            this.testimony.title = this.title
            this.testimony.initialDate = new Date(this.initialDate).toISOString().slice(0, 10)
            this.testimony.endDate = new Date(this.endDate).toISOString().slice(0, 10)
            this.testimony.description = this.description

            const companies = await Company.listBasic();
            this.companyList = companies.data

            if (!companies)
                return;

            this.stylizedCompanyName = companies.data
                .filter(company => company.id == this.companyId)
                .map(company => company.id + ' - ' + company.companyName + '/' + company.tradingName)[0]

        } catch (error) {
            console.log("An error has occurred: " + error);
        }
    },

    name: 'TestimonyUpdate',
    components: {

    },

    methods: {
        async updateTestimony() {

            try {

                const testimonyUpdated = await Testimony.update(this.id, this.testimony)

                if (!testimonyUpdated.data)
                    return;

                window.location.reload()

            } catch (error) {
                console.log("An error has occurred: " + error);
            }

        },

        getCompanyId(value) {
            this.testimony.companyId = value.split('-')[0].trim()
        }
    }

}
</script>
    
<style>
.textareaElement {
    height: 150px;
}
</style>