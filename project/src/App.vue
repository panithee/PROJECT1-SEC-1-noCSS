<script setup>
import { ref, toRef , toRefs} from "vue";

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
let name = toRef(foodLists.value[1], 'name')

let personSize = toRef(foodLists.value[1].person, 'length')

let personInList = toRef(foodLists.value[1], 'person.name')

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
let price = ref(0);
let foodName = ref("");
let personFood = ref([]);
let modeTarget = ref("");
let target = ref("");
const eventFoodList = (e, mode) => {
  target.value = e.target.id;
  if (mode === "add") {
    modeTarget.value = "add";
    // foodLists.value.push(e);
    price.value = 0;
    foodName.value = "";
    personFood.value = [];
  } if (mode === "edit") {
    modeTarget.value = "edit";
    price.value  = foodLists.value[e.target.id].price;
    foodName.value = foodLists.value[e.target.id].name;
    personFood.value = foodLists.value[e.target.id].person;
    // foodLists.value[e.index] = e.food;
  } else {
    console.log("Error");
  }
  showMenu();
};
const doneEdit = () => {
  if(modeTarget.value === "add"){
    foodLists.value.push({
      name: foodName.value,
      price: price.value,
      person: personFood.value,
    });
  } else if(modeTarget.value === "edit"){
    foodLists.value[target] = {
      name: foodName.value,
      price: price.value,
      person: personFood.value,
    };
  }
  else {
    console.log("Error");
  }
  console.log(foodLists.value[target]);
  modeTarget.value = "";
  target.value = "";

  showMenu();
};
const showMenuStatus = ref(false);
const showMenu = () => {
  console.log("showMenu");
  showMenuStatus.value = !showMenuStatus.value;
};


</script>

<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full bg-bgPage fixed inset-x-0 top-0">
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

      <div v-if="sw" class="w-5/6 m-auto mt-10 overflow-y-scroll rounded-3xl bg-bgBox lg:w-1/2 h-1/2">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell pl-10 text-2xl text-left lg:hidden">
                Your Food
              </th>
              <th class="hidden pl-10 text-2xl text-left lg:table-cell">
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
                  class="flex flex-wrap w-24 h-20 overflow-y-scroll lg:overflow-hidden lg:flex-nowrap lg:w-36 lg:h-auto lg:overflow-x-scroll">
                  <div v-for="(person, index) in foodLists[index].person" key="index">
                    <span :class="['color-' + (index % 4)]" class="mr-2 text-base">{{ person.name }}</span>
                  </div>
                </div>
              </td>
              <td class="pr-4 text-2xl text-center">{{ food.price }}</td>
              <td class="pr-4 text-2xl text-center">
                {{ food.price / food.person.length }}
              </td>
              <td>
                <img alt="iconEdit" :id="index " class="w-5 h-5 mr-3" src="./assets/more-vertical.svg" @click="eventFoodList($event,'edit')" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="sw" class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1">
        <button class="text-xl text-white"  @click="eventFoodList($event, 'add')">ADD</button>
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
    </div>

    <!-- Model -->
    <div class="w-full h-full  fixed " v-show="showMenuStatus">
      <!-- <div class="absolute inset-0 bg-zinc-500/50  " @click="showMenu()"> -->
      <div class="flex items-center justify-center h-screen bg-[#FFF7F0] bg-opacity-70" @click="showMenu()">

        <div class="lg"></div>
        <!-- <div class="relative  w-11/12  bg-bgPage rounded-[56px] flex  flex-wrap   lg:h-1/2 lg:mt-52 lg:p-2 max-w-3xl"> -->
        <div class="flex flex-col w-[776px] h-[408px] bg-bgPage rounded-[56px]">
          <!-- grid grid-cols-2 -->
          <!-- <div class="w-full relative top-0 right-0 h-0.5 "><img alt="" class="absolute top-0 right-0 w-5 mt-5 mr-7 "
            @click="showMenu()" src="./assets/x.svg"></div> -->
          <div class="flex w-full h-[64px] justify-end"><img alt="" class="w-10 mt-6 mr-6 " @click="showMenu()"
              src="./assets/x.svg"></div>

          <div class="w-full lg:flex lg:max-w-3xl -">
            <!-- <div class="flex w-[300px] m-auto lg:w-1/2"> -->
            <div class="flex pl-14 pr-7">
              <div class="rounded-full bg-bgList1 w-[304px] h-[304px]"></div>
            </div>
            <!-- <div class="lg"></div> -->
            <div class="w-full  pl-7 lg:w-1/2">

              <div class="text-2xl first-letter:flex text-brownFont">Your Food</div>
              <!-- <input :placeholder="name" class="w-2/4 pl-2 ml-1 text-xl bg-bgbtn rounded-xl text-brownFont"
                type="text" /> -->
              <input :placeholder="name"
                class="mt-2 bg-bgbtn w-[304px] h-[56px] rounded-3xl pl-4 text-[24px] text-brownFont" type="text" />

              <div class="mt-2 flex text-2xl text-brownFont ">Add Payer</div>
              <div class="mt-2 flex"><img alt="iconEdit" class="h-7" src="./assets/PersonCount.svg" /><span
                  class="pl-2 pr-3 text-xl bg-bgbtn rounded-tr-xl rounded-br-xl">{{ personSize }}</span></div>

              <!-- <div class="flex ">
              <img alt="iconEdit" class="w-10 h-10 mr-1" src="./assets/user-circle (3).svg" />
            </div> -->

            <div class="mt-2 bg-bgbtn px-2">
              <div><img class="h-6" src="./assets/nonPerson .png" alt=""></div>
            </div>

              <div class="flex">
                <input class="mt-2 text-xl bg-bgbtn rounded-3xl text-brownFont" placeholder="Please add name..."
                  type="text" />
                <!-- <img alt="iconEdit" class="w-10 h-10 mr-1" src="./assets/user-circle (3).svg" /> -->
              </div>

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

.square {
  width: 100%;
  height: 0;
  padding-top: 100%;
}
</style>
