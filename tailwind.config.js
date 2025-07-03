/*
 * @Author: hanlirong
 * @Date: 2025-02-12 10:09:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-13 12:45:55
 * @Description: 请填写简介
 */
// tailwind.config.js
const { heroui } = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem", 
      },
    },
  },
  plugins: [
    heroui({
      layout: {
        fontSize: {
          tiny: "0.75rem", // 12px
          small: "0.875rem", // 14px
          medium: "1rem", // 16px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", // 16px
          small: "1.25rem", // 20px
          medium: "1.5rem", // 24px
          large: "1.75rem", // 28px
        },
        radius: {
          small: "0.25rem",
          medium: "0.5rem",
          large: "0.75rem",
        },
      },
    }),
  ],
};
