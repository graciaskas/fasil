
/**
 * Paginate response
 * @param {*} document Mongoose Schema
 * @param {*} query Mongo Query
 * @param {*} req Express:request object
 * @returns result object
 */
module.exports = async function (array, query, req) {
    const { page = 1, limit = 40 } = req.query;
    const items = array.length
    const pages = Math.ceil(items / limit);
   
    const pg = parseInt(page);
    const lim = parseInt(limit);
    const startIndex = (pg - 1) * lim;
    const endIndex = pg * lim;
    //slice the array
    let result = {
        pagination: {
            page: pg,
            limit: lim,
            startIndex,
            items,
            pages,
        }
    };
    result.data = array.slice(startIndex, endIndex);
    return result;  
};