import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
export const SwiperContainer = styled.View`
	height: ${windowWidth}px;
	max-height: 500px;
`
export const SliderBox = styled.View`
	height: 100%;
`
export const SliderImg = styled.Image`
	width: 100%;
	height: 100%;
	max-height: 500px;
`
export const PaginationBox = styled.View`
	position: absolute;
	bottom: 13px;
	right: 29px;
`
export const SwiperFullBtn = styled.TouchableOpacity`
	position: absolute;
	bottom: 36px;
	right: 20px;
	z-index: 9;
`
