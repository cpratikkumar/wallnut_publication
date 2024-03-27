"use client";
import React, { useEffect, useState } from "react";
import { getSingleProduct } from "@/apiFecthing/apiFetching";
import Skeleton from "@mui/material/Skeleton";
function page({ params }) {
  const [singleProduct, setSingleProduct] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleProduct(
          "https://fakestoreapi.com/products",
          params.slug
        );
        setLoading(true);
        setSingleProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        {!loading ? (
          <span className=" w-screen h-screen flex items-center justify-center flex-col">
            <Skeleton variant="rectangular" width={310} height={400} />
            <Skeleton width="20%" />
            <Skeleton width="20%" />
          </span>
        ) : (
          <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
            <div className="relative z-10 lg:py-16">
              <div className="relative h-64 sm:h-80 lg:h-full">
                <img
                  alt=""
                  src={singleProduct?.image}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="relative flex items-center bg-gray-100">
              <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

              <div className="p-8 sm:p-16 lg:p-24 ">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Title :
                  <span className=" text-xl text-zinc-600 ml-4">
                    {singleProduct?.title}
                  </span>
                </h2>
                <br />
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Category :
                  <span className=" text-xl text-zinc-600 ml-4">
                    {singleProduct?.category}
                  </span>
                </h2>
                <br />
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Price :
                  <span className=" text-xl text-zinc-600 ml-4">
                    Rs.{singleProduct?.price}
                  </span>
                </h2>
                <br />
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Rating :
                  <span className=" text-xl text-zinc-600 ml-4">
                    {singleProduct?.rating?.rate}
                  </span>
                </h2>
                <br />
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Description :
                  <span className=" text-xl text-zinc-600 ml-4">
                    {singleProduct?.description}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default page;
