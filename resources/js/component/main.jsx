import { useEffect, useState } from "react";
import callApi from "./utils/axios";
const Main =()=>{

	const [products,setProducts] = useState([]);
	const [loading,setLoading] = useState(false);

	useEffect(()=>{
		const scrapeProducts =async()=>{
			const data = await callApi('/product/scrapProducts', 'get');
			// console.log(data);
			setProducts(data);
		}
		scrapeProducts();
	},[]);

	const refresh = async() =>{
		setLoading(true);
		let data = await callApi('/product/scrapProducts?refresh=true', 'get');
		console.log(data);
		setProducts(data);
		setLoading(false);
	}

	return(
		<>
			<div className="container mx-auto p-5">
				<div className="md:flex md:flex-row md:justify-between text-center text-sm sm:text-base">
					<div className="flex flex-row justify-center">
						<div className="bg-gradient-to-r from-purple-400 to-red-400 w-10 h-10 rounded-lg"></div>
						<h1 className="text-3xl text-gray-600 ml-2">Aleshamart</h1>
					</div>
					<div className="mt-2">
						<a href="#" className="text-gray-600 hover:text-purple-600 p-4 px-3 sm:px-4">Home</a>
						<a href="#" className="text-gray-600 hover:text-purple-600 p-4 px-3 sm:px-4">Shop</a>
						<a href="#" className="text-gray-600 hover:text-purple-600 p-4 px-3 sm:px-4">Blog</a>
						<a href="#" className="text-gray-600 hover:text-purple-600 p-4 px-3 sm:px-4">Contact</a>
						<a href="#" className="bg-purple-600 text-gray-50 hover:bg-purple-700 p-3 px-3 sm:px-5 rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						Cart (0)
						</a>
					</div>
				</div>


				<div className="my-20">
					<div className="flex flex-row justify-between my-5">
						<h2 className="text-3xl">Scrap Women's product From Alesha Mart</h2>
						{!loading && <a onClick={refresh} className="flex flex-row bg-gradient-to-r from-red-600 to-pink-500 cursor-pointer rounded-full py-4 px-8 text-gray-50 uppercase text-xl md:self-start my-5">
							Refresh Products
						</a>}
						{loading && <a className="flex flex-row bg-gradient-to-r from-red-600 to-pink-500 cursor-pointer rounded-full py-4 px-8 text-gray-50 uppercase text-xl md:self-start my-5">
							Please wait...
						</a>}
					</div>
					<div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

						{products.map((product,index)=>{
							return(
								<div className="shadow-lg rounded-lg" key={index}>
									<a href="#">
										<img src={product.prod_image} className="rounded-tl-lg rounded-tr-lg" />
									</a>
									<div className="p-5">
									<h3><a href="#">{product.prod_name}</a></h3>
									<div className="flex flex-row my-3 font-bold">
										{product.prod_price}
									</div>
									<div className="flex flex-col xl:flex-row justify-between">
										<a className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
										Buy now
										</a>
									</div>
									</div>
								</div>
							)
						})}
						

					</div>
				</div>
			</div>
		</>
	)

}

export default Main;