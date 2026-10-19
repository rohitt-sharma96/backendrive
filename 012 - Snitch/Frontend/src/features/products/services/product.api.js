import axios from 'axios'

const api = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export const createProducts = async({ title, description, priceAmount, priceCurrency, images }) =>{
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priceAmount", String(priceAmount));
    formData.append("priceCurrency", priceCurrency);
    images.forEach((image) => formData.append("images", image));

    const response = await api.post("/", formData)
    return response.data
}

export const getSellerProducts = async () =>{

    const response = await api.get("/seller");
    return response.data;
}