/* COMMON */
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

/* UI COMPONENTS */
import * as Common from '../styled/commonStyle';
import { SignUpLogoImage, SignUpCText, WelcomeTit, SignUpInfoBox, SignUpInfoList, SignUpInfoTextBox } from '../styled/signStyle/signUpSuccessStyle';
import PointText from '../components/common/PointText'

const SignupSuccessScreen = ({signedName, signedUsername, signedDatetime}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	return(
		<Common.ZipandaSafeView>
			<Common.ScrollContainer>
				<SignUpLogoImage source={require('./../../assets/img/drawable-xhdpi/img_logo_en_01.png')} />
				<SignUpCText>
					<WelcomeTit>환영합니다</WelcomeTit>
					<PointText>
						<Common.TextSemiBold20>{signedName}님,</Common.TextSemiBold20>
						<Common.TextLight20>회원가입이 완료되었습니다</Common.TextLight20>
					</PointText>
				</SignUpCText>
				<SignUpInfoBox>
					<SignUpInfoList>
						<Common.Image size={32} source={require('./../../assets/img/drawable-xhdpi/icon_login_id.png')} />
						<SignUpInfoTextBox>
							<Common.TextLight13 marginB={6}>아이디(이메일)</Common.TextLight13>
							<Common.TextSemiBold16>{signedUsername}</Common.TextSemiBold16>
						</SignUpInfoTextBox>
					</SignUpInfoList>
					<SignUpInfoList>
						<Common.Image size={32} source={require('./../../assets/img/drawable-xhdpi/icon_login_calendar.png')} />
						<SignUpInfoTextBox>
							<Common.TextLight13 marginB={6}>가입일자</Common.TextLight13>
							<Common.TextSemiBold16>{signedDatetime}</Common.TextSemiBold16>
						</SignUpInfoTextBox>
					</SignUpInfoList>
				</SignUpInfoBox>
				<Common.GohomeWrap>
					<Common.GoHomeBox onPress={() => navigation.navigate('index')}>
						<Common.Image size={20} source={require('../../assets/img/drawable-xhdpi/icon_home.png')}/>
						<Common.GoHomeText>홈으로</Common.GoHomeText>
					</Common.GoHomeBox>
				</Common.GohomeWrap>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	)
}
export default SignupSuccessScreen;