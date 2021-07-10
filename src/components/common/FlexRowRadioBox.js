import React from 'react';
import * as Common from "./../../styled/commonStyle";

const FlexRowRadioBox = (props) => {
	const RadioBtn 			= () => ( <Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_radio_off.png')}/> )
	const RadioBtnActive	= () => ( <Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_radio_on.png')}/> )

	return(
		<Common.FlexRowBtn {...props}>
			{props.value ? <RadioBtnActive/> : <RadioBtn/>}<Common.TextLight14>{props.title?props.title:''}</Common.TextLight14>
		</Common.FlexRowBtn>
	)
}

export default FlexRowRadioBox;