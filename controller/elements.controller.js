const { response, request } = require('express');
/**
 * GET request handler for an API that returns a success message and
 * an empty array of data.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object in the Express framework.
 */
const get_elements = (req = request, res = response) => {
    res.json({
        message: "GET - Api rest sucess",
        data: []
    });
}
/**
 * PUT request handler for an API that returns a success message and an empty data
 * object.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [res] - The `res` parameter is the response object that is used to send a response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` which is used to send a JSON response.
 */
const put_elements = (req = request, res = response) => {
    
    res.json({
        message: "PUT - Api rest sucess",
        data: {}

    });
}
/**
 * Logs the request body and sends a JSON response with a success message.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request made to the server. It includes details such as the request headers,
 * request body, request method, URL, and more.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object in the Express framework.
 */
const post_elements = (req = request, res = response) => {
    console.log(req.body);
    res.status(201).json({
        message: "POST - Api rest sucess",
        data: {}
    });
}
/**
 * Handles a DELETE request in an API and
 * returns a JSON response with a success message and an empty data object.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` method to send a JSON response, `send()` method to send a plain text response, `status()`
 */
const delete_element = (req = request, res = response) => {
    res.json({
        message: "DELETE - Api rest success",
        data: {}
    });
}
/**
 * API endpoint that responds with a JSON object containing a
 * success message and an empty data object.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [response] - The `response` parameter is the response object that is used to send the
 * response back to the client. It is typically provided by the framework or library being used to
 * handle HTTP requests and responses.
 */
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