import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';

export function getBalance() {
    return (dispatch) => {
        connector.getBalance()
            .then( function (balance) {
                    dispatch(receiveBalance(balance));
                }
            ).catch((err) => {});
    }
}

export function receiveBalance(balance) {
    // call reducer
    return {
        type    : types.SET_BALANCE,
        balance : balance.balance
    }
}
