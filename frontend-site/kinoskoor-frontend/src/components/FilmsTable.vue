<script>
    export default {
        name: "FilmsTable",
        props: {
            items: Array
        }
    }
</script>

<template>
    <table class="table table-striped">
        <tr>
            <th>Filmi ID</th>
            <th>Filmi nimi</th>
        </tr>
        <tr v-for="item in items" :key="item.FilmID">
            <td>{{ item.FilmID }}</td>
            <td>{{ item.Name }}</td>
        </tr>
    </table>
</template>

<style scoped/>