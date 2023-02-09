<script setup>
import { ref, computed } from "vue";
let persons = [{ name: "John" }, { name: "jhon" }, { name: "Prim" }, { name: "Henry" }, { name: "Mo" }, { name: "Eve" }, { name: "Oat" }, { name: "Henry" }, { name: "Mo" }, { name: "Eve" }, { name: "Oat" }, { name: "Henry" }, { name: "Mo" }, { name: "Eve" }, { name: "Oat" }]
let foodLists = ref([{ name: "somtum", price: 200, person: [persons[0]] }, { name: "banana", price: 200, person: [persons[0], persons[1]] }])

const hello = () => {
  console.log("Hello")
}

const clearFoodList = () => {
  foodLists.value = []
  return foodLists
}

const sw = ref(true);
const switchMenu = (e) => {
  if (e === "list") {
    sw.value = true;
  }
  if (e === "person") {
    sw.value = false;
  }
};
const totalFoodLits = ref(foodLists.value.reduce((total, food) => total + food.price, 0))

</script>

<template>

  <div class="w-screen h-screen bg-bgPage">
    <div class="w-full h-full">
      <h1 class="flex justify-center pt-10 text-3xl text-brownFont font-semibold drop-shadow">
        NO CSS
      </h1>

      <div class="flex w-1/2 items-center bg-bgbtn rounded-full m-auto  mt-10 " v-if="sw">
        <div class="flex justify-center w-1/2 bg-btn1 rounded-full my-1 ml-1 mr-0.5" @click="switchMenu('list')">
          <button class="text-xl text-white">All List</button>
        </div>
        <div class="flex justify-center w-1/2 rounded-full my-1 mr-1" @click="switchMenu('person')">
          <button class="text-xl text-brownFont">Per Person</button>
        </div>
      </div>

      <div class="flex w-1/2 items-center bg-bgbtn rounded-full m-auto mt-10" v-else>
        <div class="flex justify-center w-1/2 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchMenu('list')">
          <button class="text-xl text-brownFont">All List</button>
        </div>
        <div class="flex justify-center w-1/2 bg-btn1 rounded-full my-1 mr-1 cursor-pointer"
          @click="switchMenu('person')">
          <button class="text-xl text-white">Per Person</button>
        </div>
      </div>

      <div class="m-auto mt-10 rounded-3xl bg-bgBox w-5/6  sm:w-1/2" v-if="sw">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell pl-5 text-2xl sm:hidden">Your Food </th>
              <th class="pl-10 text-2xl text-left hidden sm:table-cell">Your Food Lists</th>
              <th class="text-2xl pr-4">Prices</th>
              <th class="text-2xl pr-4">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(food, index) in foodLists" key="index">
              <td class="text-2xl pl-10 text-left">
                {{ food.name }}
            <tr>
              <div class="w-1/2 overflow-x-scroll">
                <td v-for="(person, index) in persons" key="index">
                <span class="text-base mr-2" :class="['color-' + index % 4]">{{ person.name }}</span> 
               </td>
              </div>
            </tr>

            </td>
            <td class="text-2xl pr-4 text-center">{{ food.price }}</td>
            <td class="text-2xl pr-4 text-center">{{ food.price / food.person.length }}</td>
            <td>
              <img src="./assets/iconEdit.svg" alt="iconEdit" class="mr-3 w-5 h-5" @click="hello">
            </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center m-auto mt-5 bg-btn1 w-2/12 h-12 rounded-full" v-if="sw">
        <button class="text-white text-xl">ADD</button>

      </div>

      <div class="flex justify-center m-auto mt-5 w-4/12" v-if="sw">
        <button @click="clearFoodList" class="text-btn1 text-xl underline">Clear All</button>
      </div>

      <div class="w-full h-20 bg-bgFooter fixed bottom-0 ">
        <div class="flex ">
          <p class="w-1/2 text-2xl pt-7 text-center">Total:{{ totalFoodLits }}</p>
          <p class="w-1/2 text-2xl pt-7 text-center">Person: {{ persons.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");

h1,
p,
tr,
th,
td,
button {
  font-family: "Itim";
}

.color-0 {
  background-color: #EDFFE9;
  border-radius: 0.75rem;
}

.color-1 {
  background-color: #F7E9FF;
  border-radius: 0.75rem;
}

.color-2 {
  background-color: #FFE9EE;
  border-radius: 0.75rem;
}
.color-3 {
  background-color: #FFF9E9;
  border-radius: 0.75rem;
}


</style>
