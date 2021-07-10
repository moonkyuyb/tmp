/* COMMON */
import React, { useEffect, useState } from "react";

/* UTILS */
import { Controller, useForm } from "react-hook-form";
import _ from "lodash";

import { ModalPopup } from "../container/commonContainer";
import { Text,SafeAreaView, Button, TextInput } from "react-native";

const ModuApiTestScreen = ({
    test,
	moduApiInit, moduApiCall
}) => {

	//REACT HOOK FORM
	const { control, handleSubmit } = useForm()
	const onValid = (data) => {
		console.log(`✅VALIDATON OK`);
		moduApiCall(data)
	}
	const onInvalid = (err) => {
		console.log(`⏬VALIDATON FAIL`);
		console.log(err);
			 if(err.name) { showAlertMessage(err.name.message) }
		else if(err.phone) { showAlertMessage(err.phone.message) }
		else if(err) { showAlertMessage(`입력 내용을 다시 확인해주세요.`) }
	}

    //RENDER SCREEN
	return (<>
		<SafeAreaView style={{padding:10}}>
			<ModalPopup/>
			<Text>이름 입력</Text>
			<Controller
				control={control} name={`name`} defaultValue={`안민수`}
				render={({field})=>(
					<TextInput value={field.value} onChangeText={field.onChange} style={{backgroundColor:'#FFF'}} />	
				)}
			/>
			
			<Text>전화번호 입력</Text>
			<Controller
				control={control} name={`phone`} defaultValue={`01073118350`}
				render={({field})=>(
					<TextInput value={field.value} onChangeText={field.onChange} style={{backgroundColor:'#FFF', marginBottom:6}}/>	
				)}
			/>
            <Button title="전자서명 발송하기" onPress={handleSubmit(onValid, onInvalid)}/>
		</SafeAreaView>
	</>)
}

export default ModuApiTestScreen;