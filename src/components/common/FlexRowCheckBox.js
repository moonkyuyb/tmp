import React from 'react';
import * as Common from "./../../styled/commonStyle";

const FlexRowCheckBox = (props) => {
	const ChkBtn 		= () => ( <Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_combo_off.png')}/> )
	const ChkBtnActive	= () => ( <Common.Image size={24} source={require('../../../assets/img/drawable-xhdpi/bt_combo_on.png')}/> )

	return(
		<Common.FlexRowBtn {...props}>
			{props.value ? <ChkBtnActive/> : <ChkBtn/>}
			<Common.TextLight14 multiline={true}>{props.title?props.title:''}</Common.TextLight14>
		</Common.FlexRowBtn>
	)
}

export default FlexRowCheckBox;