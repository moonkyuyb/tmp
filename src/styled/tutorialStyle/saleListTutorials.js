import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';
import * as Common from './../commonStyle';

const {width, height} = Dimensions.get('screen');
const ZipSaleBtnWidth = (Dimensions.get('window').width /2 - 30);


//02
export const SaleTutorialBox01 = styled.View`
	padding-top: 130px;
`
export const FilterBtnWrap = styled.View`
	position: absolute;
	right: 0;
	top: 40px;
	width: 53px;
	height: 92px;
	border: 2px solid ${Colors.mainColor};
	border-right-width: 0;
	padding: 2px 0 2px 2px;
`;
export const FilterBtn = styled.View`
	justify-content: center;
	align-items: center;
	width: 48px;
 	height: 84px;
	background-color: ${Colors.mainColor};
`;
export const ArrowIcon01 = styled.Image`
	position: absolute;
	top: 100px;
	right: 20px;
`;
export const ContText = styled(Common.TextSemiBold18)`
	color: ${Colors.mainColor};
	line-height: 22px;
	margin-top: 27px;
	text-align: ${props => props.center ? 'center' : 'left'};
`;
export const AppScreenImg = styled.Image`
	width: 202px;
  	height: 359px;
	margin-top: 16px;
`;


//02
export const SaleTutorialBox02 = styled.View`
	padding-top: 200px;
`;
export const ArrowIcon02 = styled.Image`
	width: 31px;
	height: 76px;
	left: 40px;
	margin-top: 10px;

`;
export const CircleBox = styled.View`
	justify-content: center;
	align-items: center;
 	width: 83px;
 	height: 83px;
	border-radius: 50px;
	background-color: ${Colors.mainColor};
`;


//03
export const SaleTutorialBox03 = styled.View`
	/* background-color: ${Colors.whiteColor}; */
	flex: 1;
	width: 100%;
	justify-content: flex-end;

`;
export const TutorialZipList = styled.View`
	background-color: ${Colors.whiteColor};
	padding: 0 20px;
`;
export const TutorialZipHeaderBtn = styled.View`
	flex-direction: row;
	background-color: ${Colors.whiteColor};
	justify-content: space-between;
`;
export const ArrowIcon03 = styled.Image`
	width: 31px;
  	height: 76px;
	margin: 10px 0;
`;










