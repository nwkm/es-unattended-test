export const hasOperationName = (req, operationName: string) => {
    const { body } = req;
    return (
        Object.prototype.hasOwnProperty.call(body, 'operationName') &&
        body.operationName === operationName
    );
};

// Alias query if operationName matches
export const aliasQuery = (req, operationName: string) => {
    if (hasOperationName(req, operationName)) {
        req.alias = `gql${operationName}Query`;
    }
};

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName: string) => {
    if (hasOperationName(req, operationName)) {
        req.alias = `gql${operationName}Mutation`;
    }
};
