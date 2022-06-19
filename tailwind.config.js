module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        "1s": "6px",
        "2s": "10px",
        "50px": "50px",
        17: "68px",
        30: "120px",
        47: "188px",
        65: "260px",
        72: "288px",
        90: "360px",
        "50p": "50%",
      },
      colors: {
        transparent: "transparent",
        gray: {
          main: "#E5E5E5",
          menu: "#FAFAFA",
          font1: "#595959",
          font2: "#454545",
        },
        primary: "#178FAC",
        secondary: "#288FAC",
        blue: {
          menu: "#EFF5F8",
        },
        decorate1: "#E7F0F5",
        decorate2: "#FFA81D",
        decorate3: "#F0F0F0",
        decorate4: "#EB6767",
        decorate5: "#E34A4A",
      },
      boxShadow: {
        md: "0px 6px 10px rgba(0, 0, 0, 0.05)",
        sm: "0px 5px 15px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        pingfang: "PingFang TC",
        sanstc: "Noto Sans TC",
      },
      width: {
        "100px": "100px",
      },
      height: {
        "2s": "10px",
        "4s": "18px",
      },
      borderRadius: {
        "7px": "7px",
        "10px": "10px",
        "4xl": "3rem",
      },
      borderWidth: {
        3: "3px",
      },
      maxWidth: {
        md: "450px",
      },
      maxHeight: {
        "95p": "95%",
      },
      rotate: {
        60: "60deg",
        120: "120deg",
      },
      fontSize: {
        xls: "22px",
        "3xls": "2rem",
      },
      scale: {
        135: "1.35",
      },
      aspectRatio: {
        183: "1.83",
      },
      backgroundSize: {
        "100auto": "100% auto",
      },
    },
  },
  separator: "_",
  colors: {
    gray: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      300: "#D9D9D9",
      400: "#BFBFBF",
      500: "#8C8C8C",
      600: "#595959",
      700: "#434343",
    },
  },
};
