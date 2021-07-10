import styled from 'styled-components/native';
import styleGuide from '../styleGuide';
import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');

//SaleHeader
export const SaleHeader = styled.View`
	padding: 24px 20px 26px 18px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`