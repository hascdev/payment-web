import 'aws-sdk';

export function get(context, url, responseFunction, errorFunction) {
    
    /*
    let poolData = { UserPoolId: Constants.USER_POOL_ID, ClientId: Constants.APP_CLIENT_ID };
    let userPool = new AWSCognito.CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        
        cognitoUser.getSession((error, session) => {
            
            if (error) {
                console.error(error);
                errorFunction.call(context, error.message);
                return;
            }
            
            if (session.isValid()) {*/
                
                fetch(url, {
                    method: 'GET',
                    credentials: 'same-origin',
                    //headers: { 'Authorization': session.getIdToken().getJwtToken() }
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    console.log(json);
                    if (json.code > 0) {
                        responseFunction.call(context, json.object, json);
                    } else {
                        errorFunction.call(context, json.message);
                    }
                }).catch((error) => {
                    errorFunction.call(context, error.message);
                });
                
                /*
                
            } else {
                
                console.error('Sesión inválida');
                errorFunction.call(context, 'Sesión inválida');
            }
        });
        
    } else {
        
        console.error('Error al obtener usuario actual. cognitoUser es NULL');
        errorFunction.call(context, 'Error al obtener usuario actual.');
    }
    */
}

export function post(context, url, body, responseFunction, errorFunction) {
    /*
    let poolData = { UserPoolId: Constants.USER_POOL_ID, ClientId: Constants.APP_CLIENT_ID };
    let userPool = new AWSCognito.CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        
        cognitoUser.getSession((error, session) => {
            
            if (error) {
                console.error(error);
                errorFunction.call(context, error.message);
                return;
            }
            
            if (session.isValid()) {*/
                
                fetch(url, {
                    method: 'POST',
                    //headers: { 'Authorization': session.getIdToken().getJwtToken() },
                    body: JSON.stringify(body)
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    console.log(json);
                    if (json.code > 0) {
                        responseFunction.call(context, json.object, json);
                    } else {
                        errorFunction.call(context, json.message);
                    }
                }).catch((error) => {
                    errorFunction.call(context, error.message);
                });
                
                /*
            } else {
                
                console.error('Sesión inválida');
                errorFunction.call(context, 'Sesión inválida');
            }
        });
        
    } else {
        
        console.error('Error al obtener usuario actual. cognitoUser es NULL');
        errorFunction.call(context, 'Error al obtener usuario actual.');
    }
    */
}
