import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

export const NoticeHeader = styled.View`
	padding: 15px 0;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.boxlineColors};
`
export const NoticeHeaderTit = styled(Common.TextMedium15)`
	padding-right: 20px;
	flex: auto;
`
export const HeaderSubTit = styled(Common.TextMedium12)`
	color: ${Colors.chatNoticeColors};
	padding-top: ${styleGuide.Space};

`
export const GreyBox = styled.View`
	background-color: ${Colors.bgColor};
	padding: 20px;
	border-bottom-width: 0.5;
	border-bottom-color: ${Colors.boxlineColors};
`
export const GreyBoxTit = styled(Common.TextLight14)`
	line-height: 18px;
`

export const AddMoreBox = styled.View`
	justify-content: center;
	align-items: center;
	margin: 24px 0;
`
export const AddMoreBtn = styled.TouchableOpacity`
	width: 160px;
	height: 40px;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background-color: ${Colors.mainColor};
	border-radius: 8;

`
export const AddIconS = styled.Image`
	width: 24;
	height: 24;
	margin-right: 4;
`

