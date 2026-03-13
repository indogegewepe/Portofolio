import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

  return {
    provide: {
      gsap
    }
  }
})