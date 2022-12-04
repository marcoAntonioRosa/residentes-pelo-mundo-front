<template>
  <div class="card-body">
    <h5 class="card-title">Editar empresa</h5>
    <form @submit.prevent="updateCompany">
      <div class="mb-3">
        <label class="form-label">Razão social</label>
        <input class="form-control" type="text" placeholder="Razão social" v-model="company.companyName" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Nome fantasia</label>
        <input class="form-control" type="text" placeholder="Nome fantasia" v-model="company.tradingName" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Descrição</label>
        <textarea class="form-control textareaElement" type="text" placeholder="Descrição da empresa"
          v-model="company.description" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">CNPJ</label>
        <input class="form-control" type="text" placeholder="CNPJ" v-model="company.cnpj" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Selecione a localização da empresa</label>
        <MapUpdate :id="this.id" :latitude="this.latitude" :longitude="this.longitude" :companyName="this.companyName"
          @changedCoordinates="onCoordinatesChange" />
      </div>
      <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-secondary" @click="$emit('onCancel')">Cancelar</button>
        <button type="submit" class="btn btn-primary">Atualizar</button>
      </div>
    </form>
  </div>
</template>
  
<script>

import Company from '../../services/company'
import MapUpdate from '../map/MapUpdate.vue'
export default {

  props: ['id', 'companyName', 'tradingName', 'description', 'cnpj', 'latitude', 'longitude'],

  data() {
    return {
      company: {
        companyName: '',
        tradingName: '',
        description: '',
        cnpj: '',
        mapCoordinates: ''
      },
    }
  },

  mounted() {
    this.company.companyName = this.companyName
    this.company.tradingName = this.tradingName
    this.company.description = this.description
    this.company.cnpj = this.cnpj

    let latlng = {
      lat: this.latitude,
      lng: this.longitude
    }

    this.company.mapCoordinates = JSON.stringify(latlng);

    this.company.latitude = this.latitude
    this.company.longitude = this.longitude
  },

  name: 'CompanyUpdate',
  components: {
    MapUpdate
  },

  methods: {
    async updateCompany() {

      try {

        if (!this.company.mapCoordinates)
          throw ('No coordinates were given')

        const companyUpdated = await Company.update(this.id, this.company)

        if (!companyUpdated.data)
          return;

        window.location.reload()

      } catch (error) {
        console.log("An error has occurred: " + error);
      }

    },

    onCoordinatesChange(value) {
      this.company.mapCoordinates = JSON.stringify(value.latlng);
    }
  }

}
</script>
  
<style>
.textareaElement {
  height: 150px;
}

#map {
  height: 300px;
  width: 50%;
}
</style>