import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

import * as Common from '../commonStyle';
//name , pw Account Style

export const AppContainer = styled.SafeAreaView`
	background-color: ${Colors.whiteColor};
`
export const AppVersionBox = styled(Common.RadiusBtn)`
	width: 60%;
	min-width: 214px;
	margin-top: 11px;
	margin-bottom: 13px;

`
export const AppLogoImg = styled.Image`
	width: 184;
	height: 84;
	margin: 0 auto;
	margin-bottom: 17;
`
export const YellowBox = styled.TouchableOpacity`
	height: 32;
	justify-content: center;
	padding: 0 20px;
	margin-top: 11;
  	border-radius: 50;
	background-color: ${Colors.mainColor};
	margin-bottom: 14;
`

