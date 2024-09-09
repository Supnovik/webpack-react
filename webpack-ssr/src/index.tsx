import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
    document,
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
