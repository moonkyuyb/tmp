

import React from 'react';
import * as Common from './../../styled/commonStyle';

export const CustomSliderMarkerLeft = () 	=> (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_panda_face.png')} />);
export const CustomSliderMarkerRight = () 	=> (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_panda_face.png')} />);

export const SaleDetailTitle = (props) =>{
    return ( 
        <Common.FlexRowBox>
			<Common.TextLight14 marginB={12}>
				<Common.TextSemiBold14 {...props} style={[props.style]}>{props.children}</Common.TextSemiBold14> 
				(여러개 선택이 가능합니다)
			</Common.TextLight14>
        </Common.FlexRowBox>
        )
}

export const SaleDetailTitle2 = (props) =>{
    return ( 
        <Common.FlexRowBox>
			<Common.TextLight14 marginB={12}>
				<Common.TextSemiBold14 {...props} style={[props.style]}>{props.children}</Common.TextSemiBold14></Common.TextLight14>
        </Common.FlexRowBox>
        )
}
