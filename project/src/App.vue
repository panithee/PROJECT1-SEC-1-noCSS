<script setup>
import { ref } from "vue";
const sw = ref(true);
const switchmenu = (e) => {
  if (e === "list") {
    sw.value = true;
  }
  if (e === "person") {
    sw.value = false;
  }
};
</script>

<template>
  <!-- <div class="w-full h-full">
   <div class="inline-flex flex-col items-center justify-end  bg-bgPage" style="width: 100%; height: 100%; padding-top: 72px;">
    <p class="w-96 h-16 text-6xl text-center  " style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">NO CSS </p>
    <div class="flex space-x-1 items-center justify-center p-1 bg-red-50 rounded-3xl m-10"  v-if="sw" style="width: 410px; height: 60px;">
        <div class="flex items-center justify-center w-1/2 h-full px-16 py-2 bg-btn1 rounded-full cursor-pointer" @click="swiitchmenu('list')">
            <p class="text-xl text-center  ">All List</p>
        </div>
        <div class="flex items-center justify-center w-1/2 h-full rounded-full cursor-pointer" @click="swiitchmenu('Person')" >
            <p class="text-xl text-center ">Per Person</p>
        </div>
    </div>
    <div class="flex space-x-1 items-center justify-center p-1 bg-red-50 rounded-3xl m-10"  v-else="sw" style="width: 410px; height: 60px;">
        <div class="flex items-center justify-center w-1/2 h-full px-16 py-2  rounded-full cursor-pointer" @click="swiitchmenu('list')">
            <p class="text-xl text-center  ">All List</p>
        </div>
        <div class="flex items-center justify-center w-1/2 h-full rounded-full bg-btn1 cursor-pointer" @click="swiitchmenu('Person')" >
            <p class="text-xl text-center ">Per Person</p>
        </div>
    </div>
    <div  class=" bg-red-50 rounded-[74px]" style="width: 1280px; height: 506px;" v-if="sw">
        <div class="flex justify-between " >
          
            <p class=" text-5xl  text-gray-700" style="margin: 16px 0 0 79px;">Your Food Lists</p>
        

          <div class="flex justify-between ">
            <p class=" text-5xl text-center text-gray-700 mr-[116px] mt-[16px]" style="">Prices</p>
            <p class=" text-5xl text-center text-gray-700 mr-[221px]  mt-[16px]" style="">Avg</p>
          </div>

        </div>

        <div class="inline-flex items-start justify-center pb-72 absolute" style="width: 1062px; height: 400px; left: auto; top: auto; margin-left: 109px; margin-top: 16px;">
            <div class="inline-flex space-x-60 items-center justify-end py-2 pl-8 pr-10 bg-white rounded-3xl" style="width: 1062px; height: 96px;">
                <div class="inline-flex flex-col  items-end justify-end w-36 h-full" style="margin: 0px; padding: 0">
                    <p class="text-3xl text-gray-700 pl-10 absolute" style="top: 8px; left: 0;">Sangsom</p>
                    <div class="inline-flex  items-center absolute  bg-white shadow rounded-full"  style=" height: 35px; width: 331px; left: 0; margin-left: 32px;">
                        <div class="flex items-center justify-center   bg-person1 rounded-full" style="margin: 5px;">
                            <p class="text-xl text-center " >Person 1</p>
                        </div>
                        <div class="flex items-center justify-center bg-person2 rounded-full" style="margin: 5px;">
                            <p class="text-xl text-center">Person 2</p>
                        </div>
                        <div class="flex items-center justify-center bg-green-50 rounded-full" style="margin: 5px;">
                            <p class="text-xl text-center">Person 3</p>
                        </div>
                        <div class="flex items-center justify-center bg-green-50 rounded-full">
                            <p class="text-xl text-center">Person 4</p>
                        </div>
                    </div>
                </div>
                <div class=" absolute flex justify-between "  style="width: 300px; margin-right: 120px; right: 0;">
                <p class="text-3xl text-center text-gray-700" >599</p>
                <p class="text-3xl text-center text-gray-700">150</p>
                </div>
                
                <div class="inline-flex flex-col space-y-0.5 items-center justify-end w-2 h-7">
                    <div class="w-full h-2 bg-gray-300 rounded-full"></div>
                    <div class="w-full h-2 bg-gray-300 rounded-full"></div>
                    <div class="w-full h-2 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div> 
        
    </div>
    <div  class=" bg-red-50 rounded-[74px]" style="width: 1280px; height: 506px;" v-else>
        
       
        
    </div>
    <div class="inline-flex items-center justify-center w-60 h-20 px-16 py-1.5 bg-btn1 rounded-full m-9">
        <p class="text-6xl text-center text-red-50">ADD</p>
    </div>
    <p class="text-3xl underline text-center text-btn1">Clear All</p>
    <div class="flex justify-between  py-11 px-96 bg-bgFooter mt-9" style="width: 100%; height: 144px;">
        <div>
          <p class="text-5xl text-center text-gray-700 flex justify-between">Total Price:599</p>
        </div>
        <div>
          <p class="text-5xl text-center text-gray-700 flex justify-between">Person:4</p>

        </div>
        
    </div>
    
</div>
</div> -->

  <div class="w-screen h-screen bg-bgPage">
    <div class="w-full h-full">
      <h1 class="flex justify-center pt-10 text-3xl text-brownFont font-semibold drop-shadow">
        NO CSS
      </h1>

      <div class="flex w-1/6 items-center bg-bgbtn rounded-full m-auto mt-10" v-if="sw">
        <div class="w-1/2 bg-btn1 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchmenu('list')">
          <p class="text-xl text-center text-white">All List</p>
        </div>
        <div class="w-1/2 rounded-full my-1 mr-1 cursor-pointer" @click="switchmenu('person')">
          <p class="text-xl text-center text-brownFont">Per Person</p>
        </div>
      </div>

      <div class="flex w-1/6 items-center bg-bgbtn rounded-full m-auto mt-10" v-else>
        <div class="w-1/2 rounded-full my-1 ml-1 mr-0.5 cursor-pointer" @click="switchmenu('list')">
          <p class="text-xl text-center text-brownFont">All List</p>
        </div>
        <div class="w-1/2 bg-btn1 rounded-full my-1 mr-1 cursor-pointer" @click="switchmenu('person')">
          <p class="text-xl text-center text-white">Per Person</p>
        </div>
      </div>

      <div class="m-auto mt-10 rounded-3xl bg-bgBox w-1/2 h-2/4" v-if="sw">
        <table class="w-full text-brownFont">
          <thead>
            <tr>
              <th class="flex pl-5 text-2xl">Your Food Lists</th>
              <th class="text-2xl pr-4">Prices</th>
              <th class="text-2xl pr-4">Avg</th>
            </tr>
          </thead>
        </table>
      </div>

      <div class="flex items-center justify-center m-auto mt-5 bg-btn1 w-1/12 h-12 rounded-full" v-if="sw">
        <p class="text-white text-center text-3xl">ADD</p>
      </div>

      <div class="flex justify-center m-auto mt-5 w-1/12" v-if="sw">
        <p class="text-btn1 text-center text-xl underline">Clear All</p>
      </div>

      <div class="w-full h-20 bg-bgFooter fixed bottom-0 ">
        <div class="flex justify-center">
          <p class="text-4xl pl-40 pt-7 text-center">Total:</p>
          <p class="text-4xl pt-7 text-center">Person:</p>
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
