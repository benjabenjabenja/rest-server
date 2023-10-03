const { request, response } = require("express");
const { log } = require("../helpers/log");
const { Category } = require("../models");


const get_categories = async (req = request, res = response) => {
    try {
        // obetener categorias del la base de datos
        const categories = [];
        res.json({
            message: "[SUCCESS] - GET CATEGORIES SUCCESS",
            data: categories
        });
    } catch (error) {
        log(error);
        res.status(500).json({
            message: "[ERROR] - GET CATEGORIES ERROR",
            error
        });
    }
};

const get_category_by_id = async (req = request, res = response) => {
    let category = {};
    res.json({
        message: "[SUCCESS] - GET CATEGORY BY ID SUCCESS",
        data: category
    });
};

const post_category = async (req = request, res = response) => {
    try {
        const { name, tag, user } = req.body;
        const category_db = await Category.findOne({ name: name.toUpperCase(), tag });
        
        if (!!category_db) return res.status(400).json({
            message: "[ERROR]-CATEGORY ALREADY EXIST",
            error: `<name> ${name} already exist`
        });

        const data_category = {
            name,
            tag,
            user: user._id
        };

        const new_category = await new Category(data_category);
        await new_category.save();

        res.status(201).json({
            message: "[SUCCESS] - POST CATEGORY SUCCESS",
            category: new_category
        });

    } catch (error) {
        log(error)
        res.status(500).json({
            message: "[ERROR] - POST CATEGORY ERROR",
            error
        });
    }
   
};

const put_category = async (req = request, res = response) => {
    res.json({
        message: "[SUCCESS] - PUT CATEGORY SUCCESS",
        category: {}
    });
}

const delete_category = async (req = request, res = response) => {
    res.json({
        message: "[SUCCESS]- DELETE CATEGORY SUCCESS",
        data: {}
    });
}

module.exports = {
    get_categories,
    get_category_by_id,
    post_category,
    put_category,
    delete_category
}