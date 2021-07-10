/* COMMON */
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

/* UI COMPONENTS */
import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../assets/colors';

const SaleTypeScreen = (props) => {

	/* XXX:과장님.. 보고 끝나고.. 바로 원상복구 해둘게요ㅠ */
	const bldgList = [
		{bldgStyle:'SaleType_1', bldgStyleName:'아파트'},
		{bldgStyle:'SaleType_2', bldgStyleName:'한옥주택'},
		{bldgStyle:'SaleType_3', bldgStyleName:'재개발'},
		{bldgStyle:'SaleType_4', bldgStyleName:'원룸'},
		{bldgStyle:'SaleType_5', bldgStyleName:'고시원'},
		{bldgStyle:'SaleType_6', bldgStyleName:'상가'},
		{bldgStyle:'SaleType_7', bldgStyleName:'사무실'},
		{bldgStyle:'SaleType_8', bldgStyleName:'공장/창고'},
		{bldgStyle:'SaleType_9', bldgStyleName:'토지'},
		{bldgStyle:'SaleType_10', bldgStyleName:'지식산업센터'},
		{bldgStyle:'SaleType_11', bldgStyleName:'오피스텔'},
		{bldgStyle:'SaleType_12', bldgStyleName:'빌라'},
		{bldgStyle:'SaleType_13', bldgStyleName:'아파트분양권'},
		{bldgStyle:'SaleType_14', bldgStyleName:'오피스텔분양권'},
		{bldgStyle:'SaleType_15', bldgStyleName:'재건축'},
		{bldgStyle:'SaleType_16', bldgStyleName:'전원주택'},
		{bldgStyle:'SaleType_17', bldgStyleName:'단독/다가구'},
		{bldgStyle:'SaleType_18', bldgStyleName:'상가주택'}
	]
	const ChkIcon =() => (<Image style={{width: 20, height: 20}} source={require('../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')}/>);

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [bldgStyle, setBldgStyle] = useState(route.params.bldgStyle)
	const onChange = route.params.onChange
	const setBldgStyleName 	= route.params.setBldgStyleName
	const setSaleType		= route.params.setSaleType

	const SalesTypeItem = ({item}) => {
		return(
			<TouchableOpacity
				style={[bldgStyle == item.bldgStyle ? styles.buildingListActive : styles.buildingList]}
				onPress={()=>{
					onChange(item.bldgStyle);
					setBldgStyleName(item.bldgStyleName);
					setSaleType(item.bldgStyle);

					route.params.setValue("s_sale_type", item.bldgStyle)
					route.params.setValue("s_sale_name", item.bldgStyleName)

					navigation.goBack();
				}}
			>
				<Text style={[bldgStyle == item.bldgStyle ? styles.buildingTextActive : styles.buildingText]} >{item.bldgStyleName}</Text>{bldgStyle == item.bldgStyle && <ChkIcon />}
			</TouchableOpacity>
		)
	}
	return(
		<FlatList
			data={bldgList} 
			renderItem ={ SalesTypeItem } 
			keyExtractor = {(item)=>item.bldgStyle}
		/>
	)
}

const styles = StyleSheet.create({
	buildingList:{
		flexDirection: 'row',
		paddingHorizontal: 20,
		borderBottomColor: Colors.borderLightColors,
		borderBottomWidth: 0.5,
		height: 37,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buildingListActive:{
		flexDirection: 'row',
		paddingHorizontal: 20,
		borderBottomColor: Colors.borderLightColors,
		borderBottomWidth: 0.5,
		height: 37,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.mainColor,
	},
	buildingText:{
		color: Colors.blackColor,
		fontSize: 12,
	},
	buildingTextActive:{
		color: Colors.blackColor,
		fontSize: 12,
	}
})

export default SaleTypeScreen;
