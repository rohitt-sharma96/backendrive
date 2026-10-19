import { createProducts, getSellerProducts } from "../services/product.api";
import { useDispatch } from "react-redux";
import { setSellerProducts } from '../state/product.slice'


export const useProduct = () => {
    const dispatch = useDispatch();



    const handleCreateProduct = async ({ title, description, priceAmount, priceCurrency, images }) => {
        const data = await createProducts({ title, description, priceAmount, priceCurrency, images })
        return data.products
    }

    const handleGetSellerProducts = async () => {

        const data = await getSellerProducts();
        dispatch(setSellerProducts(data.products))
        return data.products
    }


    return {handleCreateProduct, handleGetSellerProducts}
}
