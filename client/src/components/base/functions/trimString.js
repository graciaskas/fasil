export default     /**
* Remove white space in a string
* @param {*} string string to trim
* @returns trimed string
*/
function trimString( string ) { 
   let appTrimed = "";
   for (let i = 0; i < string.length; i++) {
       const letter = string[i];
       if(letter == " " || letter == "") {  continue  };
       appTrimed += letter;
   }
   return appTrimed;
}

