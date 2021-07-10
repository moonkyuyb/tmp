/* COMMON */
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

/* UI COMPONENTS */
import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../assets/colors';

const BuildingTypeScreen = (props) => {

	/* XXX:과장님.. 보고 끝나고.. 바로 원상복구 해둘게요ㅠ */
	const bldgList = [
		{bldgType:'BdType_1', bldgTypeName:'단독주택'},
		{bldgType:'BdType_2', bldgTypeName:'공동주택'},
		{bldgType:'BdType_3', bldgTypeName:'제 1종 근린생활시설'},
		{bldgType:'BdType_4', bldgTypeName:'제 2종 근린생활시설'},
		{bldgType:'BdType_5', bldgTypeName:'문화 및 집회 시설'},
		{bldgType:'BdType_6', bldgTypeName:'종교시설'},
		{bldgType:'BdType_7', bldgTypeName:'판매시설'},
		{bldgType:'BdType_8', bldgTypeName:'운수시설'},
		{bldgType:'BdType_9', bldgTypeName:'의료시설'},
		{bldgType:'BdType_10', bldgTypeName:'교육연구시설'},
		{bldgType:'BdType_11', bldgTypeName:'노유자(老幼:노인 및 어린이)시설'},
		{bldgType:'BdType_12', bldgTypeName:'수련시설'},
		{bldgType:'BdType_13', bldgTypeName:'운동시설'},
		{bldgType:'BdType_14', bldgTypeName:'업무시설'},
		{bldgType:'BdType_15', bldgTypeName:'숙박시설'},
		{bldgType:'BdType_16', bldgTypeName:'위락(慰)시설'},
		{bldgType:'BdType_17', bldgTypeName:'공장'},
		{bldgType:'BdType_18', bldgTypeName:'창고시설'},
		{bldgType:'BdType_19', bldgTypeName:'위험물 저장 및 처리 시설'},
		{bldgType:'BdType_20', bldgTypeName:'자동차 관련 시설'},
		{bldgType:'BdType_21', bldgTypeName:'동물 및 식물 관련 시설'},
		{bldgType:'BdType_22', bldgTypeName:'자원순환 관련 시설'},
		{bldgType:'BdType_23', bldgTypeName:'교정(橋正) 및 군사 시설'},
		{bldgType:'BdType_24', bldgTypeName:'방송통신시설'},
		{bldgType:'BdType_25', bldgTypeName:'발전시설'},
		{bldgType:'BdType_26', bldgTypeName:'묘지 관련 시설'},
		{bldgType:'BdType_27', bldgTypeName:'관광 휴게시설'},
		{bldgType:'BdType_28', bldgTypeName:'장례시설'},
		{bldgType:'BdType_29', bldgTypeName:'야영장 시설'},
		{bldgType:'BdType_30', bldgTypeName:'미등기건물'},
		{bldgType:'BdType_31', bldgTypeName:'그 밖에 토지의 정착물'}
	]
	const ChkIcon =() => (<Image style={{width: 20, height: 20}} source={require('../../assets/img/drawable-xhdpi/img_regist_bullit_b.png')}/>);

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [bldgType, setBldgType] = useState(route.params.bldgType)
	const onChange = route.params.onChange
	const setBldgTypeName = route.params.setBldgTypeName


	const BuildingItem = ({item}) => {
		return(
			<TouchableOpacity
				style={[bldgType == item.bldgType ? styles.buildingListActive : styles.buildingList]}
				onPress={()=>{
					onChange(item.bldgType)
					route.params.setValue("s_building_type", item.bldgType)
					route.params.setValue("s_bld_name", item.bldgTypeName)
					
					setBldgTypeName(item.bldgTypeName)
					navigation.goBack()
				}}
			>
				<Text style={[bldgType == item.bldgType ? styles.buildingTextActive : styles.buildingText]}>{item.bldgTypeName}</Text>{bldgType == item.bldgType && <ChkIcon />}
			</TouchableOpacity>
		)
	}
	return(
		<FlatList
			data={bldgList} 
			renderItem ={ BuildingItem } 
			keyExtractor = {(item)=>item.bldgType}
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

export default BuildingTypeScreen;





