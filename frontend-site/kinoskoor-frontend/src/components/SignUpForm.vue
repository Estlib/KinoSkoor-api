<script>
    export default {
        methods: {
            async signUp() {
                console.log("button is clicked")
                await(
                    await fetch(`http://localhost:8080/users/`, 
                    {
                        method: 'POST', 
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify(this.NewUser),
                        
                    })
                )
            }
        },
        name: "SignUpForm",
        data() {
            return {NewUser: {
                FullName: "Sinu nimi",
                EmailAddress: "Emailiaadress",
                PlainPassword: "Parool",
                DisplayName: "Nimi mida teised näevad",
                PlainPhoneNumber2FA: "",
            }}
        }
    }
</script>

<template>
    <h1>Sisesta oma andmed:</h1>
    <form @submit.prevent="signUp">
        <div>
            <label>FullName</label>
            <input v-model="NewUser.FullName" type="text"/>
        </div>
        <div>
            <label>EmailAddress</label>
            <input v-model="NewUser.EmailAddress" type="text"/>
        </div>
        <div>
            <label>PlainPassword</label>
            <input v-model="NewUser.PlainPassword" type="text"/>
        </div>
        <div>
            <label>DisplayName</label>
            <input v-model="NewUser.DisplayName" type="text"/>
        </div>
        <div>
            <label>PlainPhoneNumber2FA</label>
            <input v-model="NewUser.PlainPhoneNumber2FA" type="text"/>
        </div>
        <button type="submit">Registreeru</button>
    </form>
</template>