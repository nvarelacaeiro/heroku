const { addNewPost, getAllPosts, getPostsWith } = require("./postsModel")
const { matchedData } = require("express-validator")

const listAll = async (req, res, next) => {
    let dbResponse = null;
    if (req.query.title) {
        dbResponse = await getPostsWith(req.query.title);
    } else {
        dbResponse = await getAllPosts()        
    }

    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.lenght ? res.status(200).json(dbResponse) : next()
}

const addOne = async(req, res, next) => {
const cleanBody = matchedData(req)
const dbResponse = await addNewPost({ userid: req.user.id, ...cleanBody})
dbResponse instanceof Error ? next(dbResponse) : res.status(401).json({ message: `Post created by ${req.user.name}`})

}

// const cleanBody = matchedData(req)
// // const image = `${public_url}/${req.file.filename}`
// // console.log(image)
// const password = await encrypt(req.body.password)
// const dbResponse = await addNewUser({...cleanBody, password})
// if (dbResponse instanceof Error) return next(dbResponse); 
// const user = {
//     name: cleanBody.name,
//     email: cleanBody.email
// }   

module.exports = { addOne, listAll }

// const addOne = async(req, res, next) => {
//     res.json({ token: req.token})
// }


// module.exports = { addOne }

