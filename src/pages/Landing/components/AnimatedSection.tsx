import Passport from "../../../assets/Passport.jpg";
import Hiker from "../../../assets/Hiker.jpg";
import { motion } from "framer-motion";
const imageVariants = {
  offscreen: {
    x: -100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
const articleVariants = {
  offscreen: {
    x: 100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
function AnimatedSection() {
  return (
    <section className="w-full min-h-[800px]">
      <div className="container mx-auto h-full py-9 px-5">
        <div className="flex justify-center flex-col gap-[100px] items-center lg:flex-row">
          <motion.div
            variants={imageVariants}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.6 }}
            className="relative w-1/2 max-w-[600px]  h-[600px]"
          >
            <img
              src={Passport}
              alt="passport"
              className="rounded-lg absolute w-[460px] rotate-12 border-[10px] right-0 "
            />
            <img
              src={Hiker}
              alt="hiker"
              className="rounded-lg bottom-0 left-0 border-[10px] w-[330px] right-0 -rotate-12	 border-white absolute "
            />
          </motion.div>
          <motion.div
            variants={articleVariants}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: 0.6 }}
            className="flex flex-col gap-4 max-w-[530px] text-center lg:text-start w-1/2 justify-center items-center dark:text-white"
          >
            <h1 className="w-full font-bold text-[40px]">
              We Make Your Travel More Enjoyable
            </h1>
            <p>
              Embrace a worry-free travel experience with us as we strive to
              make your journey more enjoyable. From seamless itineraries to
              handpicked accommodations, we take care of every detail, leaving
              you free to savor every moment and create unforgettable memories.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AnimatedSection;
