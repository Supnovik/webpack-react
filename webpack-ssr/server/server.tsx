// @ts-ignore
import express from "express";
import {renderToPipeableStream} from "react-dom/server";
import App from "../src/App";

const app = express();

app.get("/*", (req, response) => {
    const { pipe } = renderToPipeableStream(<App />, {
        bootstrapScripts: ['/main.js'],
        onShellReady() {
            response.setHeader('content-type', 'text/html');
            pipe(response);
        },
        onShellError(error) {
            response.statusCode = 500;
            response.setHeader('content-type', 'text/html');
            response.send('<h1>Something went wrong</h1>');
        },
        onError(error) {
            console.error(error);
        }
    });
});

app.listen(3000, () => {
    console.log("App is running on http://localhost:3000");
});
