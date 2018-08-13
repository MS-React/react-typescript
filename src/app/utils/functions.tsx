
// This is an assign function that copies full descriptors
export function completeAssign(target: any, ...sources: any[]) {
  sources.forEach((source: any) => {
    let descriptors = Object.keys(source).reduce((descriptors: any, key: any) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

export function omit(entity: any, property: any) {
  let newEntity = completeAssign({}, entity);
  delete newEntity[property];
  return newEntity;
}
