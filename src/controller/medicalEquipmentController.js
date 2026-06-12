import productosModel from "../models/productosModel.js";

import {v2 as cloudinary} from "cloudinary";

const productosController = {};

productosController.getAll = async (req, res) => {
    try {

        const get = await productosModel.find().populate("variaciones", "tamaño precio stock");
        return res.status(200).json(get);

    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

productosController.getById = async (req, res) => {
    try{
        const producto = await productosModel.findById(req.params.id).populate("variaciones", "tamaño precio stock");
        if(!producto){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        return res.status(200).json(producto);
    }catch(error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

productosController.insertProducto = async (req, res) => {

    try{
        const {nombre, descripcion, variaciones, lanzamientoVIP, fechaLanzamiento, categoriaId} = req.body;
        
        const newProducto = new productosModel({
            nombre,
            descripcion,
            variaciones,
            imagen: req.file.path,
            public_id: req.file.filename,
            lanzamientoVIP,
            fechaLanzamiento,
            categoriaId,
            isActive: true,
            createdAt: Date.now()
        })

        await newProducto.save();
        return res.status(200).json({message: "Producto Creado"})
    }catch(error){
        console.log("error: " + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

productosController.updateProducto = async (req, res) => {
    try{

        let {nombre, descripcion, variaciones, lanzamientoVIP, fechaLanzamiento, categoriaId} = req.body;
        const producto = await productosModel.findById(req.params.id);
        if(!producto){
            return res.status(404).json({message: "Producto no encontrado"});
        }

        const productoModified = {nombre, descripcion, variaciones, lanzamientoVIP, fechaLanzamiento, categoriaId};

        if(req.file){
            await cloudinary.uploader.destroy(producto.public_id);
            productoModified.imagen = req.file.path;
            productoModified.public_id = req.file.filename;
        }

        const updateProducto = await productosModel.findByIdAndUpdate(req.params.id, {
            nombre, 
            descripcion, 
            variaciones,
            imagen: req.file.path,
            public_id: req.file.filename,
            lanzamientoVIP,
            fechaLanzamiento,
            categoriaId,
            isActive: true,
            updatedAt: Date.now()
        }, {new: true});

        await updateProducto.save();

    } catch(error){
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

productosController.deleteProducto = async (req, res) => {
    try {
        //validacion para eliminar en un periodo corto de tiempo (15 minutos)
        let {createdAt, isActive} = req.params;

        const DELETE_WINDOWS_MS = 15 * 60 * 1000;

        const eliminarProducto = await productosModel.findById(req.params.id);
        
        if(!eliminarProducto){
            return res.status(404).json({message: "Producto no encontrado"})            
        }
        
        const elapsed = Date.now() - eliminarProducto.createdAt;
        
        if(elapsed > DELETE_WINDOWS_MS){
            return res.status(403).json({message: "El periodo para eliminar el producto ha vencido"})
        }
        
        await productosModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Producto eliminado Correctamente"})
        
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

export default productosController;