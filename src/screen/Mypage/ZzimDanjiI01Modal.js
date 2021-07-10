import React, { useEffect, useState } from 'react';

import{TextLight12}from"../../styled/commonStyle";
import{ModalCont,ModalLabelBtnBox,MLabelBtn}from"../../styled/modal/modalStyle";

const ZzimDanjiI01Modal = props => {

	useEffect(()=>{
		const handleEffect = async (props) => {
		}
		handleEffect()
	},[])
	
	return (
		<ModalCont>
			<ModalLabelBtnBox>
				<MLabelBtn><TextLight12>전체</TextLight12></MLabelBtn>
				<MLabelBtn><TextLight12>101동</TextLight12></MLabelBtn>
				<MLabelBtn><TextLight12>102동</TextLight12></MLabelBtn>
				<MLabelBtn><TextLight12>103동</TextLight12></MLabelBtn>
				<MLabelBtn active><TextLight12>104동</TextLight12></MLabelBtn>
				<MLabelBtn active><TextLight12>105동</TextLight12></MLabelBtn>
				<MLabelBtn active><TextLight12>106동</TextLight12></MLabelBtn>
				<MLabelBtn active><TextLight12>107동</TextLight12></MLabelBtn>
			</ModalLabelBtnBox>
		</ModalCont>
	);
};
export default ZzimDanjiI01Modal;