/* COMMON */
import { connect } from 'react-redux';

/* SCREEN & COMPONENTS */
import SampleScreen from "../screen/SampleScreen";

//SAMPLE REDUCER
import { getSample } from "../reducers/sampleReducer";

const sampleStateToProps = (state) => {
	return({
		//SAMPLE REDUCER
		sample: state.sampleReducer.sample
	})
}

const sampleDispatchToProps = (dispatch) => {
	return({
		//SAMPLE REDUCER
		getSample: (payload) => {dispatch(getSample(payload))},
	})
}

export const SampleContainer = connect(sampleStateToProps, sampleDispatchToProps)(SampleScreen)