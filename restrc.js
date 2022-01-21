'use strict';
module.exports = function (resourceName, bodies) {
    return {
        routers: {
            resourceName,
            body: bodies.routers,
            fileName: `routers/${resourceName}-rt.js`,
            params: {
                dir: '../controllers',
                basePath: 'v1',
                routerName: 'camelCaseNameRt',
                controllerName: 'pascalCaseNameCtrl',
                pathName: 'pluralizedName',
            },
        },
        controllers: {
            resourceName,
            body: bodies.controllers,
            fileName: `controllers/${resourceName}-ctrl.js`,
            params: {
                dir: '../services',
                controllerName: 'pascalCaseNameCtrl',
                serviceName: 'pascalCaseNameSrv',
            },
        },
        models: {
            resourceName,
            body: bodies.models,
            fileName: `models/${resourceName}.js`,
            params: { // find in string by key name
                modelName: 'pascalCaseName',
                schemaName: 'camelCaseNameSchema',
            },
        },
    };
};

