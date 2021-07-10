/* COMMON */
import React, { useEffect, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import styled from "styled-components";

/* UTILS */
import { Controller, useForm } from "react-hook-form";
import _ from "lodash";

/* UI COMPONENTS */
import { Button } from "react-native";
import { ModalPopup } from "../container/commonContainer";
import Colors from "../../assets/colors";

const RoadApiTestScreen = ({
	roadApiParams, roadApiResultsCommon, roadApiResultsJuso, roadApiPagination, roadApiIndicator, roadApiSelectedJuso,
	showAlertMessage, roadApiInit, roadApiCall, roadApiHandleSelect,
}) => {

	//USE EFFECT
	useEffect(()=>{
		if(roadApiResultsCommon && roadApiResultsCommon.errorCode != '0'){
			showAlertMessage(roadApiResultsCommon.errorMessage)
		}
	},[roadApiResultsCommon])

	//REACT HOOK FORM
	const { control, handleSubmit } = useForm()
	const onValid = (data) => {
		console.log(`✅VALIDATON OK`);
		roadApiCall(data)
	}
	const onInvalid = (err) => {
		console.log(`⏬VALIDATON FAIL`);
		console.log(err);
			 if(err.keyword) { showAlertMessage(err.keyword.message) }
		else if(err) { showAlertMessage(`입력 내용을 다시 확인해주세요.`) }
	}

	//UI STATE
	const [addrDetail, setAddrDetail] = useState('')

	//REDUCER STATE

	//UI FUNCTION
	function handleApiCall(params){
		// console.log(`💬현재 roadApiParams`);
		// console.log(roadApiParams);
		// console.log(`💬추가할 params`);
		// console.log(params);
		// console.log(`✅결과물`);
		// console.log(Object.assign({},roadApiParams,params));

		roadApiCall(Object.assign({},roadApiParams,params))
	}

	//UI COMPONENTS
	const PaginationBtn = styled.TouchableOpacity`
		width:32px; height:22px; margin: 0 1.5px;
		background-color: ${Colors.mainColor};
		justify-content:center; align-items:center;
	`
	const PaginationPages = (props) => (<PaginationBtn {...props}>{props.children}</PaginationBtn>)
	const PaginationPagesGray = (props) => (<PaginationBtn {...props} style={{backgroundColor:Colors.btnGreyColors}}>{props.children}</PaginationBtn>)

	//RENDER SCREEN
	return (<>
		<SafeAreaView style={{padding:10}}>
			<ModalPopup/>
			<View style={{flexDirection:'row', height:38}}>
				<Text style={{flexBasis:100, textAlign:'center', textAlignVertical:'center'}}>주소 입력</Text>
				<Controller
					control={control} name={`keyword`} defaultValue={``}
					render={({field})=>( <TextInput style={{flex: 1,backgroundColor:'#FFF', marginRight:8, height:38}} value={field.value} onChangeText={field.onChange} /> )}
				/>
				<Button title="우편번호 검색" onPress={handleSubmit(onValid, onInvalid)}/>
			</View>
			<FlatList
				data={roadApiResultsJuso} keyExtractor={(item,index)=>index.toString()}
				style={{height:145,marginTop:8,backgroundColor:'#FFF'}}
				renderItem={({item,index})=>(
					<TouchableOpacity onPress={()=>{roadApiHandleSelect(item)}} style={{padding:10, backgroundColor:index%2==1&&'#DDD'}}>
						<Text style={{marginBottom:4}}>도로명주소: {item.roadAddr}</Text>
						<Text>지번주소: {item.jibunAddr}</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', height:36}}>
				{roadApiPagination?.hasFirstBtn && (<PaginationPagesGray onPress={()=>{handleApiCall({currentPage:roadApiPagination.firstPage})}}><Text>{`<<`}</Text></PaginationPagesGray>)}
				{roadApiPagination?.hasPrevBtn && (<PaginationPagesGray onPress={()=>{handleApiCall({currentPage:roadApiPagination.prevPage})}}><Text>{`<`}</Text></PaginationPagesGray>)}
				{roadApiPagination?.pages?.map(item=>(
					<PaginationPages onPress={()=>{handleApiCall({currentPage:item})}} key={item}><Text>{item}</Text></PaginationPages>
				))}
				{roadApiPagination?.hasNextBtn && (<PaginationPagesGray onPress={()=>{handleApiCall({currentPage:roadApiPagination.nextPage})}}><Text>{`>`}</Text></PaginationPagesGray>)}
				{roadApiPagination?.hasLastBtn && (<PaginationPagesGray onPress={()=>{handleApiCall({currentPage:roadApiPagination.lastPage})}}><Text>{`>>`}</Text></PaginationPagesGray>)}
			</View>
			<View style={{flexDirection:'row'}}>
				<Text style={{flexBasis:100, textAlign:'center', textAlignVertical:'center'}}>우편번호</Text>
				<TextInput style={{flex: 1,backgroundColor:'#FFF', marginBottom:4, height:38}} editable={false} value={roadApiSelectedJuso.zipNo} />
			</View>
			<View style={{flexDirection:'row'}}>
				<Text style={{flexBasis:100, textAlign:'center', textAlignVertical:'center'}}>지번주소</Text>
				<TextInput style={{flex: 1,backgroundColor:'#FFF', marginBottom:4, height:38}} editable={false} value={roadApiSelectedJuso.jibunAddr} />
			</View>
			<View style={{flexDirection:'row'}}>
				<Text style={{flexBasis:100, textAlign:'center', textAlignVertical:'center'}}>도로명주소</Text>
				<TextInput style={{flex: 1,backgroundColor:'#FFF', marginBottom:4, height:38}} editable={false} value={roadApiSelectedJuso.roadAddr} />
			</View>
			<View style={{flexDirection:'row'}}>
				<Text style={{flexBasis:100, textAlign:'center', textAlignVertical:'center'}}>상세주소입력</Text>
				<TextInput style={{flex: 1,backgroundColor:'#FFF', marginBottom:4, height:38}} value={addrDetail} onChangeText={(val)=>{setAddrDetail(val)}}/>
			</View>
			<Button title="입력"/>
		</SafeAreaView>
	</>)
}

export default RoadApiTestScreen;
