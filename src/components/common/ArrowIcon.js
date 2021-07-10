import React from 'react';
import { Platform, style, Image }  from 'react-native';
import * as Common from './../../styled/commonStyle';

export const ArrowIcon = ()  => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_menu_arrow_01.png')} />)
export const ArrowIconS = ()  => (<Image style={{width: 5, height: 9}}  source={require('./../../../assets/img/drawable-xhdpi/bt_complex_arrow.png')} />)
export const ArrowIconSY = ()  => (<Image style={{width: 5, height: 9}}  source={require('./../../../assets/img/drawable-xhdpi/bt_complex_arrow_y.png')} />)

export const FromArrowIcon = () => (
	// Platform.OS != 'ios' ? null: (
		<Common.Image size={24}
			style={{position: 'absolute', top: 6, right: 8}}
			source={require('../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')}
		/>
	// )
)
