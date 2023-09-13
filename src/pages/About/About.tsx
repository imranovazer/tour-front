import ComplanySlider from "./components/CompanySlider";
import { intro } from "./data/data";
import ManBag from "./data/ManBag.png";
const About = () => {
  return (
    <div className="w-full">
      <nav className="w-full h-[100px]"></nav>
      <header className="w-full h-[380px] bg-[url(/src/assets/AboutUs.jpg)] bg-center flex justify-center items-center bg-cover bg-no-repeat bg-fixed">
        <h1 className="text-[48px] text-white font-medium">About Us</h1>
      </header>
      <section className="overflow-hidden">
        <div className="container mx-auto  flex flex-col items-center md:flex-row  sm:justify-around py-11">
          <div className="flex flex-col gap-6 p-5 dark:text-white max-w-[500px]">
            <h3 className="text-[24px] md:text-[40px]  font-bold">
              Your Trusted Travel Partner
            </h3>
            <p>
              At our travel website, our speciality lies in curating
              unforgettable experiences that cater to the unique preferences of
              each traveler. From family vacations to solo adventures, romantic
              getaways to group escapades, we take pride in offering a diverse
              range of handpicked destinations and carefully crafted
              itineraries. <br />
              <br />
              Our team of travel experts is dedicated to staying ahead of the
              curve, ensuring that we bring you the latest travel trends and
              hidden gems to explore. Whether it's seeking out
              off-the-beaten-path activities or securing exclusive deals with
              our trusted partners, our commitment to excellence ensures that
              every trip planned through our platform is a journey of a
              lifetime.
              <br />
              <br /> Our 24/7 customer service team is always at your disposal,
              ready to address any queries or assist with last-minute changes.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img src={ManBag} className="w-full max-w-[500px]" alt="" />
          </div>
        </div>
      </section>
      <section className="w-full bg-[#f2f4f7] dark:bg-blue-700">
        <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2  lg:grid-cols-3 py-[100px] px-[100px]">
          {intro.map((item, index) => (
            <div
              key={index}
              className="flex dark:text-white text-gray-500 flex-col items-center md:items-start gap-3 text-center  md:text-start"
            >
              <img src={item.img} className="w-100px" alt="" />
              <h4 className="font-bold text-[24px]">{item.title}</h4>

              <p className="max-w-[390px] ">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="container mx-auto flex justify-center py-10">
        <h2 className="dark:text-white text-[30px] sm:text-[42px] text-center font-bold  ">
          Our Valuable Partners
        </h2>
      </div>
      <ComplanySlider />
    </div>
  );
};

export default About;
