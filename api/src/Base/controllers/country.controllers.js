const countries = require("../data/countries.data");
const paginate = require("../utils/paginateArray");

exports.find = async function (req, res) {
    let result = await paginate(countries, {}, req); //paginated data
	return res.status(200).json({ type: 'success', result});
};