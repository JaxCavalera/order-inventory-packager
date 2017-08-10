// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';

// Components
import App from '../App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    let store = observable({
        appStore: {

        },
    });

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        div
    );
});
