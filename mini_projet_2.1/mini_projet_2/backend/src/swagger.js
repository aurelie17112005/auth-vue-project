// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MP2 Auth JWT',
            version: '1.0.0'
        }
    },
    apis: ['./src/routes/*.js']
};

const spec = swaggerJSDoc(options);
module.exports = app => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
};
