import { useEffect, useState } from "react";
import Footer from "../component/footer"
import ProductDetailsSeller from "../component/oneProductSeller"
import EditProduct from "../component/user/editProduct"
import NavbarDashboard from "../component/user/navbarDashboard"
import { useParams } from "react-router-dom";
import axios from "axios";



export default function ModifyProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:8000/api/product/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    }
    fetchProduct();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <NavbarDashboard />
      </div>
      <div>
        <div className="p-4 flex flex-col justify-center items-center">
          <div className="flex flex-wrap gap-4 md:flex-row md:flex-nowrap">
            <div className="flex-auto">
              <ProductDetailsSeller product={product} />
            </div>
            <div className="flex-auto grid">
              <EditProduct onSubmit={getProduct} product={product} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}