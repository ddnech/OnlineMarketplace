import React, { useState } from "react";
import { AiOutlineUser, AiOutlineUnorderedList, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/reducer/authSlice";
import { ImSearch } from 'react-icons/im';
import { GrClose } from 'react-icons/gr'

export default function NavBar(props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(remove());
    navigate("/login");
  };

  return (
    <div>
      <div className="bg-babypowder w-screen h-8 flex justify-center">
        <div className="basis-2/5 mx-5 font-lora">
          <div className="grid mt-[0.2rem]">
            <Link to="/">
              <div className="font-lora font-semibold text-lg text-darkgreen">
                verdant market
              </div>
            </Link>
          </div>
        </div>
        <div className="basis-3/5 text-right flex justify-end px-5">
          {/* todo: if not yet login, can't see cart */}
          <Link to="/mycart" className="p-1">
            <AiOutlineShoppingCart size={20} />
          </Link>
          <span className="px-4">
            {token ? (
              <div className="relative p-1">
                <button onClick={handleProfileMenuToggle}>
                  <AiOutlineUser size={20} />
                </button>
                {isProfileMenuOpen && (
                  <ul className="absolute right-0 bg-white text-black shadow-lg font-ysa text-sm">
                    <li className="w-36 flex y-0 items-center py-2 px-4 border-b border-gray-600 bg-babypowder hover:text-darkgreen hover:font-semibold">
                      <AiOutlineUnorderedList size={18} className="mr-2" />
                      <Link to="/myprofile">Dashboard</Link>
                    </li>
                    <li className="w-36 flex items-center py-2 px-4 border-b border-gray-600 bg-babypowder hover:text-darkgreen hover:font-semibold">
                      <AiOutlineLogout size={18} className="mr-2" />
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xs font-lora hover:">Log In</Link>
            )}
          </span>
          <span className="p-2">
            {isSearchOpen ? (
              <GrClose className="text-xs cursor-pointer" onClick={toggleSearch} />
            ) : (
              <ImSearch className="text-xs cursor-pointer" onClick={toggleSearch} />
            )}
          </span>
        </div>
      </div>
      <div>
        {isSearchOpen && (
          <div className="bg-babypowder font-lora text-xs px-4 py-1">
            <div className="h-full flex flex-wrap items-center px-2 w-full gap-2 sm:flex-nowrap font-ysa text-sm">
              <input
                className=" font-sans bg-transparent p-2 w-full focus:outline-none sm:basis-3/8 md:basis-2/5"
                type="text"
                placeholder="Search"
                value={props.searchValue}
                onChange={props.onSearchChange}
              />
              <select
                className=" bg-gray-200 outline-none w-full sm:basis-2/8 md:basis-1/5"
                value={props.categoryValue}
                onChange={props.onCategoryChange}
              >
                <option value="" className="font-ysa text-sm">All Categories</option> {/* Set initial value to empty string */}
                {props.allCategory.map((category) => (
                  <option value={category.id} key={category.id} className="font-ysa text-sm">
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                className=" bg-gray-200 transparent outline-none w-full sm:basis-1/8 md:basis-1/5"
                value={props.alphabetValue === 'DESC' ? 'Z-A' : 'A-Z'}
                onChange={props.onAlphabetChange}
              >
                <option value="A-Z" className="font-ysa text-sm">Sort: A - Z</option>
                <option value="Z-A" className="font-ysa text-sm">Sort: Z - A</option>
              </select>
              <select
                className=" bg-gray-200 transparent outline-none w-full sm:basis-2/8 md:basis-1/5"
                value={props.priceValue === 'DESC' ? 'Low-High' : 'High-Low'}
                onChange={props.onPriceChange}
              >
                <option value="Low-High" className="font-ysa text-sm">Price: Low - High</option>
                <option value="High-Low" className="font-ysa text-sm">Price: High - Low</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

