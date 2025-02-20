import { axiosInstance } from "../../Services/axiosInstance";

const addWarehouse = async (data) => {
    try {
        const response = await axiosInstance.post("inventory/warehouses", data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const getWarehouses = async () => {
    try {
        const response = await axiosInstance.get("inventory/warehouses");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


const updateWarehouse = async (id, data) => {
    try {
        const response = await axiosInstance.put(`inventory/warehouses/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};  

const deleteWarehouse = async (id) => {
    try {
        const response = await axiosInstance.delete(`inventory/warehouses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};    

export { addWarehouse, getWarehouses, updateWarehouse, deleteWarehouse };   


