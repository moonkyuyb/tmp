import React from 'react';
import Colors from '../../../assets/colors';
import styled from 'styled-components/native';
import * as Common from "./../../styled/commonStyle";

export const PointText = (props) => (
	<PointTextWrap>
		<PointBackground>
			<PointLine/><Common.Text {...props}>{props.children}</Common.Text>
		</PointBackground>
	</PointTextWrap>
)

export const PointTextWrap = styled.View`
	align-items:flex-start;
	flex-direction: row;
`
export const PointBackground = styled.View`
	background-color: ${Colors.mainColor};
`
export const PointLine = styled.View`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 60%;
	background-color: ${Colors.whiteColor};
`
export default PointText;