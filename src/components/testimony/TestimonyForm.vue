<template>
  <div class="card mb-5">
    <div class="card-body">
      <h5 class="card-title">Cadastrar experiência</h5>
      <form @submit.prevent="createTestimony">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input class="form-control" type="text" placeholder="Digite o título" v-model="testimony.title" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Início do estágio:</label>
          <input class="form-control" placeholder="mm/dd/yyyy" v-model="testimony.initialDate" type="date">
        </div>
        <div class="mb-3">
          <label class="form-label">Fim do estágio:</label>
          <input class="form-control" placeholder="mm/dd/yyyy" v-model="testimony.endDate" type="date">
        </div>
        <div class="mb-3">
          <label class="form-label">Descrição</label>
          <textarea class="form-control textareaElement" type="text" placeholder="Minha experiência foi..."
            v-model="testimony.description" required></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Empresa</label>
          <select id="datalistOptions" v-model="testimony.stylizedCompanyName" class="form-control"
            list="datalistOptions" placeholder="Digite para buscar uma empresa...">
            <option v-for="company in companyList" :key="company.id"
              v-on:click="getCompanyId(testimony.stylizedCompanyName)">
              {{ company.id + ' - ' + company.companyName + '/' + company.tradingName }}
            </option>
          </select>
        </div>
        <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Testimony from '../../services/testimony'
import Company from '../../services/company'

export default {

  data() {
    return {
      userRole: '',
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

      this.userRole = localStorage.getItem('userRole')

      const companies = await Company.listBasic();
      this.companyList = companies.data

      if (!companies)
        return;

    } catch (error) {
      console.log("An error has occurred: " + error);
    }
  },

  name: 'TestimonyForm',
  components: {
  },

  methods: {

    async createTestimony() {

      try {

        const testimonyCreated = await Testimony.create(this.testimony)

        if (!testimonyCreated.data)
          return;

        this.testimony = {}

        window.location.reload()

      } catch (error) {
        console.log("An error has occurred: " + error);
      }

    },

    getCompanyId(value) {
      this.testimony.companyId = value.split('-')[0].trim()
    },

  }
}
</script>

<style>
.textareaElement {
  height: 150px;
}
</style>