interface Navigations {
  name: string;
  link: string;
}

const navigations: Navigations[] = [
  // {
  //   name: "Pricing",
  //   link: "/pricing",
  // },
  {
    name: "Log In",
    link: "/auth/signin",
  },
  {
    name: "Sign Up",
    link: "/auth/signup",
  },
];

interface MobileAuthNav extends Navigations {
  className: string;
}

const mobileAuthNavLinks: MobileAuthNav[] = [
  {
    name: "Log In",
    link: "/auth/signin",
    className:
      "bg-white shadow-2xl text-primary px-4 py-3 rounded-2xl mt-auto text-center font-semibold border-[1px] border-gray-200",
  },
  {
    name: "Sign Up",
    link: "/auth/signup",
    className:
      "bg-primary text-white px-4 py-3 rounded-2xl mt-auto text-center font-semibold",
  },
];

export { navigations, mobileAuthNavLinks };
