<template>
    <div v-for="company in companies" :key="company.id">
        <div class="card mb-3" v-if="userRole == 'admin' || company.hasApproved">
            <div class="card-body">
                <h5 class="card-title">{{ company.companyName }}</h5>
                <MapRetrieve :id="company.id" :latitude="company.lat" :longitude="company.lng"
                    :companyName="company.tradingName" />
            </div>
            <div v-for="testimony in company.testimonies[0]" :key="testimony.id">
                <div class="card card-testimony" v-if="!(testimony.id === this.editId)">
                    <div class="card-body"
                        v-if="(this.userRole == 'admin' || (testimony.status == 'approved' || userId == testimony.student.id))">
                        <h5 class="card-title">{{ testimony.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            Por {{ testimony.student.name }} - de {{ testimony.formatedInitialDate }} até {{
                                    testimony.formatedEndDate
                            }}
                        </h6>
                        <p class="crop-text">{{ testimony.description }}</p>

                        <div class="d-flex justify-content-end" v-if="userRole == 'admin'">
                            <button type="button" class="btn btn-danger me-3" @click="deleteTestimony(testimony.id)">Remover</button>
                            <button v-if="testimony.status == 'approved'" disabled type="button" class="btn btn-success" @click="approveTestimony(testimony.id)">Aprovado</button>
                            <button v-else type="button" class="btn btn-success" @click="approveTestimony(testimony.id)">Aprovar</button>
                        </div>
                        <div class="d-flex justify-content-end"
                            v-if="(userRole == 'student' && userId == testimony.student.id)">
                            <button type="button" class="btn btn-secondary me-3" @click="onEditMode(testimony.id)">Editar</button>
                            <button type="button" class="btn btn-danger" @click="deleteTestimony(testimony.id)">Remover</button>
                        </div>
                    </div>
                </div>
                <TestimonyUpdate v-if="(testimony.id === this.editId)" :id="testimony.id" :companyId="company.id"
                    :title="testimony.title" :initialDate="testimony.initialDate" :endDate="testimony.endDate"
                    :description="testimony.description" @onCancel="this.editId = ''" />
            </div>
        </div>
    </div>

</template>
  
<script>

import Testimony from '../../services/testimony'
import MapRetrieve from '../map/MapRetrieve.vue'
import TestimonyUpdate from '../testimony/TestimonyUpdate.vue'
export default {

    data() {
        return {
            userId: '',
            userRole: '',
            companies: [],
            isEditMode: false,
            editId: ''
        }
    },

    async mounted() {
        try {

            this.userId = localStorage.getItem('userId')
            this.userRole = localStorage.getItem('userRole')

            const rawCompanies = await Testimony.list()

            rawCompanies.data.forEach((company) => {

                const { id, companyName, tradingName, mapCoordinates, testimonies } = company
                const { lat, lng } = JSON.parse(mapCoordinates);

                let hasApproved = false

                company.testimonies[0].forEach(testimony => {
                    const { initialDate, endDate, status } = testimony

                    let formatedInitialDate = ''
                    let formatedEndDate = ''

                    if (initialDate && endDate) {
                        formatedInitialDate = this.convertDate(initialDate)
                        formatedEndDate = this.convertDate(endDate)
                    }

                    testimony.formatedInitialDate = formatedInitialDate
                    testimony.formatedEndDate = formatedEndDate

                    if (status == 'approved') {
                        
                        hasApproved = true
                    }

                })

                const newCompany = {
                    id,
                    lat,
                    lng,
                    companyName,
                    tradingName,
                    testimonies,
                    hasApproved
                }

                this.companies.push(newCompany)
            })

            // this.companies.forEach(company => {
            //     company.testimonies[0].forEach(testimony => {
            //         console.log(testimony.student.name)
            //     })
            // })


        } catch (error) {
            console.log("An error has occurred: " + error);
        }
    },

    name: 'TestimonyRetrieve',
    components: {
        MapRetrieve,
        TestimonyUpdate
    },

    methods: {

        async approveTestimony(id) {
            await Testimony.approve(id);

            window.location.reload()
        },

        async deleteTestimony(id) {

            await Testimony.delete(id);

            window.location.reload()

        },

        onEditMode(id) {
            this.isEditMode = true;
            this.editId = id
        },

        convertDate(date) {
            const slicedDate = new Date(date)
            const year = slicedDate.getFullYear()
            const month = slicedDate.getMonth() + 1
            const day = slicedDate.getDate() + 1;

            return day + '/' + month + '/' + year
        }
    }

}
</script>
  
<style>
.card {
    border-radius: var(--bs-card-border-radius) var(--bs-card-border-radius) 0 0;
}

.card-testimony {
    border-radius: 0;
    border-bottom: transparent;
    border-left: transparent;
    border-right: transparent;
}
</style>