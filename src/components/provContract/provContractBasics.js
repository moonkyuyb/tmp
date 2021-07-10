/* COMMON */
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";

/* UI COMPONENTS */
import * as Common from "../../styled/commonStyle";
import { ContractBasicsWrap } from '../../styled/chatContractStyle/contractStyle';

const ContractBasics = () => (
	<ContractBasicsWrap nestedScrollEnabled = {true}>
		<Common.TextLight12 paragraph>
			제 1 조 임차인은 임대인의 동의 없이는 위 부동산의 용도나 구조를 변경하거나 전대 ,임차권 양도 또는 담보제공을 하지 못하며 임대차 목적 이외의 용도로 사용할 수 없다.
			{"\n"}{"\n"}
			제 2 조 임차인이 임대인에게 중도금(중도금이 없을 때는 잔금)을 지불하기 전까지 임대인은 계약금의 배액을 상환하고, 임차인은 계약금을 포기하고 이 계약을 해제할 수 있다.
			{"\n"}{"\n"}
			제 3 조 임대차 계약이 종료된 경우 임차인은 위 부동산을 원상으로 회복하여 임대인에게 반환한다.이러한 경우 임대인은 보증금을 임차인에게 반환하고, 연체 임대료 또는 손해배상금이 있을 때
		</Common.TextLight12>
	</ContractBasicsWrap>
)
export default ContractBasics;