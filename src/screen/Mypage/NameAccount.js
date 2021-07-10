import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Common from '../../styled/commonStyle';
import Colors from '../../../assets/colors';

import {AccountSubHeader } from '../../styled/mypageStyle/CommonSubAccountStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NameAccount = ({myData, handleUpdateName, alertMsg, handleInitUpdateName}) => {
	

	console.log("adfasdfasdfasdfasfasdfsadfasdfsa")
	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [mName, setMName] = useState("");
	const [mID, setMID] = useState("");
	useEffect(()=>{
		
		setMName(myData.m_name);
		handleInitUpdateName();
		AsyncStorage.getItem("mID")
		.then((result)=>{
			setMID(result);
		})
		.catch((err)=>{

		})
		const handleEffect = async (props) => {
			//...
		}

		handleEffect()
	},[])

	useEffect(()=>{
		console.log("alertMsg======================================================");
		console.log(alertMsg);
		if (alertMsg != "") {
			navigation.navigate('account')
		}

	},[alertMsg])

	return(
		<Common.ZipandaSafeView>
            <Common.ScrollContainer>
				<AccountSubHeader>
					<Common.TextLight12>휴대전화 본인인증이 완료된 회원은 이름 변경을 할 수 없습니다.</Common.TextLight12>
				</AccountSubHeader>
				
				<Common.SubTitle marginTN>이름</Common.SubTitle>
{/*
				<Common.ViewBorder bgColor={Colors.bgColor}>
					<Common.TextLight14 color={Colors.textNonColors}>{myData.m_name}</Common.TextLight14>
				</Common.ViewBorder>
*/			}
				<Common.InputBorder defaultValue={myData.m_name} onChangeText={(value)=>{setMName(value)}}  placeholder={'김판다'}/>
			</Common.ScrollContainer>

			<Common.FloatBtn onPress={() =>{ handleUpdateName({m_name:mName, m_id:mID}); }  /*navigation.navigate('joinCompleted')*/ }>
				<Common.TextSemiBold18>확인</Common.TextSemiBold18>
			</Common.FloatBtn>

		</Common.ZipandaSafeView>
	)
}
export default NameAccount;