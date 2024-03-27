"use client";
import React, { useEffect, useState } from "react";
import { fetchingAllProducts } from "../apiFecthing/apiFetching";
import { filteredProducts } from "../apiFecthing/apiFetching";
import { sortByPrice } from "../apiFecthing/apiFetching";
import Skeleton from "@mui/material/Skeleton";
import title from "../jsondata/title.json";
import { Key } from "@mui/icons-material";
function Productslist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchingAllProducts(
          "https://fakestoreapi.com/products"
        );
        setLoading(true);
        setProducts(response.data); // Set fetched products into state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const sortByCategory = async (category) => {
    if (category === "Sort By Title") {
      return window.location.reload();
    }
    const value = await filteredProducts(
      "https://fakestoreapi.com/products/category",
      category
    );
    setProducts(value.data);
  };
  const filteredByPrice = async (price) => {
    if (price === "Sort By Price") {
      return window.location.reload();
    }
    const value = await sortByPrice(
      "https://fakestoreapi.com/products?sort=",
      price
    );
    setProducts(value.data);
    console.log(value);
  };

  return (
    <section className=" h-full p-7 sm:h-full">
      <div className="mx-auto max-w-screen-xl px-20 py-8 sm:px-6 sm:py-12 lg:px-8 md:px-40">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
        </header>

        <div className="mt-8 flex items-center ">
          <div className="border-2 border-slate-500 rounded-lg mr-4">
            <label htmlFor="SortBy" className="sr-only ">
              title
            </label>

            <select
              id="SortBy"
              className="h-10 rounded border-gray-300 text-sm"
              onChange={(e) => {
                sortByCategory(e.target.value);
              }}
            >
              <option>Sort By Title</option>
              {title.map((title) => {
                return (
                  <option value={title.title} key={title.id}>
                    {title.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="border-2 border-slate-500 rounded-lg">
            <label htmlFor="SortBy" className="sr-only ">
              price
            </label>

            <select
              id="SortBy"
              className="h-10 rounded border-gray-300 text-sm"
              onChange={(e) => {
                filteredByPrice(e.target.value);
              }}
            >
              <option>Sort By Price</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-1 lg:grid-cols-4 h-full">
          {loading ? (
            <>
              {products.map((product) => {
                return (
                  <li
                    className="sm:h-[450px] border shadow-md shadow-stone-800 "
                    key={product.id}
                  >
                    <a
                      href={`/${product.id}`}
                      className="group block overflow-hidden"
                    >
                      <img
                        src={product?.image}
                        alt=""
                        className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[300px]"
                      />

                      <div className="relative bg-red-50 pt-3 h-[148px] px-4">
                        <h3 className="text-xs text-gray-700  group-hover:underline-offset-4">
                          {product.title}
                        </h3>

                        <p className="mt-2">
                          <span className="tracking-wider text-gray-900">
                            Rs.{product.price}
                          </span>
                        </p>
                        <p className="mt-2">
                          <span className="tracking-wider text-gray-900">
                            {product.category}
                          </span>
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </>
          ) : (
            <div className=" md:h-[506px] h-[548px] w-fit gap-10 md:flex justify-between ">
              <span className=" w-72">
                <Skeleton variant="rectangular" width={210} height={300} />
                <Skeleton width="100px" />
                <Skeleton width="30%" />
              </span>
              <span className=" w-72 hidden md:inline-block sm:hidden">
                <Skeleton variant="rectangular" width={210} height={300} />
                <Skeleton width="100px" />
                <Skeleton width="30%" />
              </span>
              <span className=" w-72 hidden md:inline-block sm:hidden">
                <Skeleton variant="rectangular" width={210} height={300} />
                <Skeleton width="100px" />
                <Skeleton width="30%" />
              </span>
              <span className=" w-72 hidden md:inline-block sm:hidden">
                <Skeleton variant="rectangular" width={210} height={300} />
                <Skeleton width="100px" />
                <Skeleton width="30%" />
              </span>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Productslist;
