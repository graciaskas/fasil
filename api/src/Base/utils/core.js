
/**
 * Paginate response
 * @param {*} document Mongoose Schema
 * @param {*} query Object { query: Mongo Query, __order: { field: -1 }}
 * @param {*} req Express:request object
 * @returns result object
 */
exports.paginate = async function (document, query, req) {
    const { page = 1, limit = 20 } = req.query;

    /**
     * Default for active data
     *All Documents should have a key named "active"
    */
    let items = await document.find({ active: true }).count();

    console.log(query);
    if (!query.query)
        throw Error("Invalid atgument query passed");

    // if requested for unactive data    
    if(!query.query.active == true)
        items = await document.find({ active: false }).count();
    
    //if requested for all docuemnts
    if (!query.query.active)
        items = await document.find({  }).count();

    const pages = Math.ceil(items / limit);
   
    const pg = parseInt(page);
    const lim = parseInt(limit);
    const startIndex =  page == 1 ? 0 : (pg - 1) * lim;

    let result = {
        pagination: {
            page: pg,
            limit: lim,
            start : startIndex,
            items: items,
            pages: pages,
        }
    };
    result.data = await document.find(query.query)
        .limit(lim)
        .skip(startIndex)
        .sort(query.__order);
    return result;  
};


/**
 * Order a query by requested field and sort order
 * @param {*} req client request
 * @param {*} Schema MongoDB Schema
 * @returns Object with order object and warn_message
 */
exports.QueryOrder = function (req, Schema) {
    let { sort = 'active,id', order = 'desc' } = req.query;
    let warn_message = null;
  
    try {

        if (sort == '') sort = 'active,id';
        // split sort into array of keys;
        let query = { active : true};
        let queryFields = sort.split(",");

        let __order = {};
        //sort field from sort parameter
        //Should be the second one;
        //Only two fields is allowed
        let field = queryFields[1];

        //if requested unactive data update query.active to false;
        if (queryFields.includes('unactive')) query.active = false;

        //if requested for all documents
        if (queryFields.includes("all")) {
            delete query.active;
            if (queryFields.length == 1) {
                field = 'id';
            }
        }
        
        // Get all schema keys
        let schemaKeys = Object.keys(Schema.schema.obj);

        /***  Default sortable Keys ***/
        let = keys = ['all', 'active', 'unactive'];

        /**  if only one key passed  **/
        if (!queryFields[1]) {
            //verify if key exists
            if (schemaKeys.includes(queryFields[0])) {
                field = queryFields[0] //Set the first     
            // if the key is not exists
            } else {
                field = 'id';
                if(!keys.includes(queryFields[0]))
                    warn_message = `The key [${queryFields[0]}] is not valid,the [id] key is used instead`;
            }

        //if two key or more passed
        } else {
            //if more than two keys
            if (queryFields.length > 2) {
                warn_message = 'Only two keys are supported for sort parameter';
            } else if (queryFields.length > 1 && queryFields.length <= 2) {
                //Verify if passed invalid keys;
                if (!schemaKeys.includes(queryFields[1])) {
                    warn_message = `The second key [${queryFields[1]}] is not valid,the [id] key is used instead`;
                    field = 'id';
                } else if(!keys.includes(queryFields[0])){
                    warn_message = `The first key [${queryFields[0]}] is not valid,the [active] key is used instead`;
                    query.active = true;
                }
            }
        }
    
        // define the sort way for mongo query
        __order[field] = order === 'desc' ? -1 : 1;
        return { __order, warn_message, query };
    } catch (error) {
        throw Error(error);
        return {};
    }
}