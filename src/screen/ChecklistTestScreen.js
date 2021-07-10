/* COMMON */
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

/* UTILS */
import { useForm, Controller } from "react-hook-form";

/* UI COMPONENTS */
import { ModalPopup } from "../container/commonContainer";

/* CONSTANTS */
const testSId = 256, testMIdTo = 2, testMIdFrom = 32
const CKLIST_MEMO_CODE = 'CKLIST_000' //※절대 변경 금지 !

const ChecklistTestScreen = ({
	selectedSId, selectedMIdFrom, selectedMIdTo, checklist, checklistCompleted,
	initChecklistState, setChecklistState, getChecklist, postChecklist
}) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()

	//UI STATES
	const [loaded, setLoaded] = useState(false)

	//HANDLE EFFECTS
	useEffect(()=>{
		console.log(`💬route.param: ${route.params}`);
		console.log(route.params);
		const paramState = {
			selectedSId:	route.params?.s_id		? route.params?.s_id		: testSId,
			selectedMIdTo:	route.params?.m_id_to	? route.params?.m_id_to		: testMIdTo,
			selectedMIdFrom:route.params?.m_id_from	? route.params?.m_id_from	: testMIdFrom,
		}
		console.log(`💬initState: ${paramState}`)
		console.log(paramState)
		setChecklistState(paramState)
		setLoaded(true)

		return()=>{ initChecklistState() }
	},[])

	useEffect(()=>{ if(loaded) getChecklist({s_id:selectedSId, m_id_from:selectedMIdFrom, m_id_to:selectedMIdTo}) },[loaded])
	useEffect(()=>{ if(checklist.length>0 && checklist[0]['code'] == CKLIST_MEMO_CODE) setValue('content',checklist[0]?.content) },[checklist])
	useEffect(()=>{ if(checklistCompleted) navigation.goBack() },[checklistCompleted])

	//REACT HOOK FORM
	const { control, handleSubmit, setValue } = useForm()
	const onValid = data => {
		// console.log(data);
		postChecklist({
			'selectedSId': selectedSId, 'selectedMIdFrom': selectedMIdFrom, 'selectedMIdTo': selectedMIdTo, 'data': data, 'checklist': checklist
		})
	}
	const onInvalid = err => { console.log(err) }

	return(<>
		<SafeAreaView>
			<ModalPopup/>
			<Button title="SUBMIT" onPress={handleSubmit(onValid,onInvalid)}/>
			{/* <Button title="TEST" onPress={()=>{console.log(checklist);}}/> */}
			{/* <Button title="get Checklist" onPress={()=>{getChecklist({test:'test'})}}/> */}
			<FlatList
				data={checklist} 
				keyExtractor={(item,index)=>item.code}
				renderItem={({item,index})=>{
					if(item['code']==CKLIST_MEMO_CODE&&index == 0) return null
					return (<>
						<Controller
							control={control} name={`checkedlist[${index}]`} defaultValue={item['checked']?true:false}
							render={({field})=>(
								<View style={{height:38,backgroundColor:'gray',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
									<Text>{field['value']}{item['string']}</Text>
									<TouchableOpacity onPress={()=>{field.onChange(!field.value)}}><Text>{field.value?`✅`:`❎`}</Text></TouchableOpacity>
								</View>
							)}
						/>
					</>)
				}}
			/>
			<Text>기타 메모</Text>
			<Controller control={control} name={`checkedlist[0]`} defaultValue={true} render={()=>null}/>
			<Controller
				control={control} name={`content`} defaultValue={checklist[0]?.content}
				render={({field})=>(<TextInput value={field.value} onChangeText={field.onChange} multiline={true} style={{backgroundColor:'#CCC'}} />)}
			/>
		</SafeAreaView>
	</>)
}

export default ChecklistTestScreen
