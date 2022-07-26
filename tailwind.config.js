/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container:{
        center:true,
     
      }
    },
  },
  plugins: [function ({ addComponents }) {
  }],
}

// addComponents({
//   '.container': {
//     maxWidth: '100%',
//     '@screen sm': {
//       maxWidth: '500px',
//     },
//     '@screen md': {
//       maxWidth: '600px',
//     },
//     '@screen lg': {
//       maxWidth: '900px',
//     },
//     '@screen xl': {
//       maxWidth: '1100px',
//     },
//     '@screen 2xl': {
//       maxWidth: '1250px',
//     },
//   }
// })