const { response, request } = require('express');
const get_elements = (req = request, res = response) => {
    res.json({
        message: "GET - Api rest sucess",
        data: []
    });
}
const put_elements = (req = request, res = response) => {
    
    res.json({
        message: "PUT - Api rest sucess",
        data: {}

    });
}
const post_elements = (req = request, res = response) => {
    console.log(req.body);
    res.status(201).json({
        message: "POST - Api rest sucess",
        data: {}
    });
}
const delete_element = (req = request, res = response) => {
    res.json({
        message: "DELETE - Api rest success",
        data: {}
    });
}
const patch_element = (req = request, response = response) => {
    res.json({
        message: "PATCH - Api Rest Success",
        data: {}
    }); 
}
module.exports = {
    get_elements,
    put_elements,
    post_elements,
    delete_element,
    patch_element
}