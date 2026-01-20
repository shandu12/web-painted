'use client';
import Link from "next/link";
import { useEffect, createRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import type { RootState } from "@/store";
import logo from "../../../../public/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from 'next-themes';
import { checkIsLogged } from "@/store";
import ShoppingCart from "@/components/shopping-cart";

const handleClick = (onClickOutside: Function, ref: any) => {
  return (event: MouseEvent) => {
    if (ref?.current && !ref.current.contains(event.target)) {
      onClickOutside();
    }
  };
}

const Header = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme()
  const navRef = createRef<HTMLElement>();
  const searchRef = createRef<HTMLButtonElement>();
  const cartRef = createRef<HTMLDivElement>();
  const isLogged = checkIsLogged(useSelector((state: RootState) => state.user));
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (navRef) {
      window.addEventListener("mousedown", handleClick(() => setMenuOpen(false), navRef));
    }
    if (searchRef) {
      window.addEventListener("mousedown", handleClick(() => setSearchOpen(false), searchRef));
    }
    if (cartRef) {
      window.addEventListener("mousedown", handleClick(() => setCartOpen(false), cartRef));
    }

    return () => {
      window.removeEventListener("mousedown", handleClick(() => setMenuOpen(false), navRef));
      window.removeEventListener("mousedown", handleClick(() => setSearchOpen(false), searchRef));
      window.removeEventListener("mousedown", handleClick(() => setCartOpen(false), cartRef));
    };
  }, [navRef, searchRef, cartRef]);

  useEffect(() => {
    if (menuOpen) {
      setSearchOpen(false);
      setCartOpen(false);
    } else if (searchOpen) {
      setMenuOpen(false);
      setCartOpen(false);
    } else if (cartOpen) {
      setMenuOpen(false);
      setSearchOpen(false);
    }
  }, [menuOpen, searchOpen, cartOpen]);

  return (
    <header className={`border-b p-2 w-full z-50 bg-background sticky top-0 `}>
      <div className="container flex flex-row justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" className="dark:invert-80 h-10 w-10" />
        </Link>
        <nav
          ref={navRef}
          className={`top-0 right-0 hidden w-[250px] bg-background border-l border-inset z-50 h-[100vh] mx-auto fixed flex-col items-start  ${menuOpen ? "!flex" : ""}
            lg:border-0 lg:relative lg:flex lg:flex-row lg:w-auto lg:h-auto lg:justify-between lg:max-w-3xl  
          `}
        >
          <Link href="/" className="px-4 lg:px-8 py-3 interactable" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="px-4 lg:px-8 py-3 interactable" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/about" className="px-4 lg:px-8 py-3 interactable" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href={ isClient ? isLogged ? "/profile" : "/profile/login" : "/profile/login"} className="px-4 lg:px-8 py-3 interactable" onClick={() => setMenuOpen(false)}>Profile</Link>
        </nav>
        <div className="flex">
          <button
            onClick={() => {
              setSearchOpen(false);
            }}
            className={!searchOpen ? "hidden" : "z-50 top-5 right-5 absolute lg:hidden"}
          >
            <CloseIcon className="interactable" />
          </button>
          <button
            onClick={() => { setSearchOpen(true); }}
            ref={searchRef}
            className={`${searchOpen ? "bg-background z-40 h-[100vh] w-[100vw] fixed top-0 right-0 flex items-center justify-center lg:h-auto lg:w-auto lg:relative lg:items-end" : ""}`}
          >
            <form
              className={!searchOpen ? "hidden" : "flex w-full justify-center lg:w-fit"}
            >
              <input
                type="text"
                name="search"
                placeholder="search..."
                className="border-b pb-1 w-full text-center mx-10 lg:mx-0 lg:absolute lg:right-9 lg:w-fit"
              />
              <SearchIcon className="!hidden lg:!block interactable mx-2"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                }}
              />
            </form>
            <div className={searchOpen ? "!hidden" : "px-2"}>
              <SearchIcon
                className="interactable"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                }}
              />
            </div>
          </button>
          <div ref={cartRef} className={"px-2 relative pt-0.5 " + `${cartOpen ? "bg-primary rounded-2xl lg:rounded-b-none" : ""}`} >
            <button id='cartButton' className="flex items-center interactable" onClick={() => { setCartOpen(!cartOpen) }}>
              <CartIcon className="" />
                {isClient && <span>{cartItems.length ? cartItems.length : ''}</span>}
            </button>
            {cartOpen && <div className="fixed top-14 max-h-[60vh] right-1/2 mr-[-160px] z-50 overflow-hidden bg-primary rounded-2xl transition-all lg:-right-0 lg:rounded-tr-none lg:m-0 lg:max-h-96 lg:absolute lg:top-6 lg:w-96">
              <ShoppingCart />
            </div>}
          </div>
          {
            theme === 'light' && isClient &&
            <button className="px-2 interactable" onClick={() => setTheme('dark')}>
              <DarkModeIcon />
            </button>
          }
          {
            !(theme === 'light') && isClient &&
            <button className="px-2 interactable" onClick={() => setTheme('light')}>
              <LightModeIcon/>
            </button>
          }
          <Link href={ isClient && isLogged ? "/profile" : "/profile/login"} className="hidden lg:block px-2">
            <button className="interactable">
              <AccountCircleIcon  />
            </button>
          </Link>
          <div className="lg:hidden px-2">
            <MenuIcon
              className="interactable"
              onClick={() => { setMenuOpen(true) }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export function openCart() {
  document.getElementById('cartButton')?.click();
}

export default Header;
