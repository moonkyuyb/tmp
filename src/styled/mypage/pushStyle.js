import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const PushSetBox = styled.View`
	flex-direction: row;
	margin-top: 24;
	height: 46;
	border: 0.5px solid ${Colors.borderColor};
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;
	margin-bottom: 3;
	padding-left: 19;
	padding-right: 13;
`
export const PushIcon = styled.Image`
	position: absolute;
	width: 24;
	height: 24;
	top: 5;
	right: 6;
`
