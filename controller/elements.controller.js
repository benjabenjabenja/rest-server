const get_elements = (req, res) => {
    res.json({
        message: "GET - Api rest sucess",
        data: []
    });
}
const put_elements = (req, res) => {
    const body = req['body'];
    console.log({body});
    res.json({
        message: "PUT - Api rest sucess",
        data: []

    });
}
const post_elements = (req, res) => {
    if (!!!el) {
        res.status(400).json({
            message: 'Bad request',
            data: null,
            error: {
                message: "property element can't be undefined or null"
            }
        });
        return;
    }
    let el = req['body']?.['element'];
    el.id++;
    res.json({
        message: "POST - Api rest sucess",
        data: {}
    });
}
const delete_element = (req, res) => {
    if (!!!el) {
        res.status(400).json({
            message: 'Bad request',
            data: null,
            error: {
                message: "property element can't be undefined or null"
            }
        })
        return;
    }  
    const el = req['body']?.['element'];
    res.json({
        message: "DELETE - Api rest success",
        data: {}
    });
}
module.exports = {
    get_elements,
    put_elements,
    post_elements,
    delete_element
}