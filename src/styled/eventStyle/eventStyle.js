import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';
import styleGuide from '../styleGuide';

const {width, height} = Dimensions.get('screen');
const EventListImage = (Dimensions.get('window').width * 0.54722222);


export const EventListItem = styled.TouchableOpacity`
	
`
export const EventHeader = styled.View`
	padding: 15px 22px 11px 22px;
`
export const SnsBoxS = styled.View`
	flex-direction: row;
	width: 80px;
	justify-content: space-around;
`

export const SubHeaderBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: ${ props => props.eventList ? 12 : styleGuide.Space};
`
export const EventLabel = styled.View`
	width: 43px;
	height: 22px;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.Active ? Colors.mainColor : Colors.textNonColors };
	margin-right: 9px;
	border-radius: 3px;
`
export const EventImage = styled.ImageBackground`
	width: 100%;
	height: ${EventListImage}px;
`
export const EventTextBox = styled.View`
	padding: 20px;
`