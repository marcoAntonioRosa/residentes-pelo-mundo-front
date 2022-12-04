<template>
    <div id="company_map_form"></div>
</template>

<script>
import leaflet from 'leaflet'
import { onMounted } from 'vue';

export default {

    props: ['id', 'latitude', 'longitude'],

    setup(props, context) {
        let map;
        let oldMarker = {};

        onMounted(() => {
            
            if (map !== undefined)
                map.remove()

            const latitude = props.latitude
            const longitude = props.longitude

            map = leaflet.map('company_map_form').setView([latitude, longitude], 15);

            map.on('click', onMapClick);

            leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        })

        const onMapClick = (e) => {
            if (oldMarker !== undefined)
                map.removeLayer(oldMarker)

            const { lat, lng } = e.latlng;
            oldMarker = leaflet.marker([lat, lng]).addTo(map);

            context.emit("changedCoordinates", e);
        }
    },

}

</script>

<style>
#company_map_form {
    height: 480px;
}
</style>
