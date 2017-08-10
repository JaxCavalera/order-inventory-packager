import { updateItemQty } from '../BakeryItem-logic';

describe('Given updateItemQty(store, newQty) is called', () => {
    describe('When newQty === 10', () => {
        test('Then it will update the store.qtyValue to 10', () => {
            let store = {
                qtyValue: 5,
            };

            updateItemQty(store, 10);

            expect(store.qtyValue).toEqual(10);
        });
    });
});
