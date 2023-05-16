const product = require('../models/product')

const getProduct = async (req, res) => {
    const {name, featured,company, sort,select, numericFile}= req.query
    const object = {}

    if (name){
        object.name = {$regex:name, $options:'i'}
    }
    if (featured) {
        object.featured = featured=== 'true' ? true : false
    } 
     if (company) {
        object.company = company
    } 
        let result = product.find(object)

      if (numericFile) {
        const operatorMap = {
            '>': '$gt',
            '<=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        } 
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFile.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const option = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (option.includes(field)) {
            object[field] = {[operator] : Number(value)}
        }
        })
        
    } result = product.find(object)

    if (sort) {
       sortlist = sort.split(',').join(' ')
         result= result.sort(sortlist)
    }
    // if (numericFile) {
    //     console.log(numericFile)
    // }
    else {
         result = result.sort('name')
    }
    if (select) {
        fieldlist = select.split(',').join(' ')
        result = result.select(fieldlist)
    }

    // page and limit
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10 
    const skip = (page-1) * limit

    result= result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits:products.length})
}

const getStaticProduct = async (req, res) => {
    const products = await product.find({})
    res.status(200).json({products})
}

module.exports = {getProduct, getStaticProduct}