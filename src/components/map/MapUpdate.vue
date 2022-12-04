<template>
    <div class="big_map" :id="'company_map_' + this.id"></div>
</template>

<script>
import leaflet from 'leaflet'
import { onMounted } from 'vue';

export default {

    props: ['id', 'latitude', 'longitude', 'companyName'],

    setup(props, context) {
        let map;
        let oldMarker = {};
        onMounted(() => {

            if (map !== undefined)
                map.remove()

            const mapId = props.id
            const latitude = props.latitude
            const longitude = props.longitude

            map = new leaflet.map('company_map_' + mapId).setView([latitude, longitude], 15);
            oldMarker = leaflet.marker([latitude, longitude]).addTo(map).bindPopup("<b>" + props.companyName + "</b>").openPopup();

            map.on('click', onMapClick);

            leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        })

        const onMapClick = (e) => {
            if (oldMarker !== undefined)
                map.removeLayer(oldMarker)

            const { lat, lng } = e.latlng;
            oldMarker = leaflet.marker([lat, lng]).addTo(map).bindPopup("<b>" + props.companyName + "</b>").openPopup();

            context.emit("changedCoordinates", e);
        }
    },

}

</script>

<style>
.big_map {
    height: 480px;
}
</style>