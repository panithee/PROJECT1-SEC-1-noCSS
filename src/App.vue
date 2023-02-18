<script setup>
import { ref, toRef, toRefs, computed } from "vue";

let persons = ref([
  { name: "John", price: 200, status: false },
  { name: "jhon", price: 200, status: false },
  { name: "Prim", price: 200, status: false },
  { name: "Henry", price: 200, status: false },
  { name: "Mo", price: 200, status: false },
  { name: "Eve", price: 200, status: false },
  { name: "Oat", price: 200, status: false },
  { name: "Henry", price: 200, status: false },
  { name: "Mo", price: 200, status: false },
  { name: "Eve", price: 200, status: false },
  { name: "Oat", price: 200, status: false },
  { name: "Henry", price: 200, status: false },
  { name: "Mo", price: 200, status: false },
  { name: "Eve", price: 200, status: false },
  { name: "Oat", price: 200, status: false },
]);

let foodLists = ref([
  { name: "somtum", price: 2020, person: [persons.value[0]] },
  { name: "banana", price: 200, person: [persons.value[0], persons.value[1]] },
  { name: "Kaiped", price: 200, person: [persons.value[0]] },
  { name: "Kaikai", price: 200, person: [persons.value[0], persons.value[1]] },
  { name: "somtum", price: 200, person: [persons.value[0]] },
  { name: "banana", price: 200, person: [persons.value[0], persons.value[1]] },
  { name: "Kaiped", price: 200, person: [persons.value[0]] },
  { name: "Kaikai", price: 200, person: [persons.value[0], persons.value[1]] },
  { name: "somtum", price: 200, person: [persons.value[0]] },
  { name: "banana", price: 200, person: [persons.value[0], persons.value[1]] },
  { name: "Kaiped", price: 200, person: [persons.value[0]] },
  { name: "Kaikai", price: 200, person: [persons.value[0], persons.value[1]] },
]);



const clearFoodList = () => {
  foodLists.value = [];
  return foodLists;
};

const deleteAll = () => {
  persons.value = [];
  return persons;
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
let price = ref(0);
let foodName = ref("");
let personFood = ref([]);
let modeTarget = ref("");
let target = ref("");
let personSize = ref();

const eventFoodList = (e, mode) => {
  target.value = e.target.id;
  if (mode === "add") {
    modeTarget.value = "add";
    personSize = 0 //try
    price.value = 0;
    foodName.value = "";
    personFood.value = [];
  }
  if (mode === "edit") {
    modeTarget.value = "edit";
    price.value = foodLists.value[e.target.id].price;
    foodName.value = foodLists.value[e.target.id].name;
    personFood.value = foodLists.value[e.target.id].person;
    personSize = foodLists.value[e.target.id].person.length;
    // foodLists.value[e.index] = e.food;
  } else {
    console.log("Error");
  }
  showMenu();
};

const doneBtn = () => {
  if (modeTarget.value === "add") {
    foodLists.value.push({
      name: foodName.value,
      price: price.value,
      person: personFood.value,
    });
  } else if (modeTarget.value === "edit") {

    foodLists.value[target.value].price = price.value;
    foodLists.value[target.value].name = foodName.value;
    foodLists.value[target.value].person = personFood.value;
  }
  else {
    console.log("Error");
  }
  console.log(foodLists.value[target]);


  modeTarget.value = "";
  target.value = "";

  showMenu();
};

const deleteBtn = () => {
  foodLists.value.splice(target.value, 1)
  showMenu();
}

const showMenuStatus = ref(false);
const showMenu = () => {
  console.log("showMenu");
  showMenuStatus.value = !showMenuStatus.value;
};




</script>

<template>
  <div class="w-screen h-screen">
    <div class="absolute w-full h-full bg-bgPage">
      <h1 class="flex justify-center pt-10 text-3xl font-semibold text-brownFont drop-shadow">
        NO CSS
      </h1>

      <!-- Switch btn page -->
      <div class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn" v-if="sw">
        <div class="flex justify-center w-1/2 bg-btn1 rounded-full my-1 ml-1 mr-0.5" @click="switchMenu('list')">
          <button class="text-xl text-white">All List</button>
        </div>
        <div class="flex justify-center w-1/2 my-1 mr-1 rounded-full" @click="switchMenu('person')">
          <button class="text-xl text-brownFont">Per Person</button>
        </div>
      </div>
      <div class="flex items-center w-1/2 m-auto mt-10 rounded-full bg-bgbtn" v-else>
        <div class="flex justify-center w-1/2 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchMenu('list')">
          <button class="text-xl text-brownFont">All List</button>
        </div>
        <div class="flex justify-center w-1/2 my-1 mr-1 rounded-full cursor-pointer bg-btn1"
          @click="switchMenu('person')">
          <button class="text-xl text-white">Per Person</button>
        </div>
      </div>

      <div class="w-5/6 m-auto mt-10 overflow-y-scroll rounded-3xl bg-bgBox sm:w-1/2 h-1/2" v-if="sw">
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
                  <div v-for="(person, index) in foodLists[index].person" key="index">
                    <span class="px-1 ml-1 text-base" :class="['color-' + (index % 4)]">{{ person.name }}</span>
                  </div>
                </div>

              </td>
              <td class="pr-4 text-2xl text-center">{{ food.price }}</td>
              <td class="pr-4 text-2xl text-center">
                {{ food.price / food.person.length }}
              </td>
              <td>
                <img alt="iconEdit" :id="index" class="w-5 h-5 mr-3" src="./assets/more-vertical.svg"
                  @click="eventFoodList($event, 'edit')" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="sw" class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1">
        <button class="w-full h-full text-xl text-white" @click="eventFoodList($event, 'add')">ADD</button>
      </div>

      <div v-if="sw" class="flex justify-center w-4/12 m-auto mt-5">
        <button class="text-xl underline text-btn1" @click="clearFoodList">
          Clear All
        </button>
      </div>

      <div class="w-5/6 m-auto mt-10 overflow-y-scroll rounded-3xl bg-bgBox sm:w-1/2 h-1/2" v-if="!sw">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell text-2xl text-left sm:hidden pl-9">Name</th>
              <th class="hidden text-2xl text-left pl-9 sm:table-cell">Name</th>
              <th class="text-2xl">Prices</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in persons" key="index" :class="person.status ? 'bg-checkboxGreen' : 'bg-bgBox'">
              <td class="pl-16 text-2xl text-left">
                <div class="mt-2">
                  <input type="checkbox" v-model="person.status" />
                  <label class="= text-2xl"></label>
                  {{ person.name }}
                </div>
              </td>
              <td class="text-2xl text-center">{{ person.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div @click="deleteAll" class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1"
        v-if="!sw">
        <button class="text-xl text-center text-white">Delete All</button>
      </div>


    </div>

    <!-- Model -->
    <div class="fixed w-full h-full" v-show="showMenuStatus">
      <!-- <div class="absolute inset-0 bg-zinc-500/50 " @click="showMenu()"> -->
      <div class="flex items-center justify-center h-screen bg-[#FFF7F0] bg-opacity-70">
        <div class="lg"></div>
        <div class="flex flex-col w-[776px] h-[448px] bg-bgPage rounded-[40px]">

          <div class="flex w-full h-[44px] justify-end">
            <img alt="" class="w-10 h-10 mt-4 mr-4" @click="showMenu()" src="./assets/x.svg" />
          </div>

          <div class="lg:flex lg:max-w-3xl -">
            <div class="flex pl-14 pr-7">
              <div class="flex flex-col items-center rounded-full bg-bgList1 w-[304px] h-[304px]">
                <div class="flex justify-center items-center h-[168px] w-[296px] rounded-t-full bg-bgList1">
                  <input type="number"
                    class="h-[48px] w-[200px] text-center mt-12 text-[48px] bg-bgList1 text-brownFont" />
                </div>
                <div class="mt-3 w-[240px] border-b border-brownFont"></div>
                <div></div>
                <div class="mt-[88px]">AVG price</div>
              </div>
            </div>

            <div class="pl-7 lg:w-1/2">
              <div class="text-2xl first-letter:flex text-brownFont">
                Your Food
              </div>
              <input placeholder="Your Food" v-model="foodName"
                class="mt-2 bg-bgbtn w-[304px] h-[48px] rounded-[20px] pl-4 text-[24px] text-brownFont" type="text" />
              <div class="flex mt-2 text-2xl text-brownFont">Add Payer</div>
              <div class="flex mt-2">
                <img alt="iconEdit" class="h-7" src="./assets/PersonCount.svg" /><span
                  class="pl-2 pr-3 text-xl bg-bgbtn rounded-tr-xl rounded-br-xl">{{ personSize }}</span>
              </div>

              <!-- <div class="flex ">
                        <img alt="iconEdit" class="w-10 h-10 mr-1" src="./assets/user-circle (3).svg" />
                      </div> -->

              <div
                :class="personFood.length !== 0 ? 'flex mt-2 bg-bgbtn w-[280px] h-[92px] rounded-2xl' : 'flex mt-2 bg-bgbtn w-[280px] h-[92px] rounded-2xl justify-center items-center'">
                <div v-if="personFood.length == 0" class="flex items-center justify-center px-2 m-2 h-9 text-slate-700">No
                  one right now~~</div>
                <div v-else
                  class="flex flex-wrap w-24 h-20 overflow-y-scroll sm:overflow-hidden sm:flex-nowrap sm:w-36 sm:h-auto sm:overflow-x-scroll">
                  <div class="mt-1 ml-1" v-for="(person, index) in personFood" key="index">
                    <span class="px-2 text-base " :class="['color-' + (index % 4)]">{{ person.name }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-row mt-4">
                <input class="h-8 w-[224px] pl-4 text-xl bg-bgbtn rounded-xl text-brownFont"
                  placeholder="Please add name..." type="text" />
                <button><img class="h-8 ml-3" src="./assets/addPersonBtn.svg" alt="" /></button>
              </div>

              <div class="flex flex-row mt-5">
                <button class="h-[56px] w-[106px] bg-btn1 rounded-3xl text-white text-xl" @click="doneBtn">
                  Done
                </button>
                <button class="ml-5 text-xl underline text-btn1" @click="deleteBtn">Delete</button>
              </div>

              <!-- <img alt="iconEdit" class="w-10 h-10 mr-1" src="./assets/user-circle (3).svg" /> -->

              <!-- <div class="flex justify-center">
                        <button class="w-1/4 h-16 my-4 text-xl bg-white rounded-3xl text-btn1">Done</button>
                      </div> -->
            </div>
          </div>
          <!--         <div class=""></div>-->
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-white dark:bg-gray-900">
    <div class="bottom-0 w-full h-20 bg-bgFooter">
      <div class="flex">
        <p class="w-1/2 text-2xl text-center pt-7">
          Total:{{ totalFoodLits }}
        </p>
        <p class="w-1/2 text-2xl text-center pt-7">
          Person: {{ persons.length }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Itim&display=swap);

h1,
p,
tr,
th,
td,
button,
div {
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

.square {
  width: 100%;
  height: 0;
  padding-top: 100%;
}
</style>
