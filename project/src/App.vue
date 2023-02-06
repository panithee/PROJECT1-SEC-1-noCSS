<script setup>
import { ref } from "vue";
let persons = [{name: "John"},{name: "jhon"}]
let foodLists = [{name: "somtum" ,price :200,person: [persons[0]]},{name: "banana" ,price :200,person: [persons[0],persons[1]]}];

const food = () => {

}

const sw = ref(true);
const switchmenu = (e) => {
  if (e === "list") {
    sw.value = true;
  }
  if (e === "person") {
    sw.value = false;
  }
};  
const totalFoodLits = ref(foodLists.reduce((total,food)=>total+food.price,0))

</script>

<template>

  <div class="w-screen h-screen bg-bgPage">
    <div class="w-full h-full">
      <h1 class="flex justify-center pt-10 text-3xl text-brownFont font-semibold drop-shadow">
        NO CSS
      </h1>

      <div class="flex w-1/2 items-center bg-bgbtn rounded-full m-auto  mt-10 " v-if="sw">
        <div class="w-1/2 bg-btn1 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchmenu('list')">
          <p class="text-xl text-center text-white">All List</p>
        </div>
        <div class="w-1/2 rounded-full my-1 mr-1 cursor-pointer" @click="switchmenu('person')">
          <p class="text-xl text-center text-brownFont">Per Person</p>
        </div>
      </div>

      <div class="flex w-1/2 items-center bg-bgbtn rounded-full m-auto mt-10" v-else>
        <div class="w-1/2 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchmenu('list')">
          <p class="text-xl text-center text-brownFont">All List</p>
        </div>
        <div class="w-1/2 bg-btn1 rounded-full my-1 mr-1 cursor-pointer" @click="switchmenu('person')">
          <p class="text-xl text-center text-white">Per Person</p>
        </div>
      </div>

      <div class="m-auto mt-10 rounded-3xl bg-bgBox w-5/6  sm:w-1/2" v-if="sw">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell pl-5 text-2xl sm:hidden">Your Food </th> 
              <th class="pl-5 text-2xl hidden sm:table-cell">Your Food Lists</th> 
              <th class="text-2xl pr-4">Prices</th>
              <th class="text-2xl pr-4">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(food,index ) in foodLists" key="index">
              <td class="text-2xl pl-5 text-center">{{ food.name }}</td>
              <td class="text-2xl pr-4 text-center">{{ food.price }}</td>
              <td class="text-2xl pr-4 text-center">{{ food.price/food.person.length}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center m-auto mt-5 bg-btn1 w-2/12 h-12 rounded-full" v-if="sw">
        <p class="text-white text-center text-xl">ADD</p>
      </div>
      
      <div class="flex justify-center m-auto mt-5 w-4/12" v-if="sw">
        <p class="text-btn1 text-center text-xl underline">Clear All</p>
      </div>

      <div class="w-full h-20 bg-bgFooter fixed bottom-0 ">
        <div class="flex ">
          <p class="w-1/2 text-2xl pt-7 text-center">Total:{{totalFoodLits}}</p>
          <p class="w-1/2 text-2xl pt-7 text-center">Person:</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");

h1,p,tr,th,td {
  font-family: "Itim";
}
</style>
