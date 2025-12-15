<script>
    import FilmsTable from '../components/FilmsTable.vue'
    export default {
        components: {
            FilmsTable
        },
        data() {
            return{
            allFilms: []
        }
        },
    async created() {
        this.allFilms = await (await fetch('http://localhost:8080/films')).json()
        }
    }
</script>
<template>
    <main>
        <FilmsTable :items="allFilms"/>
    </main>
</template>