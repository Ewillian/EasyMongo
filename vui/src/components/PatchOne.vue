<template>

  <div class="container">
    <div id="nav">
      <router-link :to="{ name: 'GetAll', params: { collection_name: this.$route.params.collection_name}}">Retour</router-link>
    </div>
    <h1>Modification de la donnée:</h1>
    <p class="error" v-if="error">{{error}}</p>

    <form action="" method="post">
      <div v-for="(data, index) in values"
              v-bind:item="data"
              v-bind:index="index"
              v-bind:id="data"
              v-bind:key="data.id">
        <label for="name">{{keys[index]}}: </label>
        <br><center><input type="text" name="name" :id=keys[index] :value=values[index] @change="setvalue($event.target.value, $event.target.id)" required></center>
      </div>
    </form>

  <br><router-link :to="{ name: 'PatchConfirm', params: {collection_name, content,  content_id}}"><button id='send' type='submit'>Valider les modifications</button></router-link>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ImportVue',
  data() {
    return {
      keys: [],
      values: [],
      error: '',
      text:'',
      content: {},
      collection_name: this.$route.params.collection_name,
      content_id: ''
    }
  },

  methods: {
    setvalue(value, key){
      this.content[key] = value
    }
  },

  async created() {
    axios({
      method: 'post',
      url: `http://localhost:6060/import/fromcollection/${this.$route.params.data_id}`,
      headers: {'Content-Type': 'application/json'}, 
      data: {
        collection_name: this.$route.params.collection_name
      }
    })
     .then(response => {  
       let data = response.data.json_to_object
       console.log(data)
       this.content = data
       this.content_id = this.content._id
       console.log(this.content._id)
       delete data["__v"]
       delete data["_id"]
       this.keys = Object.keys(data)
       this.values = Object.values(data)
     })
     .catch(e => {
       this.errors = e
     })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.data {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}


</style>