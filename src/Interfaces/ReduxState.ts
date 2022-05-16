import {OperationProps, TransitionsProps} from './index'

export interface ReduxStateProps {
    stockCode?: [];
    operations?: OperationProps;
    transitions?: TransitionsProps;
    loading?: boolean
}