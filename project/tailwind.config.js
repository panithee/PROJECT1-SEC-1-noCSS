/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        itim: "'Itim', cursive"
      },

      colors: {
        "brownFont": '#5D3739',
        "btnFont": '#F7D0BE',
        "bgPage": '#F7D0BE',
        "bgBox": '#FFF7F0',
        "bgList1": '#FFE8D3',
        "bgList2": '#ECFFE9 ',
        "bgFooter": '#FFE8D3',
        "btn1": '#DD743E',
        "checkList1": '#D9D9D9',
        "checkList2": '#3C6673',
        "checkList2": '#3C6673',
        "person1": '#EDFFE9',
        "person2": '#F7E9FF',
        "person3":' #FFE9EE',
        "person4":'#FFF9E9',
        "bgbtn" : '#FFEDE9',
        "checkboxGreen" : '#D6FBD0'
      }
    },
  },
  plugins: [],
}
