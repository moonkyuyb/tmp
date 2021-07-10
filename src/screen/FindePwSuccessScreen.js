import React, { useEffect, useState } from 'react';
import { View,} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import * as Common from './../styled/commonStyle';
import PointText from '../../src/components/common/PointText'
import Colors from '../../assets/colors';
import {AccountSubHeader} from '../styled/mypageStyle/CommonSubAccountStyle';

const FindPwCompleted = () => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	useEffect(()=>{
		const handleEffect = async (props) => {
			//...
		}
		handleEffect()
	},[])
	
	return(
		<Common.ZipandaSafeView>
			<Common.ScrollContainer>
				<AccountSubHeader paddingB={17}>
					<Common.FlexRowBox>
						<Common.Image size={58} marginR={14} source={require('./../../assets/img/drawable-xhdpi/icon_mail_l_y.png')} />
						<Common.FlexView>
							<Common.TextSemiBold14 marginB={2}>회원가입정보가 확인되었습니다.</Common.TextSemiBold14>
							<PointText><Common.TextLight18>비밀번호 찾기 메일 발송완료</Common.TextLight18></PointText>
						</Common.FlexView>
					</Common.FlexRowBox>
				</AccountSubHeader>
				<Common.View paddingL={10} paddingR={10}>
					<Common.TextLight14 paragraph>
						입력하신 이메일 주소로 <Common.TextBold14 paragraph>비밀번호 재설정 링크가 발송</Common.TextBold14>되었습니다. {"\n"}
						수신된 이메일을 확인하여 주시기 바랍니다.{"\n"}
						<Common.TextBold14 paragraph>메일은 10분 내로 발송</Common.TextBold14>됩니다. 메일을 받지 못하셨다면 
						<Common.TextBold14 paragraph>스팸 메일함과 메일함 용량이 가득 차지 않았는지 확인</Common.TextBold14>해주세요.
					</Common.TextLight14>
				</Common.View>
				<Common.GohomeWrap>
					<Common.GoHomeBox onPress={() => navigation.navigate('resetPw')}>
						<Common.Image size={20} source={require('./../../assets/img/drawable-xhdpi/icon_home.png')}/>
						<Common.GoHomeText>홈으로</Common.GoHomeText>
					</Common.GoHomeBox>
				</Common.GohomeWrap>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	)
}
export default FindPwCompleted;