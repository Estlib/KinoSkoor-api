<script>
    export default {
        name: "FilmsTable",
        props: {
            items: Array
        },
        methods: {
            async deltest(FilmID) {
                await (await fetch(`http://localhost:8080/films/${FilmID}`, {method: 'DELETE'}))
            }
        }
        }
</script>

<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Filmi ID</th>
                <th>Filmi nimi</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.FilmID">
                <td>{{ item.FilmID }}</td>
                <td>{{ item.Name }}</td>
                <td>
                    <router-link :to="{name:'film', params: {seekID: item.FilmID}}">
                        <button @click="navigate">ä</button>
                    </router-link>                    
                </td>
                <td>
                    <router-link :to="{name:'films'}">
                        <button @click="deltest(item.FilmID)">remof</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped/>