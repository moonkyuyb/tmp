import React, { useEffect, useState } from 'react';

import{CenterWrap,GoHomeBox,GoHomeText,Image20,TextLight10}from"../../styled/commonStyle";
import{NFGoHomeWrap,CImgBox,CImg,PandaGrey}from"../../styled/networkFailStyle/NetworkFailStyle";

const HomeIcon = () => (<Image20 source={require('../../../assets/img/drawable-xhdpi/icon_home.png')} />)
const Construction = props => {
	return (
		<CenterWrap>
			<CImgBox>
				<CImg source={require('../../../assets/img/drawable-xhdpi/img_construction_panda.png')} />
			</CImgBox>
			<TextLight10>지금 만들고 있어요~</TextLight10>
			<NFGoHomeWrap>
				<GoHomeBox onPress={() => props.navigation.navigate('index')}>
					<HomeIcon />
					<GoHomeText>홈으로</GoHomeText>
				</GoHomeBox>
			</NFGoHomeWrap>
		</CenterWrap>
	);
};
export default Construction;
