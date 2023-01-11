import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Provider from "components/base/Context";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Provider>
            <App  />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
