export const addOperation = (newOperation: any) => {
    return (dispatch: any) => {
        dispatch({
            type: "ADD_OPERATION",
            payload: newOperation
        });
    };
};

export const deleteAllOperations = () => {
    return (dispatch: any) => {
        dispatch({
            type: "DETELE_ALL_OPERATIONS",
        });
    };
};

export const firstTransition = (newTransition: any) => {
    return (dispatch: any) => {
        const newAvaregaPrice = (((newTransition.price * newTransition.quantity) + newTransition.brokerageFee) / (newTransition.quantity));

        const newAvaregaQuantity = (newTransition.quantity);

        const newCapitalGains = (newTransition.price * newTransition.quantity);

        const resultOfFirstTransition = {
            operationDate: newTransition.operationDate,
            averagePrice: newAvaregaPrice,
            averageQuantity: newAvaregaQuantity,
            capitalGains: newCapitalGains,
            earned: 0,
            accumulatedLoss: 0,
            incomeTax: 0
        };

        dispatch({
            type: "ADD_FIRST_TRANSATION",
            payload: resultOfFirstTransition
        });
    };
};

export const calculationBuyStocks = (lastTransition: any, newTransition: any) => {
    return (dispatch: any) => {
        const newAvaregaPrice = (((lastTransition.averagePrice * lastTransition.averageQuantity) + (newTransition.price * newTransition.quantity) + newTransition.brokerageFee) / (lastTransition.averageQuantity + newTransition.quantity));

        const newAvaregaQuantity = (lastTransition.averageQuantity + newTransition.quantity);

        const newCapitalGains = (lastTransition.capitalGains + (newTransition.price * newTransition.quantity));

        const resultOfBuy = {
            operationDate: newTransition.operationDate,
            averagePrice: newAvaregaPrice,
            averageQuantity: newAvaregaQuantity,
            capitalGains: newCapitalGains,
            earned: 0,
            accumulatedLoss: 0,
            incomeTax: 0
        };

        dispatch({
            type: "ADD_TRANSATION",
            payload: resultOfBuy
        });
    };
};

export const calculationSellStocks = (lastTransition: any, newTransition: any) => {
    return (dispatch: any) => {
        const newEarned = (((newTransition.price - lastTransition.averagePrice) * newTransition.quantity) - newTransition.brokerageFee);

        const newAvaregaQuantity = (lastTransition.averageQuantity - newTransition.quantity);

        let newAccumulatedLoss = lastTransition.accumulatedLoss;
        let newIncomeTax = 0;

        if (newEarned < 0) {
            newAccumulatedLoss = (newAccumulatedLoss - newEarned);
        } else {
            newIncomeTax = ((newEarned - lastTransition.accumulatedLoss) * 0.15);
            newAccumulatedLoss = 0;
        };

        const newCapitalGains = (lastTransition.capitalGains + (newTransition.price * newTransition.quantity) - newAccumulatedLoss - newIncomeTax);

        const resultOfSell = {
            operationDate: newTransition.operationDate,
            averagePrice: lastTransition.averagePrice,
            averageQuantity: newAvaregaQuantity,
            capitalGains: newCapitalGains,
            earned: newEarned,
            accumulatedLoss: newAccumulatedLoss,
            incomeTax: newIncomeTax
        };

        dispatch({
            type: "ADD_TRANSATION",
            payload: resultOfSell
        });
    };
};