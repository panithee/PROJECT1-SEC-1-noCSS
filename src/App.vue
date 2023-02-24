<script setup>
import { computed, ref } from "vue";

let persons = ref([]);
let foodLists = ref([]);

// switch page
const sw = ref(true);
const switchMenu = (e) => {
  if (e === "list") {
    sw.value = true;
  }
  else if (e === "person") {
    sw.value = false;
  }
};

// List food
let price = ref(0);
let foodName = ref("");
let personFood = ref([]);
let modeTarget = ref("");
let target = ref(null);
const namePerson = ref("");
const alertName = ref(false);
const error = ref("User already exists");
const avgFood = (index) => {
  console.log(index);
  console.log(typeof (index));
  if (index === undefined || index === null) {
    return 0;
  }
  if (foodLists.value[index].person.length === 0) {
    return 0;
  }
  return Math.ceil(foodLists.value[index].price / foodLists.value[index].person.length);
};
const clearFoodList = () => {
  foodLists.value = [];
  return foodLists;
};
const totalFoodLists = computed(() => foodLists.value.reduce((total, food) => total + food.price, 0));

// show model
const showModelStatus = ref(false);
const showModel = () => {
  console.log("showModel");
  alertName.value = false;
  showModelStatus.value = !showModelStatus.value;
};
const eventFoodList = (e, mode) => {

  if (mode === "add") {
    target.value = null;
    modeTarget.value = "add";
    price.value = 0;
    foodName.value = "";
    personFood.value = [];
  }
  if (mode === "edit") {
    target.value = e.target.id;
    modeTarget.value = "edit";
    const food = foodLists.value[target.value];
    price.value = food.price;
    foodName.value = food.name;
    personFood.value = food.person;
  } else {
    console.log("Error");
  }
  showModel();
};

const doneBtn = () => {
  if (foodName.value === "" || price.value == " ") {
    console.log("Error");
    error.value = "entered incorrect information"
    if (!alertName.value) {
    
      alertName.value = true;
    }
  }
  else {
    if (modeTarget.value === "add") {
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
    modeTarget.value = "";
    target.value = null;
    showModel();
  }
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

const avgFoodModel = computed(
  () => {
    return personFood.value.length === 0 ? 0 : Math.ceil(price.value / personFood.value.length)
  }
)
const deleteBtn = () => {
  if (target.value !== null) {
    foodLists.value.splice(parseInt(target.value), 1)
  }
  showModel();
}

const addPerson = () => {

  if (namePerson.value !== "" && !(persons.value.find((person) => person.name.toLowerCase() === namePerson.value.toLowerCase()))) {
    alertName.value = false;
    persons.value.push({ name: namePerson.value, price: 0, status: false });
    namePerson.value = "";
  } else {
    error.value = "User already exists"
    alertName.value = true;
  }
};

// person
const personPrices = computed(() => {
  for (const person of persons.value) {
    person.price = 0
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
const deletePerson = (event) => {
  for (const food of foodLists.value) {
    food.person = food.person.filter((person) => person.name !== persons.value[event.target.id].name);
  }
  persons.value.splice(event.target.id, 1);
};
const deleteAll = () => {
  persons.value = [];
  return persons;
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

      <!--      food list page-->
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
      <!--person-->
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
            <tr v-for="(person, index) in persons" key="index" :class="person.status ? 'bg-checkboxGreen' : 'bg-bgBox'">
              <td class="pl-16 text-2xl text-left">
                <div class="mt-2">
                  <input v-model="person.status" type="checkbox" />
                  <label class="= text-2xl"></label>
                  {{ person.name }}
                </div>
              </td>
              {{ personPrices }}
              <td class="text-2xl text-center">{{ person.price }}</td>
              <td><img :id="index" alt="" class="w-5 h-10" src="./assets/x.svg" @click="deletePerson($event)" /></td>
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
    <div v-show="showModelStatus" class="fixed w-full h-full">
      <div class="flex items-center justify-center h-screen bg-[#FFF7F0] bg-opacity-70">
        <div class="lg"></div>
        <div
          class="flex flex-col w-[330px] h-[460px] rounded-[16px] sm:w-[600px] sm:h-[412px] md:w-[728px] md:h-[416px] bg-bgPage sm:rounded-[32px]">

          <div class="flex justify-end w-full h-10">
            <img alt="" class="w-8 h-8 mt-3 mr-3 sm:w-10 sm:h-10 sm:mt-4 sm:mr-4" src="./assets/x.svg"
              @click="showModel()" />
          </div>

          <div class="flex flex-col justify-center sm:ml-6 sm:flex-row sm:space-x-6 md:space-x-10">
            <div class="flex justify-center">
              <div
                class="flex flex-col items-center w-[220px] h-[100px] rounded-xl sm:rounded-full bg-bgList1 sm:w-[264px] sm:h-[264px] md:w-[304px] md:h-[304px]">
                <div class="flex items-center justify-center w-3/4 rounded-t-full h-1/2 bg-bgList1">
                  <input v-model="price"
                    class=" w-full text-center mt-2 text-4xl sm:mt-20 sm:text-[48px] bg-bgList1 text-brownFont"
                    type="number" />
                </div>
                <div class="w-[180px] mt-1 sm:mt-4 sm:w-[240px] border-b border-brownFont"></div>
                <div class="mt-1 text-3xl sm:text-4xl sm:mt-7 text-brownFont">{{ avgFoodModel }}</div>
                <div class="hidden sm:inline-block sm:mt-4 md:mt-8">AVG price</div>
              </div>
            </div>

            <div class="mt-1 ml-4">
              <div class="text-xl sm:text-2xl first-letter:flex text-brownFont">
                Your Food
              </div>
              <input v-model="foodName"
                class="h-[24px] text-base rounded-[8px] sm:mt-1 bg-bgbtn sm:w-11/12 md:w-[304px] md:h-[40px] sm:rounded-2xl pl-4 sm:text-2xl text-brownFont"
                placeholder="Your Food" type="text" />
              <div class="flex mt-2 text-xl sm:text-2xl text-brownFont">Add Payer</div>
              <div class="flex mt-1">
                <img alt="iconEdit" class="sm:h-6 md:h-7" src="./assets/PersonCount.svg" /><span
                  class="pl-2 pr-3 text-l bg-bgbtn rounded-tr-xl rounded-br-xl">{{ personFood.length }}</span>
              </div>
              <div
                class="flex flex-wrap w-11/12 h-20 pr-1 mt-1 overflow-y-scroll rounded-lg bg-bgbtn sm:overflow-hidden sm:flex-wrap sm:rounded-xl sm:overflow-y-scroll">
                <div v-for="(person, index) in persons" key="index" class="mt-2 ml-2">
                  <button :id=index :class="checkPerson(person.name) ? 'bg-btn1' : 'bg-bgPage'"
                    class="px-2 text-base rounded-xl " @click="chooseToggle(person.name)">{{
                      person.name
                    }}
                  </button>
                </div>
              </div>
              <div class="flex flex-row mt-2 sm:w-11/12">
                <input v-model="namePerson"
                  class="h-6 sm:h-8 w-4/5 pl-4 text-base rounded-[8px] sm:text-xl bg-bgbtn sm:rounded-xl text-brownFont"
                  placeholder="Please add name..." type="text" />
                <button @click="addPerson"><img alt="" class="h-6 ml-3 sm:h-8" src="./assets/addPersonBtn.svg" />
                </button>
              </div>
              <strong v-show="alertName" class="absolute text-red-600"> {{ error }}</strong>

              <div class="flex flex-row mt-6">
                <button
                  class="h-8 sm:h-14 w-12  text-base rounded-md sm:w-[106px] bg-btn1 sm:rounded-3xl text-white sm:text-xl"
                  @click="doneBtn">
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
</style>
