const initialState: any = {
    operations: [],
    transitions: [],
    loading: true
};

const stocksReducer = (state = initialState, action: any) => {
    switch (action.type) {
         case "ADD_FIRST_TRANSATION":
            return {
                ...state,
                transitions: [action.payload],
                loading: false,
            }
        case "ADD_OPERATION":
            return {
                ...state,
                operations: [...state.operations, action.payload],
                loading: false,
            };
        case "ADD_TRANSATION":
            return {
                ...state,
                transitions: [...state.transitions, action.payload],
                loading: false,
            }
        case "DETELE_ALL_OPERATIONS": 
            return {
                ...state,
                operations: [],
                transitions: [],
                loading: false
            }
        default:
            return state;
    }
};

export default stocksReducer;