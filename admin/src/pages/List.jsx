import axios from "axios";
import React, { useState, useEffect } from "react";
import { backend_url, currency } from "../App";
import { TbTrashFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch Product List
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/product/list`);
      console.log("Fetched Products:", response.data); // ✅ Debugging

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="px-2 sm:px-8 sm:mt-14">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center py-1 px-2 bg-white bold-14 sm:bold-15 mb-1 rounded">
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Remove</h5>
        </div>

        {/* PRODUCT LIST */}
        {list.length > 0 ? (
          list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl"
            >
              <img src={item.image[0]} alt="" className="w-12 rounded-lg" />
              <h5 className="text-sm font-semibold">{item.name}</h5>
              <p className="text-sm font-semibold">{item.category}</p>
              <div className="text-sm font-semibold">
                {currency}
                {item.price}
              </div>
              <div onClick={() => removeProduct(item._id)}>
                <TbTrashFilled className="text-right md:text-center cursor-pointer text-lg" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default List;
