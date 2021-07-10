
import React from 'react';
import { Options, OptionActives, OptionActivesView } from './../../styled/sales/filterStyle';
import * as Common from './../../styled/commonStyle';

const MoreViewIcon		 = () => (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)
//화살표 아이콘 있는 option
export const OptionArrow = (props) =>{
    return ( 
		<Options optionArrow marginBN optionWhite {...props}>
			<Common.TextLight14 >{props.children}</Common.TextLight14><MoreViewIcon/>
		</Options>
    )
}
export const OptionArrowActive = (props) =>{
    return ( 
		<OptionActives optionArrow marginBN {...props}>
			<Common.TextLight14 >{props.children}</Common.TextLight14><MoreViewIcon/>
		</OptionActives>
    )
}
//option
export const Option = (props) =>{
    return ( 
		<Options {...props}>
			<Common.TextLight14 >{props.children}</Common.TextLight14>
		</Options>
    )
}
export const OptionActive = (props) =>{
    return ( 
		<OptionActives {...props}>
			<Common.TextLight14 >{props.children}</Common.TextLight14>
		</OptionActives>
	)
}
//option View
export const OptionActiveView = (props) =>{
    return ( 
		<OptionActivesView {...props}>
			<Common.TextLight14 >{props.children}</Common.TextLight14>
		</OptionActivesView>
	)
}


