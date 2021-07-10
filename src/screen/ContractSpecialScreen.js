/* COMMON */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from '@react-navigation/native';

/* UTILS */
import _ from "lodash";
import { getCodes } from "../reducers/codeReducer";

/* UI COMPONENTS */
import { Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import * as Common from './../styled/commonStyle';
import Colors from '../../assets/colors';

import { Container, ScrollContainer20B, TextLight11, TextBold16, BottomBtn2Box, BottomBtn2, TextLight12,  } from"../styled/commonStyle";
import { HeaderBox, SpecialGreyBox, CollapseWrap, CollapseBox } from"../styled/contractSpecialStyle";

const ContractSpecialScreen = () => {

	//HANDLE REDUCER DISPATCH
	const dispatch = useDispatch()
	const codes = useSelector(state=>state.codeReducer.codes)

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATE
	const [ specialContractList, setSpecialContractList ] = useState(route?.params?.contract_special)

	//HANDLE EFFECTS
	useEffect(()=>{
		dispatch(getCodes('special_agreement'))
	},[])

	//UI COMPONENTS
	const ChkBtn = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_off.png')} />)
	const ChkBtnActive = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_combo_on.png')} />)
	const ArrowIconActive = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_select_drop.png')} />)
	const ArrowIcon = () => (<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_arrow_select_b.png')} />)

	return(<>
		<Common.ZipandaSafeView>
		 	{/* <Button title="TEST2" onPress={()=>{console.log(specialContractList);}}/> */}
			<Common.ScrollContainer>
			{codes?.special_agreement?.map(item=>{
				const [expended, setExpended] = useState(false)
				const checked = _.findIndex(specialContractList, i=>i==item.value) < 0 ? false : true
				return(
					<CollapseWrap key={item.value}>
						<CollapseBox>
							<Collapse isExpanded={expended} onToggle={collapsed=>setExpended(collapsed)}>
								<CollapseHeader >
									<HeaderBox>
										<Common.FlexRowBox>
											<TouchableOpacity onPress={()=>{
												const newList = Object.assign([],specialContractList)
												if( _.remove(newList, i=>i==item.value).length == 0 ){ 
													newList.push(item.value)
												}
												setSpecialContractList(newList)
											}}>
											{checked ? (<ChkBtnActive/>) : (<ChkBtn/>)}
											</TouchableOpacity>	
											<Common.TextSemiBold14>{item.label}</Common.TextSemiBold14>
										</Common.FlexRowBox>
										{expended? (<ArrowIconActive/>): (<ArrowIcon/>)}
									</HeaderBox>
								</CollapseHeader>
								<CollapseBody>
									<SpecialGreyBox><Common.TextLight14 paragraph>{item.content}</Common.TextLight14></SpecialGreyBox>
								</CollapseBody>
							</Collapse>
						</CollapseBox>
					</CollapseWrap>
				)
			})}
			</Common.ScrollContainer>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss onPress={()=>{route?.params?.onChange(specialContractList);navigation.goBack()}}>
					<Common.TextSemiBold18>확인</Common.TextSemiBold18>
				</Common.FloatBtnsss>
				<Common.FloatBtnsss btnColor={Colors.blackColor} onPress={()=>{navigation.goBack()}}>
					<Common.TextSemiBold18 color={Colors.whiteColor}>취소</Common.TextSemiBold18>
				</Common.FloatBtnsss>
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	</>)
}

export default ContractSpecialScreen