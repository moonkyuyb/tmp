import React from "react";
import Modal from "react-native-modal";
import { ModalContainer, ModalHeader, ModalTextCont, ModalBtnBox, ModalBtn } from '../../styled/modal/modalStyle';
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "./header";
import * as Common from './../../styled/commonStyle';
import Colors from './../../../assets/colors';

//REDUX
import { showAlertMessage } from "../../reducers/commonReducer";
import { useNavigation } from "@react-navigation/native";

const ModalPopupComponents = ({alertMessage}) => {

	const dispatch = useDispatch()
	// const alertMessage = useSelector((state)=>state.commonReducer.alertMessage)
	const navigator = useNavigation();
	return(<>
		<Modal isVisible={alertMessage?true:false} style={{justifyContent:'center',alignItems:'center'}}>
			<ModalContainer>
				<ModalHeader>
					<Common.TextSemiBold14>{'DEPRECATED'}</Common.TextSemiBold14>
					<Common.TouchableOpacity onPress={()=>{dispatch(showAlertMessage(''))}}><CloseIcon/></Common.TouchableOpacity>
				</ModalHeader>
				<ModalTextCont>
					<Common.TextBold14>{`이 컴포넌트는 더 이상 사용되지 않습니다, AlertModal을 이용해주세요`}</Common.TextBold14>
				</ModalTextCont>
				<ModalBtnBox>
					<ModalBtn onPress={()=>{if(alertMessage=="등록 되었습니다."){navigator.navigate("mainScreen");}else{dispatch(showAlertMessage(''))} }}>
						<Common.TextSemiBold14 color={Colors.whiteColor}  >확인</Common.TextSemiBold14></ModalBtn>
				</ModalBtnBox>
			</ModalContainer>
		</Modal>
	</>)
}

export default ModalPopupComponents