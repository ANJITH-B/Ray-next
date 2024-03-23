/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        login: 'url("/src/Assets/CommonImages/signin_cover.png")',
        "home-one": 'url("/src/Assets/CommonImages/homepage_bg_one.svg")',
        "home-two": 'url("/src/Assets/CommonImages/homepage_bg_two.svg")',
      },
      colors: {
        // dashboard colors
        "light-gray": "#F4F4F4",
        gray: "#B0B0B0",
        blue: "#4A9CE8",
        'border-gray':'#E0E0E0',
        "dark-blue": "#306FCE",
        "dark-color": "#121212",
        "sub-text-color": "#616161",
        "error-color": "#F42F2F",
        "sales-color": "#D4F6AD",
        "purchase-color": "#E3DBFA",
        "payment-color": "#FBE2F4",
        "reciept-color": "#C7F1FF",
        "account-color": "#FFF3D6",
        "report-color": "#C8F5E5",
        "cash-balance-color": "#BFE4FF",
        "bank-balance-color": "#FFEBA6",
        "cheque-color": "#E5AEFF",
        "overdue-color": "#BBFFB5",
        "balance-color": "#FFCCCC",
        "dark-blue": "#306FCE",
        "dark-green": "#30CE66",
        green: "#20744A",
        warning: "#DA9510",
        purple: "#7E27D4",
        "aqua-blue": "#128BB1",
        white: "#FFFFFF",
      },

      screens: {
        
      },
      fontSize: {},
    },
  },
  plugins: [],
};
