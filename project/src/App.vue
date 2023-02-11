
<script setup>
import { ref } from "vue";

let persons = [
  { name: "John" },
  { name: "jhon" },
  { name: "Prim" },
  { name: "Henry" },
  { name: "Mo" },
  { name: "Eve" },
  { name: "Oat" },
  { name: "Henry" },
  { name: "Mo" },
  { name: "Eve" },
  { name: "Oat" },
  { name: "Henry" },
  { name: "Mo" },
  { name: "Eve" },
  { name: "Oat" },
];
let foodLists = ref([
  { name: "somtum", price: 200, person: [persons[0]] },
  { name: "banana", price: 200, person: [persons[0], persons[1]] },
  { name: "Kaiped", price: 200, person: [persons[0]] },
  { name: "Kaikai", price: 200, person: [persons[0], persons[1]] },
  { name: "somtum", price: 200, person: [persons[0]] },
  { name: "banana", price: 200, person: [persons[0], persons[1]] },
  { name: "Kaiped", price: 200, person: [persons[0]] },
  { name: "Kaikai", price: 200, person: [persons[0], persons[1]] },
  { name: "somtum", price: 200, person: [persons[0]] },
  { name: "banana", price: 200, person: [persons[0], persons[1]] },
  { name: "Kaiped", price: 200, person: [persons[0]] },
  { name: "Kaikai", price: 200, person: [persons[0], persons[1]] },
]);

const hello = () => {
  console.log("Hello");
};

const clearFoodList = () => {
  foodLists.value = [];
  return foodLists;
};

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
  foodLists.value.reduce((total, food) => total + food.price, 0)
);
const eventFoodList = (e, mode) => {
  showMenu();
  if (mode === "add") {
    foodLists.value.push(e);
  } else if (mode === "edit") {
    foodLists.value[e.index] = e.food;
  } else if (mode === "delete") {
    foodLists.value.splice(e, 1);
  } else {
    console.log("Error");
  }
};
const showMenuStatus = ref(true);
const showMenu = () => {
  showMenuStatus.value = !showMenuStatus.value;
};
</script>

<template>
  <div class="w-screen h-screen">
    <!-- <div class="w-full h-full bg-bgPage">
      <h1 class="flex justify-center pt-10 text-3xl font-semibold text-brownFont drop-shadow">
        NO CSS
      </h1>

      <div v-if="sw" class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn">
        <div class="flex justify-center w-1/2 bg-btn1 rounded-full my-1 ml-1 mr-0.5" @click="switchMenu('list')">
          <button class="text-xl text-white">All List</button>
        </div>
        <div class="flex justify-center w-1/2 my-1 mr-1 rounded-full" @click="switchMenu('person')">
          <button class="text-xl text-brownFont">Per Person</button>
        </div>
      </div>

      <div v-else class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn">
        <div class="flex justify-center w-1/2 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchMenu('list')">
          <button class="text-xl text-brownFont">All List</button>
        </div>
        <div class="flex justify-center w-1/2 my-1 mr-1 rounded-full cursor-pointer bg-btn1"
          @click="switchMenu('person')">
          <button class="text-xl text-white">Per Person</button>
        </div>
      </div>

      <div v-if="sw" class="w-5/6 m-auto mt-10 overflow-y-scroll rounded-3xl bg-bgBox sm:w-1/2 h-1/2">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell pl-10 text-2xl text-left sm:hidden">
                Your Food
              </th>
              <th class="hidden pl-10 text-2xl text-left sm:table-cell">
                Your Food Lists
              </th>
              <th class="pr-4 text-2xl">Prices</th>
              <th class="pr-4 text-2xl">Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(food, index) in foodLists" key="index">
              <td class="pl-10 text-2xl text-left">
                {{ food.name }}
                <div
                  class="flex flex-wrap w-24 h-20 overflow-y-scroll sm:overflow-hidden sm:flex-nowrap sm:w-36 sm:h-auto sm:overflow-x-scroll">
                  <div v-for="(person, index) in persons" key="index">
                    <span :class="['color-' + (index % 4)]" class="mr-2 text-base">{{ person.name }}</span>
                  </div>
                </div>
              </td>
              <td class="pr-4 text-2xl text-center">{{ food.price }}</td>
              <td class="pr-4 text-2xl text-center">
                {{ food.price / food.person.length }}
              </td>
              <td>
                <img alt="iconEdit" class="w-5 h-5 mr-3" src="./assets/iconEdit.svg" @click="hello" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="sw" class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1">
        <button class="text-xl text-white" @click="eventFoodList($event, null)">ADD</button>
      </div>

      <div v-if="sw" class="flex justify-center w-4/12 m-auto mt-5">
        <button class="text-xl underline text-btn1" @click="clearFoodList">
          Clear All
        </button>
      </div>

      <div class="fixed inset-x-0 bottom-0 w-full h-20 bg-bgFooter">
        <div class="flex">
          <p class="w-1/2 text-2xl text-center pt-7">
            Total:{{ totalFoodLits }}
          </p>
          <p class="w-1/2 text-2xl text-center pt-7">
            Person: {{ persons.length }}
          </p>
        </div>
      </div>
    </div> -->

    <!-- Model -->
    <div class="fixed inset-0 bg-zinc-500/50" v-show="showMenuStatus">

      <div class="w-11/12 h-4/6 bg-bgPage mt-20 m-auto  rounded-[56px] flex  flex-wrap ">
        <div class="flex w-1/2 aspect-square ">
          <!-- <div class="w-[400px] rounded-full bg-bgList1 h-[400px]"></div> -->
        </div>

        <div class="flex flex-col ">
          <div class="flex text-4xl text-brownFont">Your Food</div>
          <div class="flex mt-3">
            <!-- <input class="bg-bgbtn w-[400px] h-[64px] rounded-3xl pl-4 text-[24px] text-brownFont" type="text"
              v-model="name" :placeholder="name" /> -->
          </div>
          <div class="flex text-4xl text-brownFont mt-[30px]">Add Payer</div>
          <div class="mt-[14px]">
            <!-- <div>{{ personSize }}</div> -->
            <div class="flex h-6 bg-bgbtn"></div>
          </div>
          <div class="h-12 mt-4 bg-bgbtn"></div>
        </div>

        <!-- <div class=""></div> -->
      </div>
      <!-- <div class="inset-0 w-full h-full bg-black opacity-50 "></div> -->
    </div>

  </div>

</template>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Itim&display=swap);

h1,
p,
tr,
th,
td,
button {
  font-family: "Itim";
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
