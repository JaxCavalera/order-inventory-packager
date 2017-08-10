// NPM Modules
import React from 'react';

// Components
import BakeryItem from '../../components/BakeryItem/BakeryItem';

// Constants
import * as testConsts from './App-test-constants';
import { productList } from '../App-constants';

// Units to test
import {
    combineBakeItemQtys,
    getPackOptions,
    neatlyPackTotalQty,
    calculateBestPackCombo,
    getFullOrderBestPackCombos,
    structureOrderSummaryDetails,
    updateOrderSummary
} from '../App-logic';

/*
    Combine Bake Item Qtys
*/
describe('Given combineBakeItemQtys(store) is called', () => {
    describe('When store has valid bakeItems', () => {
        test('Then it will return an array of objects that each have a code and itemQty', () => {
            const store = {
                VS5: {
                    qtyValue: 10,
                },
                MB11: {
                    qtyValue: 14,
                },
                CF: {
                    qtyValue: 13,
                },
            };

            const returnValue = [
                {
                    code: 'VS5',
                    itemQty: 10,
                },
                {
                    code: 'MB11',
                    itemQty: 14,
                },
                {
                    code: 'CF',
                    itemQty: 13,
                },
            ];

            const result = combineBakeItemQtys(store);

            expect(result).toEqual(returnValue);
        });
    });
});

/*
    Get Pack Options
*/
describe('Given getPackOptions(bakeItemQtyList, productList) is called', () => {
    describe('When bakeItemQtyList has matching item codes to those in the productList', () => {
        test('Then it will return an array of packOptions', () => {
            const bakeItemQtyList = [
                {
                    code: 'VS5',
                    itemQty: 10,
                },
                {
                    code: 'MB11',
                    itemQty: 14,
                },
                {
                    code: 'CF',
                    itemQty: 13,
                },
            ];

            const returnValue = testConsts.getPackOptionsReturnValue;

            const result = getPackOptions(bakeItemQtyList, productList);

            expect(result).toEqual(returnValue);
        });
    });
});

/*
    Neatly Pack Total Qty
*/
describe('Given neatlyPackTotalQty(packOption, leftoverPacks, total) is called', () => {
    describe('When packOption.qty is 5 && leftoverPacks[0].qty is 3 && total is 18', () => {
        test('Then it will return an array that uses 3 x packOption && 1 x leftoverPacks[0]', () => {
            const returnValue = testConsts.neatlyPackTotalQtyValidReturnValue;

            const result = neatlyPackTotalQty(
                testConsts.neatlyPackTotalQtyValidPackOption,
                testConsts.neatlyPackTotalQtyValidLeftoverPacks,
                18
            );

            expect(result).toEqual(returnValue);
        });
    });
});

/*
    Calculate Best Pack Combo
*/
describe('Given calculateBestPackCombo(store, bakeItem, packOptions) is called', () => {
    describe('When the bakeItem QTY is 10 and the packOptions are 5 & 3', () => {
        test('Then it will return an array of objects that each have a code and itemQty', () => {
            const returnValue = testConsts.calculateBestPackComboReturnValue;

            const result = calculateBestPackCombo({}, testConsts.calculateBestPackComboBakeItem, testConsts.calculateBestPackComboPackOptions);

            expect(result).toEqual(returnValue);
        });
    });

    describe('When the bakeItem QTY is 2 and the packOptions are 5 & 3', () => {
        test('Then it will return undefined as 2 is an invalid total QTY', () => {
            const returnValue = undefined;

            const result = calculateBestPackCombo({}, testConsts.calculateBestPackComboInvalidBakeItem, testConsts.calculateBestPackComboPackOptions);

            expect(result).toEqual(returnValue);
        });
    });
});

/*
    Get Full Order Best Pack Combos
*/
describe('Given getFullOrderBestPackCombos(store, bakeItemQtyList, descendingPackOptions) is called', () => {
    describe('When bakeItemQtyList == VS5 10, MB11 14 & CF 13', () => {
        test('Then it will return pack combinations as follows: VS5 2x5pack, MB11 1x8pack 3x2pack, CF 2x5pack, 1x3pack', () => {
            const returnValue = testConsts.getFullOrderBestPackCombosReturnValue;

            const result = getFullOrderBestPackCombos({}, testConsts.getFullOrderBestPackCombosBakeList, testConsts.getFullOrderBestPackCombosDescOpts);

            expect(result).toEqual(returnValue);
        });
    });

    describe('When the bakeItemQtyList contains invalid totalQtys', () => {
        test('Then it will return an array with undefined values', () => {
            const returnValue = [undefined, undefined, undefined];

            const result = getFullOrderBestPackCombos({}, testConsts.getFullOrderBestPackCombosInvalidBakeList, testConsts.getFullOrderBestPackCombosDescOpts);

            expect(result).toEqual(returnValue);
        });
    });
});
