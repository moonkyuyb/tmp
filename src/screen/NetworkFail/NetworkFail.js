import React, { useEffect, useState } from 'react';

import * as Common from './../../styled/common';
import{NFGoHomeWrap,NFImgBox,NFImg,PandaGrey}from"../../styled/networkFailStyle/NetworkFailStyle";

const ReroadIcon = () => (<Common.Image size={20} source={require('../../../assets/img/drawable-xhdpi/icon_reload.png')} />)
const NetworkFail = props => {
	return (
		<Common.ZipandaSafeView>
			<Common.VerticalCenter>
				<NFImgBox>
					<PandaGrey />
					<NFImg source={require('../../../assets/img/drawable-xhdpi/img_panda_delay.png')} />
				</NFImgBox>
				<Common.TextLight14>지금 가고있어요~</Common.TextLight14>
				<NFGoHomeWrap>
					<Common.GoHomeBox>
						<Common.ReroadIcon />
						<Common.GoHomeText>새로고침</Common.GoHomeText>
					</Common.GoHomeBox>
				</NFGoHomeWrap>
			</Common.VerticalCenter>
		</Common.ZipandaSafeView>
	);
};
export default NetworkFail;
