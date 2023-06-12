import { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category === categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);

  return (
    <div className="container mx-auto  mb-16">
    
    
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[450px]">
        {filter.length > 0 &&
          filter
            .slice(0, productLimit)
            .map((product) => <MenuItem key={product._id} product={product} />)}
      </div>
      <div className="flex items-center justify-center w-full mt-8">
        <button
          className="btn-primary"
          onClick={() => setProductLimit(productLimit + 3)}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;