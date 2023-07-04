import React, { useState } from "react";
import { AiOutlineUser, AiOutlineUnorderedList, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/reducer/authSlice";
import { ImSearch } from 'react-icons/im';
import { GrClose } from 'react-icons/gr'

export default function NavBar() {
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
      <div className="bg-babypowder w-screen h-8 flex content-center">
        <div className="basis-1/2 px-5 font-lora">
          <Link to="/">
            <span className="font-lora font-semibold text-lg text-darkgreen">
              verdant market
            </span>
          </Link>
        </div>
        <div className="basis-1/2 text-right flex justify-end px-5">
          <Link to="/mycart" className="p-1">
            <AiOutlineShoppingCart size={20} />
          </Link>
          <span className="hover:font-semibold px-4 pt-">
            {token ? (
              <div className="relative p-1">
                <button onClick={handleProfileMenuToggle}>
                  <AiOutlineUser size={20} />
                </button>
                {isProfileMenuOpen && (
                  <ul className="absolute right-0 bg-white text-black shadow-lg">
                    <li className="flex y-0 items-center p-2 border-b border-gray-600 bg-babypowder hover:text-redd">
                      <AiOutlineUnorderedList size={20} className="mr-2" />
                      <Link to="/myprofile">Dashboard</Link>
                    </li>
                    <li className="flex items-center p-2 border-b border-gray-600 bg-babypowder hover:text-redd">
                      <AiOutlineLogout size={20} className="mr-2" />
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xs font-josefin">Log In</Link>
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
            <p>search by product's name</p>
            <p>sort by category</p>
            <p>sort by alphabets</p>
            <p>sort by date</p>
            <p>sort by price</p>
          </div>
        )}
      </div>
    </div>
  );
}

