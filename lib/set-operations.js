/**
 * Return intersection of two arrays by stringifying values (where needed)
 *
 * @param {any[]} arrayA
 * @param {any[]} arrayB
 * @returns {any[]}
 */
export function intersect (arrayA, arrayB) {
  return arrayA.filter(itemA => arrayB.some(itemB => {
    if (typeof itemA === 'object') {
      return (JSON.stringify(itemA) === JSON.stringify(itemB));
    } else {
      return (itemA === itemB);
    }
  }));
}

/**
 * Return intersection of two object arrays based on a property within the object
 *
 * @param {object[]} arrayA
 * @param {object[]} arrayB
 * @param {string} prop
 * @returns {object[]}
 */
export function intersectByProp (arrayA, arrayB, prop) {
  return arrayA.filter(itemA => arrayB.some(itemB => {
    return (itemA[prop] === itemB[prop]);
  }));
}

/**
 * Return union of two arrays by stringifying values (where needed)
 *
 * @param {any[]} arrayA
 * @param {any[]} arrayB
 * @returns {any[]}
 */
export function union (arrayA, arrayB) {
  return arrayA.concat(arrayB.filter(itemB => arrayA.every(itemA => {
    if (typeof itemA === 'object') {
      return (JSON.stringify(itemA) !== JSON.stringify(itemB));
    } else {
      return (itemA !== itemB);
    }
  })));
}

/**
 * Return union of two object arrays based on a property within the object
 *
 * @param {any[]} arrayA
 * @param {any[]} arrayB
 * @returns {any[]}
 */
export function unionByProp (arrayA, arrayB, prop) {
  return arrayA.concat(arrayB.filter(itemB => arrayA.every(itemA => {
    return (itemA[prop] !== itemB[prop]);
  })));
}
