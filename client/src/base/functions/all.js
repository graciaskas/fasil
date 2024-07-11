/**
 * Get the url main application name
 * Eg: /zeslap/dashboard => dashboard
 * @param {*} url current url
 * @returns application name
 */
export let getModuleFromPath = (url) => {
   let start = url.indexOf("/") + 1;
   let end = url.lastIndexOf("/");
   let module = url.slice(start, end);
   console.log(module);
   return module;
};
/**------------------ */

/**
 *
 * @param {*} key
 * @param {*} value
 * @param {*} anotherKey
 * @returns array of pair key value
 */
export const setKeyValue = (key, value, anotherKey, data) => {
   const item = data.filter((item) => item[key] === value);
   if (item.length) {
      return [item[0][anotherKey], value];
   }
   return value;
};

export const getUserInfo = () => {
   try {
      const databaseData = JSON.parse(window.localStorage.getItem("database"));
      const userInfo = JSON.parse(
         window.localStorage.getItem("userConnectionInfo")
      );
      let values = {};

      if (databaseData != null && userInfo != null) {
         const { name } = databaseData;
         const { response } = userInfo;
         values.database = name;
         values.token = response.token;
         return values;
      }
      return { database: "", token: "" };
   } catch (error) {
      console.error(error);
   }
};

export const getBas64 = (file) => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });
};
