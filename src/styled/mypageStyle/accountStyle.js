import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import styleGuide from '../styleGuide';

export const AccountHeader = styled.View`
	justify-content: center;
	align-items: center;
	padding-top: 25px;
	padding-bottom: 20px;
`
// 프로필사진 설정
export const HeaderImgBtn = styled.TouchableOpacity`
	margin-bottom: 12px;
`
export const ProfileWrap = styled.View`
	width: 72px;
	height: 72px;
	border-radius: 50px;
	box-shadow: ${styleGuide.BoxShadow};
`
export const ProfileImg = styled.Image`
	width: 72px;
	height: 72px;
	border-radius: 50px;
	z-index: 99;
`
export const ProfileNonImg = styled(ProfileImg)`
	position: absolute;	
`
export const CameraIcon = styled.Image`
	position: absolute;	
	width: 24px;
	height: 24px;
	border-radius: 50px;
	bottom: 0;
	right: 0;
	z-index: 9999;
	box-shadow: ${styleGuide.BoxShadow};
`
// 
export const AccountBox = styled.View`
	border-top-width: ${styleGuide.BorderLineWidth};
	border-top-color: ${Colors.blackColor};
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.blackColor};
	padding-top: 8px;
`
export const ListItem = styled.View`
	padding-left: 8px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderColor};
	min-height: 48px;
	padding: 11px 0;
`
export const ListItemBtn = styled.TouchableOpacity`
	padding-left: 8;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom-width: ${styleGuide.BorderLineWidth};
	border-bottom-color: ${Colors.borderColor};
	min-height: 48px;
	padding: 11px 0;
`
export const TimeSetBox = styled.View`
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	margin-right: 8px;
`
