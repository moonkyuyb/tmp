/* COMMON */
import React from "react";
import Modal from "react-native-modal";

/* UI COMPONENTS */
import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';
import { ModalContainer, ModalHeader, ModalTextCont, ModalBtnBox, ModalBtn } from '../../styled/modal/modalStyle';
import { CloseIcon } from "./header";

const AlertModalComponent = ({alertMsg, alertHeader, clearCentralState}) => {

    return(<>
		<Modal isVisible={alertMsg?true:false} style={{justifyContent:'center', alignItems:'center'}}>
			<ModalContainer>
				<ModalHeader>
					<Common.TextSemiBold14>{alertHeader}</Common.TextSemiBold14>
					<Common.TouchableOpacity onPress={()=>{clearCentralState()}}><CloseIcon/></Common.TouchableOpacity>
				</ModalHeader>
				<ModalTextCont>
					<Common.TextBold14>{alertMsg}</Common.TextBold14>
				</ModalTextCont>
				<ModalBtnBox>
					<ModalBtn onPress={()=>{clearCentralState()}}>
						<Common.TextSemiBold14 color={Colors.whiteColor}>확인</Common.TextSemiBold14></ModalBtn>
				</ModalBtnBox>
			</ModalContainer>
		</Modal>
    
    </>)
}
export default AlertModalComponent