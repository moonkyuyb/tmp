import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

import Modal from 'react-native-modal';
import ModalWrap from '../Modal/ModalCommon';

import * as Common from "../../styled/commonStyle";
import ModalStyle from './../../styled/modal/modalStyle';
import PointText from '../../components/common/PointText';
import {ModalWrap, ModalTextCont, ModalPointBox} from '../../styled/modal/modalStyle';

const ModalBasic = props => {
	return (
		<View>
			<Modal isVisible={isModalVisible} style={ModalStyle.Modal}>
				<ModalWrap toggleModal={toggleModal}>
				<ModalTextCont>
					<ModalPointBox>
						<PointText><Common.TextBold14>{"2021-05-01 13:56"}</Common.TextBold14></PointText>
					</ModalPointBox>
					<Common.TextLight14>{"지금 까지 작성한 매물 등록 정보를"}</Common.TextLight14>
					<Common.TextBold14>{"저장하시겠습니까?"}</Common.TextBold14>
				</ModalTextCont>
				</ModalWrap>
			</Modal>

			<Modal isVisible={isModalVisible} style={ModalStyle.Modal}>
				<ModalWrap toggleModal={toggleModal}>
				<ModalTextCont>
					<Common.TextLight14>임시 저장이 완료되었습니다.</Common.TextLight14>
					<PointText><Common.TextBold14>2021-05-01 13:56</Common.TextBold14></PointText>
				</ModalTextCont>
				</ModalWrap>
			</Modal>

			<Modal isVisible={isModalVisible} style={ModalStyle.Modal}>
				<ModalWrap toggleModal={toggleModal}>
				<ModalTextCont>
					<ModalPointBox>
						<PointText><Common.TextBold14>2021-05-01 13:56</Common.TextBold14></PointText>
					</ModalPointBox>
					<Common.TextLight14>임시 저장이 완료되었습니다.{"\n"}이어서 <Common.TextBold14>작성하시겠습니까?</Common.TextBold14></Common.TextLight14>
				</ModalTextCont>
				</ModalWrap>
			</Modal>

		</View>
	);
};
export default ModalBasic;
