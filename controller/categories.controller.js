const { request, response } = require("express");
const { log } = require("../helpers/log");


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
    res.json({
        message: "[SUCCESS] - POST CATEGORY SUCCESS",
        category: {}
    });
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