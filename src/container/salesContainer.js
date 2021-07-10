/* COMMON */
import { connect } from 'react-redux';

/* SCREEN & COMPONETS */
import SalesDirectScreen from "../screen/SalesDirectScreen";
import StepOneScreen from "../screen/SalesDirectScreen/stepOne";
import StepTwoScreen from "../screen/SalesDirectScreen/stepTwo";
import StepThreeScreen from "../screen/SalesDirectScreen/stepThree";

//SALES REDUCER
import { initSalesState, setSalesState, clearSalesState, getSale } from "../reducers/salesReducer";

const salesStateToProps = (state) => {
	return{
		//SALES REDUCER
		s_id: state.salesReducer.s_id,
		sale: state.salesReducer.sale,
	}
}

const salesDispatchToProps = (dispatch) => {
	return{
		//SALES REDUCER
		initSalesState: (payload) => {dispatch(initSalesState(payload))},
		setSalesState: (payload) => {dispatch(setSalesState(payload))},
		clearSalesState: (payload) => {dispatch(clearSalesState(payload))},
		getSale: (payload) => {dispatch(getSale(payload))},
	}
}

export const SalesDirectContainer = connect(salesStateToProps, salesDispatchToProps)(SalesDirectScreen)
export const StepOneContainer = connect(salesStateToProps, salesDispatchToProps)(StepOneScreen)
export const StepTwoContainer = connect(salesStateToProps, salesDispatchToProps)(StepTwoScreen)
export const StepThreeContainer = connect(salesStateToProps, salesDispatchToProps)(StepThreeScreen)
