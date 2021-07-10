/* COMMON */
import React, { useEffect } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

/* UI COMPONENTS */
import { AlertModal } from "../container/centralContainer";

const SampleScreen = ({sample, getSample}) => {

	//HANDLE EFFECTS
	useEffect(()=>{
		const handleEffect = async () => { /* ... */ }
		handleEffect()
	},[])

	//RENDER SCREEN
	return(<>
		<SafeAreaView>
			<AlertModal/>
			<Button title="TEST" onPress={()=>{getSample({spl_id: 2})}}/>
			<Text>SAMPLE ID: {sample?.spl_id}</Text>
			<Text>SAMPLE TITLE: {sample?.spl_title}</Text>
			<Text>SAMPLE CONTENT: {sample?.spl_content}</Text>
		</SafeAreaView>
	</>)
}

export default SampleScreen;