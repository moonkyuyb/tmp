import React, { useEffect, useState } from 'react';

import{FlexRowBox,Image28,TextBold11,TextLight12}from"../../styled/commonStyle";
import{ModalCont,ModalLabelBtnBox,MLabelBtn,UnitBtn,UnitIcon}from"../../styled/modal/modalStyle";
const ZzimDanjiI02Modal = props => {

	const [unit, setUnit] = useState(true)

	useEffect(()=>{
		const handleEffect = async (props) => {
		}
		handleEffect()
	},[])
	
	const UnitIconP = () => (<UnitIcon source={require('../../../assets/img/drawable-xhdpi/bt_area_p.png')} />)
	const UnitIconA = () => (<UnitIcon source={require('../../../assets/img/drawable-xhdpi/bt_area_a.png')} />)
	return (
		<ModalCont>
			<UnitBtn onPress={() => { setUnit (!unit)}}>
				{ unit ? <UnitIconA /> : <UnitIconP />}<TextBold11>단위 변경</TextBold11>
			</UnitBtn>
			<ModalLabelBtnBox>
				<MLabelBtn active><TextLight12>전체면적</TextLight12></MLabelBtn>
				<MLabelBtn><TextLight12>43A ㎡</TextLight12></MLabelBtn>
				<MLabelBtn><TextLight12>49B ㎡</TextLight12></MLabelBtn>
				<MLabelBtn><TextLight12>81C ㎡</TextLight12></MLabelBtn>
			</ModalLabelBtnBox>
		</ModalCont>
	);
};
export default ZzimDanjiI02Modal;