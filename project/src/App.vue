<script setup>
import { ref } from "vue";

let persons = [{ name: "John" }, { name: "jhon" }];
let foodLists = [
  { name: "somtum", price: 200, person: [persons[0]] },
  { name: "banana", price: 200, person: [persons[0], persons[1]] },
];

const food = () => {};

const sw = ref(true);
const switchMenu = (e) => {
  if (e === "list") {
    sw.value = true;
  }
  if (e === "person") {
    sw.value = false;
  }
};
const totalFoodLits = ref(
  foodLists.reduce((total, food) => total + food.price, 0)
);
</script>

<template>
  <div class="w-screen h-screen bg-bgPage">
    <div class="w-full h-full">
      <h1
        class="flex justify-center pt-10 text-3xl font-semibold text-brownFont drop-shadow"
      >
        NO CSS
      </h1>

      <div
        v-if="sw"
        class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn"
      >
        <div
          class="flex justify-center w-1/2 bg-btn1 rounded-full my-1 ml-1 mr-0.5"
          @click="switchmenu('list')"
        >
          <button class="text-xl text-white">All List</button>
        </div>
        <div
          class="flex justify-center w-1/2 my-1 mr-1 rounded-full"
          @click="switchmenu('person')"
        >
          <button class="text-xl text-brownFont">Per Person</button>
        </div>
      </div>

      <div
        v-else
        class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn"
      >
        <div
          class="flex justify-center w-1/2 rounded-full my-1 ml-1 mr-0.5 cursor-pointer"
          @click="switchmenu('list')"
        >
          <button class="text-xl text-brownFont">All List</button>
        </div>
        <div
          class="flex justify-center w-1/2 my-1 mr-1 rounded-full cursor-pointer bg-btn1"
          @click="switchmenu('person')"
        >
          <button class="text-xl text-white">Per Person</button>
        </div>
      </div>

      <div v-if="sw" class="w-5/6 m-auto mt-10 rounded-3xl bg-bgBox sm:w-1/2">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell pl-5 text-2xl sm:hidden">Your Food</th>
              <th class="hidden pl-5 text-2xl sm:table-cell">
                Your Food Lists
              </th>
              <th class="pr-4 text-2xl">Prices</th>
              <th class="pr-4 text-2xl">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(food, index) in foodLists" key="index">
              <td class="pl-5 text-2xl text-center">{{ food.name }}</td>
              <td class="pr-4 text-2xl text-center">{{ food.price }}</td>
              <td class="pr-4 text-2xl text-center">
                {{ food.price / food.person.length }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="sw"
        class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1"
      >
        <button class="text-xl text-white" @click="">ADD</button>
      </div>

      <div v-if="sw" class="flex justify-center w-4/12 m-auto mt-5">
        <button class="text-xl underline text-btn1">Clear All</button>
      </div>

      <div class="fixed bottom-0 w-full h-20 bg-bgFooter">
        <div class="flex">
          <p class="w-1/2 text-2xl text-center pt-7">
            Total:{{ totalFoodLits }}
          </p>
          <p class="w-1/2 text-2xl text-center pt-7">Person:</p>
        </div>
      </div>
    </div>

    <!--    pop up -->
    <div></div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

h1,
p,
tr,
th,
td,
button {
  font-family: "Itim", serif;
}

.color-0 {
  background-color: #edffe9;
  border-radius: 0.75rem;
}

.color-1 {
  background-color: #f7e9ff;
  border-radius: 0.75rem;
}

.color-2 {
  background-color: #ffe9ee;
  border-radius: 0.75rem;
}
.color-3 {
  background-color: #fff9e9;
  border-radius: 0.75rem;
}
</style>
