export const resetModel = model => { 
   if(!model) return;
   const keys = Object.keys(model);
   keys.forEach( key => { 
      model[key] = "";
   });
   return model;
}