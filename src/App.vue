<script setup>
import { ref, computed } from "vue";

let persons = ref([
  { name: "John", price: 200, status: false },
  { name: "Prim", price: 200, status: false },
]);

let foodLists = ref([
  { name: "somtum", price: 2020, person: [] },
  { name: "banana", price: 200, person: [persons.value[0], persons.value[1]] },
]);

// switch page
const sw = ref(true);
const switchMenu = (e) => {
  if (e === "list") {
    sw.value = true;
  }
  if (e === "person") {
    sw.value = false;
  }
};

// List food
let price = ref(0);
let foodName = ref("");
let personFood = ref([]);
let modeTarget = ref("");
let target = ref("");
let personSize = ref();

const eventFoodList = (e, mode) => {

  if (mode === "add") {
    modeTarget.value = "add";
    price.value = 0;
    foodName.value = "";
    personFood.value = [];
  }
  if (mode === "edit") {
    target.value = e.target.id;
    modeTarget.value = "edit";
    const food = foodLists.value[e.target.id];
    price.value = food.price;
    foodName.value = food.name;
    personFood.value = food.person;
    personSize = food.person.length;
  } else {
    console.log("Error");
  }
  showMenu();
};

const doneBtn = () => {
  if (foodName.value === "" || price.value == " ") {
    console.log("Error");
  }
  else if (modeTarget.value === "add") {
    foodLists.value.push({
      name: foodName.value,
      price: price.value,
      person: personFood.value,
    });
    foodName.value = "";
    price.value = 0;
    personFood.value = [];
  } else if (modeTarget.value === "edit") {

    foodLists.value[target.value].price = price.value;
    foodLists.value[target.value].name = foodName.value;
    foodLists.value[target.value].person = personFood.value;
  } else {
    console.log("Error");
  }
  console.log(foodLists.value[target]);


  modeTarget.value = "";
  target.value = "";

  showMenu();
};
const clearFoodList = () => {
  foodLists.value = [];
  return foodLists;
};

const deleteAll = () => {
  persons.value = [];
  return persons;
};

const deleteBtn = () => {
  foodLists.value.splice(parseInt(target.value), 1)
  showMenu();
}
const totalFoodLists = computed(() => foodLists.value.reduce((total, food) => total + food.price, 0));
// show model
const showMenuStatus = ref(false);
const showMenu = () => {
  console.log("showMenu");
  alertName.value = false;
  showMenuStatus.value = !showMenuStatus.value;
};

const checkPerson = (personName) => {
  return personFood.value.filter(person => person.name === personName).length > 0;
};

const chooseToggle = (personName) => {
  if (checkPerson(personName)) {
    personFood.value = personFood.value.filter(
      (person) => person.name !== personName
    );
  } else {
    personFood.value.push(persons.value.find((person) => person.name === personName));
  }
};

const namePerson = ref("");
const alertName = ref(false);
const addPerson = () => {

  if (namePerson.value !== "" && !(persons.value.find((person) => person.name.toLowerCase() === namePerson.value.toLowerCase()))) {
    alertName.value = false;
    persons.value.push({ name: namePerson.value, price: 0, status: false });

    namePerson.value = "";
  }
  else {
    alertName.value = true;
  }
};
const deletePerson = (event) => {

  for (const food of foodLists.value) {
    food.person = food.person.filter((person) => person.name !== persons.value[event.target.id].name);
  }
  persons.value.splice(event.target.id, 1);
};
// person
const personPrices = computed(() => {
  for (const person of persons.value) {
    person.price = 0;
    for (const food of foodLists.value) {
      for (const personFood of food.person) {
        if (person.name === personFood.name) {
          person.price += food.price / food.person.length;
        }
      }
    }
    person.price = Math.ceil(person.price);
  }
  return "";
});
const avgFood = (index) => {
  console.log(index);
  return foodLists.value[index].person.length === 0 ? 0 : Math.ceil(foodLists.value[index].price / foodLists.value[index].person.length) ;
};
</script>

<template>
  <div class="w-screen h-screen">
    <div class="absolute w-full h-full bg-bgPage">
      <h1 class="flex justify-center pt-10 text-3xl font-semibold text-brownFont drop-shadow">
        NO CSS
      </h1>

      <!-- Switch btn page -->
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
                  <div v-for="(person, index) in foodLists[index].person" key="index">
                    <span :class="['color-' + (index % 4)]" class="px-1 ml-1 text-base">{{ person.name }}</span>
                  </div>
                </div>

              </td>
              <td class="pr-4 text-2xl text-center">{{ food.price }}</td>
              <td class="pr-4 text-2xl text-center">
                {{ avgFood(index) }}
              </td>
              <td>
                <img :id="index" alt="iconEdit" class="w-5 h-5 mr-3" src="./assets/more-vertical.svg"
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

      <div v-if="!sw" class="w-5/6 m-auto mt-10 overflow-y-scroll rounded-3xl bg-bgBox sm:w-1/2 h-1/2">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="table-cell text-2xl text-left sm:hidden pl-9">Name</th>
              <th class="hidden text-2xl text-left pl-9 sm:table-cell">Name</th>
              <th class="text-2xl">Prices</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in persons" key="index" :class="person.status ? 'bg-checkboxGreen' : 'bg-bgBox'" @click="person.status = !person.status" ref="person.status">
              <td class="pl-16 text-2xl text-left">
                <div class="mt-2">
                  <input v-model="person.status" type="checkbox" />
                  <label class="= text-2xl"></label>
                  {{ person.name }}
                </div>
              </td>
              {{ personPrices }}
              <td class="text-2xl text-center">{{ person.price }}</td>
              <td> <img alt="" :id="index" class="w-5 h-10" src="./assets/x.svg" @click="deletePerson($event)" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!sw" class="flex items-center justify-center w-2/12 h-12 m-auto mt-5 rounded-full bg-btn1"
        @click="deleteAll">
        <button class="text-xl text-center text-white">Delete All</button>
      </div>
      <div class="fixed bottom-0 w-full h-20 bg-bgFooter">
        <div class="flex">
          <p class="w-1/2 text-2xl text-center pt-7">
            Total:{{ totalFoodLists }}
          </p>
          <p class="w-1/2 text-2xl text-center pt-7">
            Person: {{ persons.length }}
          </p>
        </div>
      </div>

    </div>

    <!-- Model -->
    <div v-show="showMenuStatus" class="fixed w-full h-full">
      <!-- <div class="absolute inset-0 bg-zinc-500/50 " @click="showMenu()"> -->
      <div class="flex items-center justify-center h-screen bg-[#FFF7F0] bg-opacity-70">
        <div class="lg"></div>
        <div class="flex flex-col w-[776px] h-[448px] bg-bgPage rounded-[40px]">

          <div class="flex w-full h-[44px] justify-end">
            <img alt="" class="w-10 h-10 mt-4 mr-4" src="./assets/x.svg" @click="showMenu()" />
          </div>

          <div class="lg:flex lg:max-w-3xl -">
            <div class="flex pl-14 pr-7">
              <div class="flex flex-col items-center rounded-full bg-bgList1 w-[304px] h-[304px]">
                <div class="flex justify-center items-center h-[168px] w-[296px] rounded-t-full bg-bgList1">
                  <input class="h-[48px] w-[200px] text-center mt-12 text-[48px] bg-bgList1 text-brownFont" type="number"
                    v-model="price" />
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
              <input v-model="foodName"
                class="mt-2 bg-bgbtn w-[304px] h-[48px] rounded-[20px] pl-4 text-[24px] text-brownFont"
                placeholder="Your Food" type="text" />
              <div class="flex mt-2 text-2xl text-brownFont">Add Payer</div>
              <div class="flex mt-2">
                <img alt="iconEdit" class="h-7" src="./assets/PersonCount.svg" /><span
                  class="pl-2 pr-3 text-xl bg-bgbtn rounded-tr-xl rounded-br-xl">{{ personFood.length }}</span>
              </div>
              <div
                :class="personFood.length !== 0 ? 'flex mt-2 bg-bgbtn w-[280px] h-[92px] rounded-2xl' : 'flex mt-2 bg-bgbtn w-[280px] h-[92px] rounded-2xl justify-center items-center'">

                <div
                  class="flex flex-wrap w-24 h-20 overflow-y-scroll sm:overflow-hidden sm:flex-wrap sm:w-full sm:overflow-y-scroll">
                  <div v-for="(person, index) in persons" key="index" class="mt-1 ml-1">
                    <button :class="checkPerson(person.name) ? 'bg-btn1' : 'bg-bgPage'" class="px-2 text-base rounded-xl "
                      @click="chooseToggle(person.name)">{{
                        person.name
                      }}</button>
                  </div>
                </div>
              </div>

              <div class="flex flex-row mt-4">
                <input class="h-8 w-[224px] pl-4 text-xl bg-bgbtn rounded-xl text-brownFont"
                  placeholder="Please add name..." type="text" v-model="namePerson" />
                <button @click="addPerson"><img alt="" class="h-8 ml-3" src="./assets/addPersonBtn.svg" /></button>
              </div>
              <strong class="text-red-600" v-show="alertName"> User already exists</strong>

              <div class="flex flex-row mt-1">
                <button class="h-[56px] w-[106px] bg-btn1 rounded-3xl text-white text-xl" @click="doneBtn">
                  Done
                </button>
                <button class="ml-5 text-xl underline text-btn1" @click="deleteBtn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1,
p,
tr,
th,
td,
button,
div {
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

.square {
  width: 100%;
  height: 0;
  padding-top: 100%;
}
</style>
