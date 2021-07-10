/* COMMON */
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/core';

/* UI COMPONENTS */
import * as Common from "../../styled/commonStyle";
import { ScrollView, Text } from "react-native";
import { ModalPopup } from '../../container/commonContainer';
import { StepOneContainer, StepTwoContainer, StepThreeContainer } from "../../container/salesContainer";
import { StepHeaderWrap, Step, MypageStep, StepNumText, StepText, StepIcon } from "../../styled/sales/salesDirectCommonStyle";
import { useNavigation } from "@react-navigation/core";

/* UTILS */
import { useForm } from "react-hook-form";
import { BackHandler } from "react-native";

const SalesDirectScreen = ({ props, errMsg, token, verifiedToken, currentPage, showAlertMessage, initWriting, getSalesData, getSalesImg }) => {
	//console.log(`errMsg: ${errMsg}`)
	//REACT HOOK FORM
	const { control, handleSubmit, getValues, setValue, clearErrors } = useForm()

	const navigation = useNavigation();
	const hasUnsavedChanges = Boolean(false);
	const route = useRoute();

	const [continueSID, setContinueSID] = useState(0);

	useEffect(() => {
		if (continueSID != 0) {
			getSalesData(continueSID);
			getSalesImg(continueSID);
		}
	}, [continueSID])

	useEffect(

		() => {
			if (route.params.mode == "modi") {
				//continueSID = route.params.s_id;
				setContinueSID(route.params.s_id)
				console.log(`continue sid: ${continueSID}`);

			}

			navigation.addListener('beforeRemove', (e) => {
				console.log("leave page=========!!=========!!=========!!=========!!=========!!=========!!=========!!=========!!");
				initWriting();
				return false;

			}
			)
		}
		,

		[navigation, hasUnsavedChanges]
	);

	const StepIcon = () => (<Common.Image size={8} source={require('../../../assets/img/drawable-xhdpi/icon_arrow_b.png')} />)

	return (<>
		<ModalPopup />
		<Common.ZipandaSafeView>

			<StepHeaderWrap>
				<ScrollView horizontal={true}>
					<Step active={currentPage == 1} modi={currentPage == 3}>
						<Common.FlexBetweenBox>
							<StepNumText>01</StepNumText>
							{currentPage == 1 && (<StepIcon />)}
						</Common.FlexBetweenBox>
						<StepText>등록자 정보</StepText>
					</Step>
					<Step active={currentPage == 2} modi={currentPage == 3}>
						<Common.FlexBetweenBox>
							<StepNumText>02</StepNumText>
							{currentPage == 2 && (<StepIcon />)}
						</Common.FlexBetweenBox>
						<StepText>매물･거래 정보</StepText>
					</Step>

					{route.params.mode == "modi" &&
						<Step active={currentPage == 3} modi={currentPage == 3}>
							<Common.FlexBetweenBox>
								<StepNumText>03</StepNumText>
								{currentPage == 3 && (<StepIcon />)}
							</Common.FlexBetweenBox>
							<StepText>상세 정보</StepText>
						</Step>
					}

				</ScrollView>
			</StepHeaderWrap>



			{currentPage == 1 && <StepOneContainer control={control} handleSubmit={handleSubmit} getValues={getValues} setValue={setValue} clearErrors={clearErrors} mode={route.params.mode} sID={continueSID} />}
			{currentPage == 2 && <StepTwoContainer control={control} handleSubmit={handleSubmit} getValues={getValues} setValue={setValue} clearErrors={clearErrors} mode={route.params.mode} sID={continueSID} />}
			{//route.params.mode == "modi" &&
				currentPage == 3 && <StepThreeContainer control={control} handleSubmit={handleSubmit} getValues={getValues} setValue={setValue} clearErrors={clearErrors} mode={route.params.mode} sID={continueSID} />
			}

		</Common.ZipandaSafeView>
	</>)
}

export default SalesDirectScreen
