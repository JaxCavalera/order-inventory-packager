// NPM Modules
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Styles
import './App.css';

// Logic
import * as logic from './App-logic';

// Constants
import { productList } from './App-constants';

// Components
import BakeryItem, { initialState as bakeryItemStore } from '../components/BakeryItem/BakeryItem';

// Initial State
export const initialState = {
    orderSummary: '',
};

export default inject('store')(observer(class App extends Component {
    constructor(props) {
        super(props);

        this.appStore = this.props.store.appStore;
        this.bakeryItems = logic.generateBakeryItems(this.appStore, bakeryItemStore, productList, BakeryItem);
    }

    callUpdateOrderSummary = () => {
        logic.updateOrderSummary(this.appStore, productList);
    }

    render() {
        return (
            <div className="bakeryog__app">
                <p className="bakeryog__app-intro">
                    Please fill out the order form below with your selections
                </p>
                {this.bakeryItems}
                <button className="bakeryog__app-submit-btn" onClick={this.callUpdateOrderSummary}>
                    Submit Order
                </button>
                <div className="bakeryog__app-order-summary">
                    {this.appStore.orderSummary}
                </div>
            </div>
        );
    }
}));
