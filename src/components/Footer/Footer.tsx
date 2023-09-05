import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTelegram,
} from "react-icons/bs";

function Footer() {
  return (
    <footer className="min-h-[200px] bg-slate-900">
      <div className="container p-10 mx-auto text-white flex flex-col lg:flex-row lg:justify-around gap-10 ">
        <div className="flex flex-col items-center text-center ">
          <h3 className="uppercase mb-5 font-bold">Useful links</h3>
          <ul>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
            <li>Shop</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="flex flex-col items-center text-center">
          <h3 className="uppercase mb-5 font-bold">Newsteller</h3>
          <div className="mb-6 w-full max-w-[400px] lg:w-[500px]">
            <input
              placeholder="Your email address"
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            />
          </div>
          <button className="w-200 uppercase border-2 py-2 px-4 rounded-3xl">
            subscribe now
          </button>
        </div>
        <div className="flex flex-col items-center text-center gap-5">
          <h3 className="uppercase mb-1 font-bold">Contact</h3>
          <p className="max-w-[180px]">
            123,XYZ Road, BSK 3 Bangalore, Karnataka,IN
          </p>
          <ul className="flex gap-4 text-[25px]">
            <li className="cursor-pointer">
              <BsFacebook />
            </li>
            <li className="cursor-pointer">
              <BsTelegram />
            </li>
            <li className="cursor-pointer">
              <BsInstagram />
            </li>
            <li className="cursor-pointer">
              <BsLinkedin />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
