<template>
  <div class="card mb-3" v-for="company in companies" :key="company.id">
    <div class="card-body" v-if="!(company.id === this.editId)">
      <h5 class="card-title">{{ company.companyName }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ company.tradingName }}</h6>
      <p class="crop-text">{{ company.description }}</p>
      <MapRetrieve :id="company.id" :latitude="company.lat" :longitude="company.lng"
        :companyName="company.tradingName" class="mb-3"/>
      <div class="d-flex justify-content-end" v-if="userRole == 'admin'">
        <button type="button" class="btn btn-secondary me-3" @click="onEditMode(company.id)">Editar</button>
        <button type="button" class="btn btn-warning" @click="deleteCompany(company.id)">Remover</button>
      </div>
    </div>
    <CompanyUpdate v-if="(company.id === this.editId)" :id="company.id" :companyName="company.companyName"
      :tradingName="company.tradingName" :description="company.description" :cnpj="company.cnpj" :latitude="company.lat"
      :longitude="company.lng" @onCancel="this.editId = ''" />

  </div>
</template>

<script>

import Company from '../../services/company'
import MapRetrieve from '../map/MapRetrieve.vue'
import CompanyUpdate from '../company/CompanyUpdate.vue'
export default {

  data() {
    return {
      userRole: '',
      companies: [],
      isEditMode: false,
      editId: ''
    }
  },

  async mounted() {
    try {

      this.userRole = localStorage.getItem('userRole')

      const rawCompanies = await Company.list();

      if (!rawCompanies.data) {
        throw 'No company data'
      }

      rawCompanies.data.forEach((company) => {

        const { id, companyName, tradingName, description, cnpj, mapCoordinates } = company
        const { lat, lng } = JSON.parse(mapCoordinates);

        const newCompany = {
          id,
          companyName,
          tradingName,
          description,
          cnpj,
          lat,
          lng
        }

        this.companies.push(newCompany)
      })

    } catch (error) {
      console.log("An error has occurred: " + error);
    }
  },

  name: 'CompanyRetrieve',
  components: {
    MapRetrieve,
    CompanyUpdate
  },

  methods: {
    async deleteCompany(id) {

      await Company.delete(id);

      window.location.reload()

    },

    onEditMode(id) {
      this.isEditMode = true;
      this.editId = id
    }
  }

}
</script>

<style>
.crop-text {
  -webkit-line-clamp: 4;
  overflow: scroll;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  max-height: 200px;
  min-height: 50px;
  margin-bottom: 1rem !important;
}
</style>