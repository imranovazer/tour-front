import axiosInstance from "../../../axios";

const NavbarApi = {
  logout: async () => {
    const res = await axiosInstance.get("/users/logout");
    return res;
  },
};

export default NavbarApi;
