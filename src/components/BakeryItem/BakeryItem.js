// NPM Modules
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Styles
import './BakeryItem.css';

// Logic
import * as logic from './BakeryItem-logic';

// Initial State
export const initialState = {
    qtyValue: '',
};

export default inject('store')(observer(class BakeryItem extends Component {
    constructor(props) {
        super(props);

        this.bakeryStore = this.props.store.appStore[this.props.code];
    }

    callUpdateItemQty = (e) => {
        logic.updateItemQty(this.bakeryStore, e.target.value);
    }

    render() {
        const { name } = this.props;

        return (
            <label className="bakeryog__bakery-item">
                <span className="bakeryog__bakery-item-name">{name}</span>
                <input
                    type="number"
                    className="bakeryog__bakery-item-input"
                    placeholder="QTY"
                    onChange={this.callUpdateItemQty}
                    value={this.bakeryStore.qtyValue}
                />
            </label>
        );
    }
}));
