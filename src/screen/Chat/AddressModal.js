import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';

import * as Common from "../../styled/commonStyle";
import { ModalSubTitleBox,ModalSubTitle,ModalAddressCont,ModalSearchInputBox,ModalInput,AddressGreyBox,AddressList,PostCodeBox,PostCodeOld,AddressBox,AddressLabel,LabelTit,AddressTit} from '../../styled/modal/modalStyle';

const AddressModal = props => {
	
	const [addressData, setAddressData] = useState([])

	const SearchBtn = () => (<TouchableOpacity><Common.Image24 source={require('../../../assets/img/drawable-xhdpi/icon_search_b.png')}/></TouchableOpacity>)
	
	useEffect(()=>{
		const handleEffect = async (props) => {
			setAddressData([
				{ postCode : '03171', postCodeOld : '110-821' , address01: '서울특별시 종로구 세종대로 171 (세종로)',address02:'서울특별시 종로구 세종로 81-1' },
				{ postCode : '03172', postCodeOld : '110-822' , address01: '서울특별시 종로구 세종대로 172 (세종로)',address02:'서울특별시 종로구 세종로 81-2' },
				{ postCode : '03173', postCodeOld : '110-823' , address01: '서울특별시 종로구 세종대로 173 (세종로)',address02:'서울특별시 종로구 세종로 81-3' },
				{ postCode : '03174', postCodeOld : '110-824' , address01: '서울특별시 종로구 세종대로 174 (세종로)',address02:'서울특별시 종로구 세종로 81-4' },
				{ postCode : '03175', postCodeOld : '110-825' , address01: '서울특별시 종로구 세종대로 175 (세종로)',address02:'서울특별시 종로구 세종로 81-5' },
				{ postCode : '03176', postCodeOld : '110-826' , address01: '서울특별시 종로구 세종대로 176 (세종로)',address02:'서울특별시 종로구 세종로 81-6' },
			])
		}
		handleEffect()
	},[])
	
	
	const AddressItem=({item})=>{
		return(
			<AddressList>
				<PostCodeBox>
					<Common.TextMedium14>{item.postCode} <PostCodeOld>{item.postCodeOld}</PostCodeOld></Common.TextMedium14>
				</PostCodeBox>
				<View>
					<AddressBox>
						<AddressLabel yellow><LabelTit>도로명</LabelTit></AddressLabel>
						<AddressTit>{item.address01}</AddressTit>
					</AddressBox>
					<AddressBox>
						<AddressLabel><LabelTit>지번</LabelTit></AddressLabel>
						<AddressTit>{item.address02}</AddressTit>
					</AddressBox>
				</View>
			</AddressList>
		);
	}
	return (
		<View>
			<ModalSubTitleBox>
				<ModalSubTitle>주소입력 <Common.TextLight11>(입력후 아래 주소를 선택해주세요)</Common.TextLight11></ModalSubTitle>
				<ModalSearchInputBox>
					<ModalInput placeholder={'주소를 입력해주세요'} />
					<SearchBtn/>
				</ModalSearchInputBox>
			</ModalSubTitleBox>
			<ModalAddressCont>
				<AddressGreyBox contentContainerStyle={{ paddingVertical: 12 }}>
					<FlatList
						data={ addressData } 
						renderItem ={ AddressItem } 
						keyExtractor={ item=> item.id }               
					/>
				</AddressGreyBox>
			</ModalAddressCont>
		</View>
	);
};
export default AddressModal;