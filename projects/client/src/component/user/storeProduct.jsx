import React from "react";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

export default function StoreProduct() {
    const token = useSelector((state) => state.auth.token)

    // handle accordian
    const [activeTab, setActiveTab] = useState('top');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleImageError = (event) => {
        event.target.src =
            'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
    };


    // handle search
    const [searchValue, setSearchValue] = useState('');
    const [sortAlphabet, setSortAlphabet] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const formatCategoryId = event.target.value === 'All' ? '' : event.target.value;

        setSelectCategory(formatCategoryId)
    };

    const handleSortOrderAlphabet = (event) => {
        const sortOrder = event.target.value === 'A-Z' ? 'DESC' : 'ASC';
        setSortAlphabet(sortOrder)
    };

    const handleSortOrderPrice = (event) => {
        const sortOrder = event.target.value === 'Low-High' ? 'DESC' : 'ASC';
        setSortPrice(sortOrder)
    };

    useEffect(() => {
        if (token) {
            const userCategories = axios.get("http://localhost:8000/api/user/category", { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setCategories(response.data.data)
                }).catch(error => {
                    console.log(error.message)
                })
        }
    }, [token])

    // handle blog
    const location = useLocation();
    const [allproduct, setAllProduct] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let page = params.get('page');
        if (!page) page = 1;

        if (token) {
            const data = axios.get(`http://localhost:8000/api/user/product?page=${page}&search=${searchValue}&category=${selectCategory}&sortAlphabet=${sortAlphabet}&sortPrice${sortPrice}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    console.log(response.data)
                    if (response.data.data) {
                        setAllProduct(response.data.data)
                    } else {
                        setAllProduct([])
                    }
                }).catch(error => {
                    console.log(error.message)
                })
        }
    }, [token, searchValue, selectCategory, sortAlphabet, sortPrice])


    useEffect(() => {
        console.log(token);
        const products = axios.get("http://localhost:8000/api/user/product", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                setAllProduct(response.data.data);
            })
            .catch((err) => console.log(err));
    }, [token])


    return (
        <>
            <div>
                <button
                    type="button"
                    className={`h-10 flex items-center justify-between w-full font-ysa tracking-wide py-5 text-left ${activeTab === "top"
                        ? "text-darkgreen dark:text-darkgreen border-b border-darkgreen dark:border-darkgreen"
                        : "text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        }`}
                    onClick={() => handleTabClick("top")}
                >
                    <span>Top Selling</span>
                    <svg
                        className={`w-6 h-6 ${activeTab === "create" ? "rotate-180" : ""}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                {activeTab === "top" && (
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            {/* tab for choosing category and card item */}
                        </div>
                    </div>
                )}
                <button
                    type="button"
                    className={`h-10 flex items-center justify-between w-full font-ysa tracking-wide py-5 font-medium text-left ${activeTab === "product"
                        ? "text-darkgreen dark:text-darkgreen border-b border-darkgreen dark:border-darkgreen"
                        : "text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        }`}
                    onClick={() => handleTabClick("product")}
                >
                    <span>My Product</span>
                    <svg
                        className={`w-6 h-6 ${activeTab === "product" ? "rotate-180" : ""}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                {activeTab === "product" && (
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            {/* search  */}
                            <div className="h-full flex flex-wrap items-center px-2 w-full gap-2 sm:flex-nowrap font-ysa text-sm">
                                <input
                                    className=" font-sans bg-transparent p-2 w-full focus:outline-none sm:basis-3/8 md:basis-2/5"
                                    type="text"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                                <select
                                    className=" bg-gray-200 outline-none w-full sm:basis-2/8 md:basis-1/5"
                                    value={selectCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" className="font-ysa text-sm">All Categories</option> {/* Set initial value to empty string */}
                                    {categories.map((category) => (
                                        <option value={category.id} key={category.id} className="font-ysa text-sm">
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className=" bg-gray-200 transparent outline-none w-full sm:basis-1/8 md:basis-1/5"
                                    value={sortAlphabet === 'DESC' ? 'A-Z' : 'Z-A'}
                                    onChange={handleSortOrderAlphabet}
                                >
                                    <option value="A-Z" className="font-ysa text-sm">Sort: A - Z</option>
                                    <option value="Z-A" className="font-ysa text-sm">Sort: Z - A</option>
                                </select>
                                <select
                                    className=" bg-gray-200 transparent outline-none w-full sm:basis-2/8 md:basis-1/5"
                                    value={sortPrice === 'DESC' ? 'Low-High' : 'High-Low'}
                                    onChange={handleSortOrderPrice}
                                >
                                    <option value="Low-High" className="font-ysa text-sm">Price: Low - High</option>
                                    <option value="High-Low" className="font-ysa text-sm">Price: High - Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 mx-2">
                            {/* blog */}
                            {allproduct.length === 0 ? (
                                <div className="w-full h-full font-josefin text-xl text-center mx-auto my-5">
                                    No Product Listed Yet
                                </div>
                            ) : (
                                <>
                                    {allproduct.map((allproduct) => (
                                        <div className={`${allproduct.isActive ? "bg-white w-full h-full flex flex-col text-jetblack p-2 sm:w-80 flex-1" : " bg-gray-400 w-full h-full flex flex-col text-jetblack p-2 sm:w-80 flex-1 opacity-20"
                                            }`}>
                                            <div className="w-full">
                                                <img
                                                    className="w-20 h-20 justify-center mx-auto m-2 object-cover"
                                                    src={`http://localhost:8000${allproduct.imgProduct}`}
                                                    onError={handleImageError}
                                                    alt="/"
                                                />
                                            </div>
                                            <div className="flex flex-col text-center gap-2 mt-2">
                                                <div className="flex-1 font-lora text-base overflow-auto">
                                                    {allproduct.name}
                                                </div>
                                                <div className="font-josefin overflow-auto">
                                                    {allproduct.isActive ? "active" : "inactive"}
                                                </div>
                                                <div className="font-josefin overflow-auto">
                                                    {allproduct.category.name}
                                                </div>
                                                <div className="font-lora mx-auto mt-3 h-full grow-0 w-44">
                                                    <table className="mx-auto">
                                                        <tbody>
                                                            <tr>
                                                                <td className="border-r-2 border-gray-200 px-4 overflow-auto">{allproduct.price}</td>
                                                                <td className="px-4 overflow-auto">{allproduct.stock}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <Link to="/">
                                                    <button
                                                        className='w-full py-2 mt-4 text-xs font-josefin tracking-wide border bg-darkgreen text-flashwhite hover:bg-white hover:text-darkgreen hover:border-darkgreen'
                                                    >
                                                        Edit Product
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}