import  { useState, useEffect } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch, FaBell } from "react-icons/fa";
import Search from "../ui/Search";
import Logo from "../ui/Logo";
import { Sling as Hamburger } from "hamburger-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);

  const cart = useSelector((state) => state.cart);

  const handleMenuClick = () => {
    setIsMenuModal((prevState) => !prevState);
  };

   const handleMenuClose = () => {
    setIsMenuModal(false);
  };
  useEffect(() => {
    if (isMenuModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuModal]);
  
  const router = useRouter();


  
  return (
    <div
      className={`h-[5.5rem] z-50 relative ${
        router.asPath === "/" ? "bg-transparent" : "bg-secondary"
      }`}
    >
      {/* ------------Cotainer div START------------*/}
      <div
        className="container mx-auto justify-between flex
         text-white items-center h-full "
      >
        {/* ------------logo Start------------*/}
        <div>
          <Logo />
        </div>
        {/* ------------logo Start------------*/}

        {/* ------------Nav start------------*/}
        {isMenuModal && (
          <nav
            className={` navmobile1 md:hidden sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent  sm:flex hidden   ${
              isMenuModal === true && "!grid place-content-center"
            }`}
          >
            <ul className=" flex gap-x-2 sm:flex-row flex-col items-center">
              <li className="px-[8px]  py-[10px] uppercase hover:text-primary cursor-pointer transition-all ">
                <Link href="/">Home</Link>
              </li>
              <li className="px-[8px]  py-[10px] uppercase hover:text-primary cursor-pointer transition-all ">
                <Link href="/menu">Menu</Link>
              </li>
              <li className="px-[8px]  py-[10px] uppercase hover:text-primary cursor-pointer transition-all ">
                <Link href="/about">About</Link>
              </li>
              
              <li className="px-[8px]  py-[10px] uppercase hover:text-primary cursor-pointer transition-all " onClick={handleMenuClose}>
              <Link href="/1">Extra</Link>
            </li>
            
            <li className="px-[8px]  py-[10px] uppercase hover:text-primary cursor-pointer transition-all ">
                <Link href="/reservation">Book Table</Link>
              </li>
            </ul>
          </nav>
        )}
        {/* Nav mobile */}
        <nav
          className={` sm:static absolute top-0  left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white bg-[rgba(0,0,0,0.85)] sm:bg-transparent  sm:flex hidden   ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className=" flex gap-x-2 sm:flex-row flex-col items-center">
          <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/" && "text-primary"
              }`}
            >
              <Link href="/">Home</Link>
            </li>

            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/menu" && "text-primary"
              }`}
            >
              <Link href="/menu">Menu</Link>
            </li>

           <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/about" && "text-primary"
              }`}
            >
              <Link href="/about">About</Link>
            </li>
           
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/reservation" && "text-primary"
              }`}
            >
              <Link href="/reservation">Book Table</Link>
            </li>
            
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/reservation" && "text-primary"
              }`}
            >
              <Link href="/reservation">Book Table</Link>
            </li>
          </ul>
        </nav>

        {/* ------------NAV END------------*/}

        {/*  ---------------------Sifarish giris sebet mesaj start --------------------- */}

        <div className="flex gap-x-4 items-center">
        <Link href="/auth/login">
            <span>
            <FaUserAlt
                className={`hover:text-primary transition-all cursor-pointer ${
                  (router.asPath.includes("profile") ||
                    router.asPath.includes("auth")) &&
                  "text-primary"
                }`}
                size={18}
              />

            </span>
          </Link>
          
          <Link href="/cart">
            <span className="relative">
               <FaShoppingCart
                className={`hover:text-primary transition-all cursor-pointer ${
                  router.asPath === "/cart" && "text-primary"
                }`}
                size={18}
              />

              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>

          <button
            onClick={() => setIsSearchModal(true)}
            href=""
            className="hover:text-primary transition-all  "
          >
            <FaSearch
              className="hover:text-primary transition-all cursor-pointer"
              size={18}
            />
          </button>

          <Link href="/">
            <span>
              <FaBell className={`hover:text-primary transition-all cursor-pointer ${
                  router.asPath === "/cart" && "text-primary"
                }`}
                size={18} />
            </span>
          </Link>

          <a href="" className="md:inline-block hidden sm:">
            <button className="btn-primary">Order Online</button>
          </a>
          <button className="sm:hidden inline-block cursor-pointer  hover:text-yellow-500 transition-all" onClick={handleMenuClick}>
            <Hamburger size={30} toggled={isMenuModal} />
          </button>
        </div>

        {/* ---------------------Sifarish giris sebet mesaj  End ---------------------*/}
      </div>
      {/* ------------Cotainer div END------------ */}

      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
