<script setup>
import { ref } from "vue";
let persons = [{ name: "John" }, { name: "jhon" }];
let foodLists = [
  { name: "somtum", price: 200, person: [persons[0]] },
  { name: "banana", price: 200, person: [persons[0], persons[1]] },
];

const food = () => {};

const sw = ref(true);
const switchmenu = (e) => {
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

const toggleOverlay = ref(false);

const toggle = (e) => {
  toggleOverlay.value = !toggleOverlay.value;
  if (toggleOverlay.value === true) {
  }
};
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
        class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn"
        v-if="sw"
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
        class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn"
        v-else
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

      <div class="w-5/6 m-auto mt-10 rounded-3xl bg-bgBox sm:w-1/2" v-if="sw">
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
        class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1"
        v-if="sw"
      >
        <button @click="toggle()" class="text-xl text-white">ADD</button>
      </div>

      <div class="flex justify-center w-4/12 m-auto mt-5" v-if="sw">
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
    // pop-up
    <div v-if="toggleOverlay">
      <!-- <div
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
      ></div> -->
      <div class="fixed w-7/12 m-auto bg-slate-400 h-1/2"></div>
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
</style>
