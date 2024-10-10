import React from 'react'

// list of the categories
const categoryItems = [
    { id: 1, title: "Sauce Pan", description: "Perfect for simmering sauces and soups with even heat distribution.", image: "/homePage/categoryItems/category_1.jpg" },
    { id: 2, title: "Frying Pan", description: "Non-stick frying pan ideal for sautéing and frying.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 3, title: "Stock Pot", description: "Large aluminium pot great for soups, stews, and boiling pasta.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 4, title: "Casserole Dish", description: "Versatile aluminium casserole dish for oven and stovetop use.", image: "/homePage/categoryItems/category_1.jpg" },
    { id: 5, title: "Wok", description: "Deep, wide aluminium wok designed for stir-frying at high heat.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 6, title: "Roasting Pan", description: "Aluminium roasting pan ideal for meats, vegetables, and large meals.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 7, title: "Griddle Pan", description: "Flat, wide griddle pan for grilling sandwiches, pancakes, and more.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 8, title: "Pressure Cooker", description: "Aluminium pressure cooker to cook meals faster while retaining nutrients.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 9, title: "Baking Sheet", description: "Durable aluminium baking sheet for cookies, pastries, and roasting.", image: "/homePage/categoryItems/category_1.jpg"},
    { id: 10, title: "Dutch Oven", description: "Heavy-duty aluminium Dutch oven for slow-cooked stews and braised meats.", image: "/homePage/categoryItems/category_1.jpg" }
];


const Categories = () => {
  return (
    <div className=' section-container py-16'>
        <div className=' text-center'>
            <p className=' subtitle'>Customer Favorites</p>
            <h2 className=' title'>Popular Categories</h2>
        </div>

        {/* Categories */}
        <div className=' flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
            {
                categoryItems.map((item, index)=>(
                    <div key={index} className=' shadow-lg rounded-xl py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                        <div className=' w-32 h-32 flex mx-auto items-center justify-center '>
                            <img src={item.image} alt={item.title} className=' w-fuu h-full object-contain'/>
                            
                        </div>
                        <div>
                        <h3 className=' font-semibold'>{item.title}</h3>
                        <p className='category-description text-grey text-sm'>{item.description}</p>
                        </div>

                    </div>

                ))
            }

        </div>


    </div>
  )
}

export default Categories