import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

const {width, height} = Dimensions.get('screen');
const CloseBtnWidth =  (Dimensions.get('window').width /2 - 1);

export const TutorialChatContMenu = styled.View`
	background-color: ${Colors.whiteColor};
	height: 77px;
	margin-top: 84px;
`
export const ArrowIcon = styled.Image`
	margin: 10px 0;
	width: 109px;
  	height: 109px;
`
export const ChatPopupWrap = styled.View`
	margin-bottom: 48px;
`
export const ContTextWrap = styled.View`
	flex: 1;
	justify-content: center;
`
export const ContText = styled(Common.TextSemiBold18)`
	color: ${Colors.mainColor};
	line-height: 22px;
	text-align: center;
`