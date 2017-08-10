// NPM Modules
import React from 'react';
import { observable } from 'mobx';

/**
 * Takes a list of available products and returns an array of React components
 * that display the product details.
 * @param {array} productList - List of available products for sale
 * @param {element} BakeryItem - React template for display a bakery item
 * @return {array} - Array of React components
 */
export const generateBakeryItems = (store, initialState, productList, BakeryItem) => {
    return productList.map((product) => {
        store[product.code] = observable(initialState);

        return (
            <BakeryItem
                key={product.code}
                name={product.name}
                code={product.code}
            />
        );
    });
};

/**
 * Filters through the store and extracts the current bakeItemQtys
 * @param {object} store - MobX store
 * @return {array} - Returns an array of objects with a bakeItemCode and Qty
 */
export const combineBakeItemQtys = (store) => {
    let bakeItemQtyList = [];

    for (let item in store) {
        let itemQtyValue = store[item].qtyValue;

        // Round down and convert to integers to ensure customers aren't placing orders for decimal fractions of a baked item
        if (item !== 'orderSummary' && (itemQtyValue !== '' || Math.floor(parseInt(itemQtyValue, 10)) > 0)) {
            bakeItemQtyList.push({
                code: item,
                itemQty: Math.floor(parseInt(itemQtyValue, 10)),
            });
        }
    };

    return bakeItemQtyList;
};

/**
 * Compares the product code in both arrays to extract the relevant pack options
 * @param {array} bakeItemQtyList - A list of bakeItems and their respective order quantities
 * @param {array} productList - A list of existing products
 * @return {array} - Returns an array of packOptions
 */
export const getPackOptions = (bakeItemQtyList, productList) => {
    return productList.filter((product) => {
        return bakeItemQtyList.some((bakeryItem) => {
            return bakeryItem.code === product.code;
        });
    });
};

/**
 * Attempts via trial and error to work out the best combination of packs to result in zero left-over
 * @param {object} packOption - The current pack being assessed
 * @param {array} leftoverPacks - A list of all package options excluding the packOption & previously assessed ones
 * @param {number} total - The total quantity of items to be packaged
 * @return {array} - Returns the best packaging solution
 *                 - Returns an empty array if no best solution was found when starting with the provided packOption 
 */
export const neatlyPackTotalQty = (packOption, leftoverPacks, total) => {
    let remainder;

    // Work out the maximum number of times the test can run
    const maxSubtractAttempts = Math.floor(total / packOption.qty);

    const getTotalModLeftoverPack = (leftoverPack) => {
        return (remainder % leftoverPack.qty === 0);
    };

    for (let i = 0; i < maxSubtractAttempts; i += 1) {
        let newSubtractAttempt = (maxSubtractAttempts - i) * packOption.qty;
        remainder = total - newSubtractAttempt;

        if (remainder === 0) {
            // Pack option can be used for entire qty of this item
            return [
                {
                    packType: packOption.qty,
                    packCount: newSubtractAttempt / packOption.qty,
                    pricePerPack: packOption.price,
                },
            ];
        }

        const leftoverPackModsToZero = leftoverPacks.filter(getTotalModLeftoverPack)[0];

        if (leftoverPackModsToZero) {
            // List how many of each pack are needed to complete the order
            return [
                {
                    packType: packOption.qty,
                    packCount: newSubtractAttempt / packOption.qty,
                    pricePerPack: packOption.price,
                },
                {
                    packType: leftoverPackModsToZero.qty,
                    packCount: remainder / leftoverPackModsToZero.qty,
                    pricePerPack: leftoverPackModsToZero.price,
                },
            ];
        }
    }

    // No matching combo exists for this order so return an empty array
    return [];
};

/**
 * Finds the most efficient way to package a specific bakeItem qty
 * @param {object} store - MobX store
 * @param {object} bakeItem - Contains a bakery item codename and total qty being ordered
 * @param {array} packOptions - Lists all available packaging options for the specified bakeItem
 * @return {object} - Returns the most efficient orderBreakdown
 *                  - Returns undefined if an invalid total qty is provided
 */
export const calculateBestPackCombo = (store, bakeItem, packOptions) => {
    let orderBreakdown = [];
    let total = bakeItem.itemQty;

    let biggestPack;
    packOptions.some((currentPack) => {
        biggestPack = currentPack;
        return currentPack.qty <= total;
    });

    if (biggestPack.qty > total) {
        store.orderSummary = `Please enter a QTY of ${biggestPack.qty}, or more for item: ${bakeItem.code}`;
        return;
    }

    let totalModBiggestPackRemainder = total % biggestPack.qty;

    if (totalModBiggestPackRemainder === 0) {
        // Biggest pack option can be used to ship the entire order
        return {
            code: bakeItem.code,
            totalQty: total,
            packDetails: [
                {
                    packType: biggestPack.qty,
                    packCount: total / biggestPack.qty,
                    pricePerPack: biggestPack.price,
                },
            ],
        };
    }

    // For each packType starting at the biggest, find if that packType can be used in the order
    packOptions.some((packOption, index) => {
        let leftoverPacks = packOptions.slice(index);

        if (typeof packOptions[index + 1] !== 'undefined') {
            leftoverPacks = packOptions.slice(index + 1);
            orderBreakdown = neatlyPackTotalQty(packOption, leftoverPacks, total);
        }

        // As a last ditch effort try to mod the total using the biggest item in the leftoverPacks
        if (total % leftoverPacks[0].qty === 0) {
            orderBreakdown = [
                {
                    packType: leftoverPacks[0].qty,
                    packCount: total / leftoverPacks[0].qty,
                    pricePerPack: leftoverPacks[0].price,
                },
            ];
        }

        // Exit the loop early if orderBreakdown finds a match
        return orderBreakdown.length !== 0;
    });

    let isInvalidOrderQty = orderBreakdown.some((item) => {
        return item.packCount <= 0;
    });

    if (isInvalidOrderQty || orderBreakdown.length === 0) {
        store.orderSummary = `We are only able to ship orders for item ${bakeItem.code}, into the following package quantities: ${packOptions.map(pack => pack.qty).join(', ').trim()}.`;
        return;
    }

    return {
        code: bakeItem.code,
        totalQty: total,
        packDetails: orderBreakdown,
    };
};

/**
 * Go through each bakery item in the order and calculate the best pack combination for it
 * @param {object} store - MobX store
 * @param {array} bakeItemQtyList - Contains the total qty and codename for each item ordered
 * @param {array} descendingPackOptions - Contains the codename, item name and available package details for each item ordered
 * @return {array} - Returns a list of best packaging combinations for each item ordered
 */
export const getFullOrderBestPackCombos = (store, bakeItemQtyList, descendingPackOptions) => {
    return bakeItemQtyList.map((bakeItem) => {
        // Polyfill for .find() to support ie - get the pack options for the current bakeItem
        let currentPackOptions;
        descendingPackOptions.some((packDetails) => {
            currentPackOptions = packDetails.packs;
            return packDetails.code === bakeItem.code;
        });

        return calculateBestPackCombo(store, bakeItem, currentPackOptions);
    });
};

/**
 * Structures the bestPackCombos into a format suitable for mapping data to a React component
 * @param {array} bestPackCombos - A list of the best pack combination per item type being ordered
 * @param {array} productList - A list of existing products
 * @return {array} - Returns a list of mappable order summary items
 */
export const structureOrderSummaryDetails = (bestPackCombos, productList) => {
    return bestPackCombos.map((currentOrderItem) => {
        // Calculate the total cost for the packaged items
        const totalItemPriceValue = currentOrderItem.packDetails.reduce((tally, pack) => {
            const packPrice = parseFloat((pack.pricePerPack * pack.packCount).toFixed(2));
            return tally += packPrice;
        }, 0);

        return {
            code: currentOrderItem.code,
            totalQty: currentOrderItem.totalQty,
            totalItemPrice: totalItemPriceValue,
            packDetails: currentOrderItem.packDetails,
        };
    });
};

/**
 * Calls the functions used to process the submitted order & updates the order summary with the result
 * 
 * If any item from the order had an invalid qty specified it will abort displaying the final order summary
 * until the problem qty has been resolved and re-submitted
 * 
 * @param {object} store - Mobx store
 * @param {array} productList - A list of existing products
 */
export const updateOrderSummary = (store, productList) => {
    // Clear the previous order summary
    store.orderSummary = '';

    // Combine bakeryItem stores into a single array only including ones with an order QTY
    const bakeItemQtyList = combineBakeItemQtys(store);
    const packOptionsForOrder = getPackOptions(bakeItemQtyList, productList);

    // Re-order the packs biggest qty first to make filtering easier
    const descendingPackOptions = packOptionsForOrder.map((bakeryItem) => {
        bakeryItem.packs = bakeryItem.packs.sort((a, b) => b.qty - a.qty);
        return bakeryItem;
    });

    const bestPackCombos = getFullOrderBestPackCombos(store, bakeItemQtyList, descendingPackOptions);

    // Only structure and display the order summary if all item qty's are valid
    if (!bestPackCombos.some(item => typeof item === 'undefined')) {
        const orderSummaryDetails = structureOrderSummaryDetails(bestPackCombos, productList);

        store.orderSummary = orderSummaryDetails.map((item) => {
            const itemPackageList = item.packDetails.map(pack => (
                <span key={pack.packType} className="bakeryog__app-summary-item-pack">
                    {`${pack.packCount} x ${pack.packType} $${pack.pricePerPack}`}
                </span>
            ));

            return (
                <div key={item.code} className="bakeryog__app-summary-item">
                    <span className="bakeryog__app-summary-item-total">
                        {`${item.totalQty} ${item.code} $${item.totalItemPrice.toFixed(2)}`}
                    </span>
                    {itemPackageList}
                </div>
            );
        });
    }
};
