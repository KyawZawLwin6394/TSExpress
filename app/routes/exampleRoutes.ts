import { Express } from 'express';
import * as example from '../controller/exampleController';

export default (app: Express): void => {
    app
        .route('/api/greet')
        .get(example.getGreeting);
};
