import { SlideNav } from "./slideNav.js";

const slideNav = new SlideNav({
  slide: ".slide",
  wrapper: ".wrapper",
})

slideNav.addArrow(".prev", ".next");
slideNav.addControl('.custom-controls')