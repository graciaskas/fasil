let fs = require("fs");

module.exports = { 
    /**
     * Define custome identifier
     * @param {*} count Dataset length
     * @param {*} prefix Prefix string
     * @returns Custom id.eg:SO0001
     */
    _id: (count, prefix) => {
        let pre_ = prefix.toUpperCase();
        let start = `${pre_}00001`;
        let legth = start.length;
        let increment = count + 1
        let next = null;
        if (count == 0) return start;
        if (count < 10) next = `${pre_}0000${increment}`;
        if (count > 10 && count <= 98) next = `${pre_}000${increment}`;
        if (count > 98) next = `${pre_}00${increment}`;
        if (count >= 999) next = `${pre_}0${increment}`;
        if (count >= 9999) next = `${pre_}${increment}`;
        return next;
    },

     base64Image : function(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }
}