<script>
    // import FilmDetailsTable from '../components/FilmDetailsTable';
    export default{
        components: {
            thisFilm: {
                FilmID: "",
                Name:"",
                Description:"desc",
                UserScore:1,
                RunTime:1,
                ReleaseYear:2000,
                Language:""
            }
        },
        props: {
            seekID:{
                type:String,
                required:true
            },   
        },
        data() {return {thisFilm:
            {
            FilmID: "",
            Name:"",
            Description:"desc",
            UserScore:1,
            RunTime:1,
            ReleaseYear:2000,
            Language:""
            }
        }
        },
        
        beforeMount() {
            this.getDetails()
        },
        methods: {
            async getDetails() {
            this.thisFilm = await (await fetch(`http://localhost:8080/films/${this.seekID}`)).json();
        }            
        }
    }
</script>
<template>
    <table class="table table-striped">
        <tr>
            <td>Filmi ID</td>
            <td>{{thisFilm.FilmID}}</td>
        </tr>
        <tr>
            <td>Nimi</td>
            <td>{{thisFilm.Name}}</td>
        </tr>
        <tr>
            <td>Kirjeldus</td>
            <td>{{thisFilm.Description}}</td>
        </tr>
        <tr>
            <td>Hinnang</td>
            <td>{{thisFilm.UserScore}}</td>
        </tr>
        <tr>
            <td>Pikkus</td>
            <td>{{thisFilm.RunTime}}</td>
        </tr>
        <tr>
            <td>Väljalaskeaasta</td>
            <td>{{thisFilm.ReleaseYear}}</td>
        </tr>
        <tr>
            <td>Filmi keel</td>
            <td>{{thisFilm.Language}}</td>
        </tr>
    </table>
</template>