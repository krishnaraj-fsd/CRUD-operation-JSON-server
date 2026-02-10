import axios from "axios"

export const apiurl = () => { 
    return 'https://backendtest-h9eq.onrender.com' 
    // return 'http://192.168.1.4:5000' 
}


export const listProducts = async () => {
    const res = await axios.get(`${apiurl()}/products`)
    return res?.data
}

export const saveNewProduct = async (data) => {
    const res = await axios.post(`${apiurl()}/products`, data)
    return res?.data
}

export const updateOldProduct = async (id, data) => {
    const res = await axios.put(`${apiurl()}/products`, data, { params: { _id: id } })
    return res?.data
}

export const deleteProduct = async (data) => {
    const res = await axios.delete(`${apiurl()}/products`, { params: data })
    return res?.data
}