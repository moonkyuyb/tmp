import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

const {width, height} = Dimensions.get('screen');
const CloseBtnWidth =  (Dimensions.get('window').width /2 - 1);

export const TutorialWrap = styled.SafeAreaView`
	width: 100%;
	flex: 1;
`
export const TutorialCont = styled.View`
	width: 100%;
	flex: 1;
	align-items: ${props => props.center? 'center' : 'flex-start'};
`
export const TopCloseWrap = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`
export const CloseBtn = styled.TouchableOpacity`
	background-color: ${Colors.mainColor};
	width: ${CloseBtnWidth};
	align-items: ${props => props.left ? 'flex-end' : 'flex-start'};
	justify-content: center;
	padding: 0 20px;
	height: 44px;
`


export const  NextPageBtnWrap = styled.View`
	position: absolute;
	width: 100%;
	top: 37px;
	justify-content: center;
	z-index: 99999999;
`
export const NextPageBtn = styled.TouchableOpacity`
	
	flex-direction: row;
	width: 154px;
	height: 42px;
	border-radius: 50px;
	border: ${styleGuide.BorderLineWidth} solid ${Colors.mainColor};
	justify-content: space-between;
	align-items: center;	
	padding: 0 16px 0 20px;
	margin: 0 auto;
`
export const NextPageBtnText = styled(Common.TextSemiBold16)`	
	color: ${Colors.whiteColor};
`
