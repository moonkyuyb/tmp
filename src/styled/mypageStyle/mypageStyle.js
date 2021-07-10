import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const MypageHeader = styled.View`
	padding-top: 25px;
	padding-bottom: 25px;
`
export const EmailBox = styled.View`
	padding-top: 8px;
`
export const MypageYellowBox = styled.View`
	padding-top: 8px;
`
export const YellowBtn = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	padding: 12px 14px;
	align-items: center;
	background-color: ${Colors.mainColor};
	border-radius : 8px;
	height: 46px;
	margin-bottom: 2px;
`
export const MypageListBox = styled.View`
	margin-top: 17px;
`
export const ListItem = styled.TouchableOpacity`
	padding-right: 9px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: ${props=> props.borderN ? 0 : styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderColor};
	padding: 12px 0;
`
