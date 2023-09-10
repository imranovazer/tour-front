import Passport from "../../../assets/Passport.jpg";
import Hiker from "../../../assets/Hiker.jpg";
import { motion } from "framer-motion";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import LandingPageImage from "../../../assets/LandingPage.png";
import { SweetMemory } from "../statics";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

function AnimatedSection() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const imageVariants = isDesktop
    ? {
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
      }
    : {
        offscreen: {
          opacity: 0,
        },
        onscreen: {
          x: 0,
          opacity: 1,
        },
      };
  const articleVariants = isDesktop
    ? {
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
      }
    : {
        offscreen: {
          opacity: 0,
        },
        onscreen: {
          opacity: 1,
          x: 0,
        },
      };
  return (
    <section
      className="w-full min-h-[800px] overflow-x-hidden"
      style={{
        backgroundColor: `linear-gradient(135deg, #cfeaef 0%, #a1c4e1 100%);`,
      }}
    >
      <div className="container mx-auto h-full py-9 px-5">
        <div className="flex justify-center flex-col gap-[100px] items-center lg:flex-row">
          <motion.div
            variants={imageVariants}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: isDesktop ? 0.6 : 0.1 }}
            className=" sm:w-1/2 max-w-[600px]  min-h-[600px]"
          >
            <div className="relative ">
              <img
                src={Passport}
                alt="passport"
                className="rounded-lg mb-5 sm:mb-0 sm:absolute w-[460px] sm:rotate-12 border-[10px]  "
              />
              <img
                src={Hiker}
                alt="hiker"
                className="rounded-lg sm:left-[-70px] sm:bottom-[-600px] border-[10px] w-[460px] sm:w-[330px]  sm:-rotate-12	 border-white sm:absolute "
              />
            </div>
          </motion.div>
          <motion.div
            variants={articleVariants}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: isDesktop ? 0.6 : 0.1 }}
            className="flex flex-col gap-4 max-w-[530px] text-center lg:text-start sm:w-1/2 justify-center items-center dark:text-white"
          >
            <h1 className="w-full font-bold md:text-[40px] text-[30px]">
              We Make Your Travel More Enjoyable
            </h1>
            <p>
              Embrace a worry-free travel experience with us as we strive to
              make your journey more enjoyable. From seamless itineraries to
              handpicked accommodations, we take care of every detail, leaving
              you free to savor every moment and create unforgettable memories.
            </p>
            <ul className="flex flex-col gap-4 text-start">
              <li className="flex items-center gap-3">
                <span className="text-[20px] text-blue-600">
                  <BsFillArrowRightCircleFill />
                </span>
                Personalized Itineraries: Tailored to your preferences and
                interests.
              </li>

              <li className="flex items-center gap-3">
                <span className="text-[20px] text-blue-600">
                  <BsFillArrowRightCircleFill />
                </span>
                Hand picked premium Accommodations that guarantee comfort and
                relaxation.
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[20px] text-blue-600">
                  <BsFillArrowRightCircleFill />
                </span>
                Dedicated 24/7 support team ready to assist you at any moment.
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="flex justify-center flex-col gap-[100px] items-center lg:flex-row py-11">
          <motion.div
            variants={imageVariants}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: isDesktop ? 0.6 : 0.1 }}
            className="flex flex-col gap-10 max-w-[600px] text-center lg:text-start justify-center items-center dark:text-white"
          >
            <h4 className="w-full font-bold text-[40px] ">
              We Let Your Sweet Memory Ever Unforgottable
            </h4>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:text-start">
              {SweetMemory.map((item, index) => (
                <li key={index} className="flex flex-col items-center gap-3">
                  <img src={item.icon} alt="memo" className="w-[60px]" />
                  <h3 className="font-bold text-[24px] ">{item.title}</h3>
                  <p className="">{item.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={articleVariants}
            initial={"offscreen"}
            whileInView={"onscreen"}
            viewport={{ once: false, amount: isDesktop ? 0.6 : 0.1 }}
            className="relative sm:w-1/2 max-w-[400px] flex items-center justify-center  h-[600px]"
          >
            <img src={LandingPageImage} alt="img" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AnimatedSection;
