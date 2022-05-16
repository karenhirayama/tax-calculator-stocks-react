import { OperationProps, TransitionsProps } from "../../Interfaces";

export const addStock = (newStock: string) => {
    return (dispatch: any) => {
        dispatch({
            type: "ADD_STOCK",
            payload: newStock
        })
    }
}

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

export const firstTransition = ({ stockCode, operationDate, price, quantity, brokerageFee
}: OperationProps) => {
    return (dispatch: any) => {
        const newAvaregaPrice = (((price * quantity) + brokerageFee) / (quantity));

        const newAvaregaQuantity = (quantity);

        const newCapitalGains = (price * quantity);

        const resultOfFirstTransition = {
            stockCode: stockCode,
            operationDate: operationDate,
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

export const calculationBuyStocks = (lastTransition: TransitionsProps, newTransition: OperationProps) => {
    return (dispatch: any) => {
        const newAvaregaPrice = (((lastTransition.averagePrice * lastTransition.averageQuantity) + (newTransition.price * newTransition.quantity) + newTransition.brokerageFee) / (lastTransition.averageQuantity + newTransition.quantity));

        const newAvaregaQuantity = (lastTransition.averageQuantity + newTransition.quantity);

        const newCapitalGains = (lastTransition.capitalGains + (newTransition.price * newTransition.quantity));

        const resultOfBuy = {
            stockCode: lastTransition.stockCode,
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

export const calculationSellStocks = (lastTransition: TransitionsProps, newTransition: OperationProps) => {
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
            stockCode: lastTransition.stockCode,
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

