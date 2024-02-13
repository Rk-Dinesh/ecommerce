import React, { useState } from "react";

import Card from "@/components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";
import ProductBox from "@/components/partials/ecommerce/product-box";
import {categories} from "@/constant/data";
import ProductList from "@/components/partials/ecommerce/product-list";
import CheckboxSingle from "@/components/partials/ecommerce/checkbox-single";
import CatagoriesFilterCheckbox from "@/components/partials/ecommerce/catagories-filter-checkbox";
import PriceCheckbox from "@/components/partials/ecommerce/price-checkbox";
import BrandsCheckbox from "@/components/partials/ecommerce/brands-checkbox";
import clsx from "clsx";
import Select from "react-select";
import { useGetProductsQuery } from "@/store/api/shop/shopApiSlice";
import {
  updateSearchFilter,
  updateCategoryFilter,
} from "@/store/api/shop/action";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@/components/ui/Alert";
import LoaderCircle from "@/components/Loader-circle";

const Ecommerce = () => {
  // all products get

  const dispatch = useDispatch();

  const { data: getProduct, isLoading, isError, error } = useGetProductsQuery();

  const products = getProduct?.products || [];
  const searchFilter = useSelector((state) => state.cart.filters.search);
  const categoryFilter = useSelector((state) => state.cart.filters.category);

  const styles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "trasparent",
    }),

    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
 
  // category

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(updateCategoryFilter(category));
  };

  const [view, setView] = useState("grid");

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase())
    )

    .filter(
      (product) =>
        categoryFilter === "all" || product.category === categoryFilter
    );

  if (isLoading) {
    return <LoaderCircle />;
  }
  if (isError) {
    return <Alert> Something is mismatch...</Alert>;
  }
  return (
    <div>
      <div className="grid grid-cols-12  gap-5">
        <Card className="lg:col-span-3 lg:block  hidden   xs h-max col-span-12">
          <div className="space-y-6  divide-y divide-slate-200  dark:divide-slate-700 ">
            <div className="space-y-2 ltr:-ml-6 ltr:pl-6 rtl:-mr-6 rtl:pr-6">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase pt-5 pb-2">
                categories
              </div>
              {categories.map((category, i) => (
                <CatagoriesFilterCheckbox
                  key={`cata_key_${i}`}
                  categoryFilter={categoryFilter}
                  handleCategoryChange={handleCategoryChange}
                  category={category}
                />
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-9  col-span-12">
          <div>
            {/* header for product filter */}
            <div className="md:flex mb-6 md:space-y-0 space-y-4">
              <div className="flex-1 flex  items-center space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={clsx(
                    " border border-slate-400 dark:border-slate-700 text-slate-400 rounded h-11 w-11  inline-flex  items-center  justify-center transition-all duration-200",
                    {
                      "border-slate-900 text-slate-900 dark:border-slate-300/80 dark:text-slate-200":
                        view === "grid",
                    }
                  )}
                >
                  <Icon icon="heroicons:view-columns" className=" w-6 h-6" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={clsx(
                    " border border-slate-400 dark:border-slate-700 text-slate-400 rounded h-11 w-11  inline-flex  items-center  justify-center transition-all duration-200",
                    {
                      "border-slate-900 text-slate-900 dark:border-slate-300/80  dark:text-slate-200":
                        view === "list",
                    }
                  )}
                >
                  <Icon className=" w-6 h-6" icon="heroicons:list-bullet" />
                </button>
              </div>
             
            </div>
            {/* content */}
            {/* product grid view */}
            {view === "grid" && (
              <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-max">
                {filteredProducts.length > 0 ? (
                  filteredProducts?.map((item, i) => (
                    <ProductBox key={`grid_key_${i}`} item={item} />
                  ))
                ) : (
                  <div className=" col-span-12">
                    <Alert className="bg-red-500/40 text-white py-2">
                      There is No Product
                    </Alert>
                  </div>
                )}
              </div>
            )}
            {/* product list view  */}
            {view === "list" && (
              <div className=" space-y-3 grid-cols-1 gap-5 h-max">
                {filteredProducts.length > 0 ? (
                  filteredProducts?.map((item, i) => (
                    <div key={`list_key_${i}`}>
                      <ProductList item={item} key={i} />
                    </div>
                  ))
                ) : (
                  <Alert className="bg-red-500/40 text-white py-2">
                    There is No Product
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
