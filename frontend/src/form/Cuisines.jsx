import React from "react";

const Cuisines = () => {
  return (
    <div className="w-full my-5 py-10 px-5 bg-white border rounded-4xl">
      <div className="">
        {/* Title + Button */}
        <div className="flex items-center px-2 justify-between mb-4">
          <h3 className="text-2xl">Cuisines</h3>
          <button
            className=" ml-auto mr-3 text-gray-500 bg-white border border-gray-300 px-4 py-1 text-sm sm:px-6 sm:py-2 sm:text-base
            md:px-7 md:py-2.5 md:text-base lg:px-8 lg:py-2 lg:text-base rounded-lg hover:bg-gray-100 transition">
            See All Cuisines
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 ite-between sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 lg:p-2 md:p-2">
          {/* Column 1 */}
          <div className="bg-white ">
            <h2 className="text-sm font-semibold">
              🇮🇳 Indian Regional Cuisines
            </h2>
            <ul className="ml-5 space-y-1 text-gray-700">
              <li>North Indian</li>
              <li>South Indian</li>
              <li>Punjabi</li>
              <li>Rajasthani</li>
            </ul>
            
          </div>

          {/* Column 2 */}
          <div className="bg-white">
            <h2 className="body-lg !font-semibold">
              🌐 International Cuisines
            </h2>
            <ul className="ml-7 space-y-1 text-gray-700">
              <li>Italian</li>
              <li>Chinese</li>
              <li>Mexican</li>
              <li>Thai</li>
            </ul>
            
          </div>

          {/* Column 3 */}
          <div className="bg-white">
            <h2 className="body-lg !font-semibold">
              🍴 Contemporary Food
            </h2>
            <ul className="ml-7 space-y-1 text-gray-700">
              <li>Fusion</li>
              <li>Healthy Bowls</li>
              <li>Street Food</li>
              <li>Quick Bites</li>
            </ul>
            
          </div>

          {/* Column 4 */}
          <div className="bg-white">
            <h2 className="font-medium flex items-center gap-2 mb-2">
              🍰 Desserts & More
            </h2>
            <ul className="ml-7 space-y-1 text-gray-700">
              <li>Cakes</li>
              <li>Ice Cream</li>
              <li>Pastries</li>
              <li>Shakes</li>
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuisines;
