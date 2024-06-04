const filterObject = (origObj, ...allowedFields) => {
  const newObj = {};
  Object.keys(origObj).forEach((fld) => {
    if (allowedFields.includes(fld)) {
      newObj[fld] = origObj[fld];
    }
  });
  return newObj;
};
module.exports = filterObject;
