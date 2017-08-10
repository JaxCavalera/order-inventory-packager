/**
 * Takes the current bakery item store and updates the qtyValue
 * @param {object} store - MobX store
 * @param {string} newQty - The new quantity of bakery item to be ordered
 */
export const updateItemQty = (store, newQty) => {
    store.qtyValue = newQty;
};
