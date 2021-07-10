import React, { useEffect, useState, Component }  from 'react';

import * as Common from './../../styled/commonStyle';
import Colors from '../../../assets/colors';

import  MainFlatList from './MainTopItemList';
import {MainTopWrap, MainHeader, HeaderBg, MainYTit, StepCont, StepHeader, StepHBtn  } from '../../styled/mainStyle/mainTopStyle';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

    
/* COMMON COMPONENTS */
/*
import Colors from '../../styles/Colors';
import Common.Text from '../../component/Common.Text';
import BoldText from '../../component/BoldText';
import SemiBoldText from '../../component/SemiBoldText';
import ZipSafeAreaView from '../../component/ZipSafeAreaView';
*/


const MainTop = ({data}) => {
    const [ZipStepData01, setZipStepData01] = useState([]);
	const [ZipStepData02, setZipStepData02] = useState([]);
	const navigation = useNavigation()
    //console.log("step data===============================================================");
    //console.log(data);


	
    AsyncStorage.getItem("mID")
    .then((result)=>{
        console.log("")
    })

	useEffect(()=>{
		const handleEffect = async (props) => {
			//navigation
		}
		handleEffect()
	},[])

    useEffect(()=>{
        
        var stepData = [];

        const process = [
            {step:3, process: "ON_PROCESSING", label: "서명 진행중"},
            {step:4, process: "COMPLETED", label: "전원 서명 완료"},
            {step:0, process: "ABORTED", label: "서명 거부됨"},
        ]
			if(data.length > 0) {
				stepData.push({ id : 1, title: '매물 검색', s_id:data[0].s_id });
				stepData.push({ id : 2, title: '매물 확인', s_id:data[0].s_id });
			}
			if (data.length > 0){
				process.forEach(el => {
					if (el.process == data[0].c_signing_status) {
						stepData.push({id:el.step, title: el.label, s_id:data[0].s_id})
					}
				});
			}
        
        setZipStepData01(stepData);
        
    },[data])

    return(
        <MainTopWrap>
            <MainHeader>
                <HeaderBg source={ require('../../../assets/img/drawable-xhdpi/img_main.png')} />
            
				<Common.TextUltraLight22>집판다는</Common.TextUltraLight22>
				<Common.FlexRowBox>
					<MainYTit> 수수료가 없다! </MainYTit>
				</Common.FlexRowBox>
                <Common.TextUltraLight14 pragraph>
                    부동산중개수수료 없는 안전한 부동산{"\n"}직거래 서비스를 이용하세요. 
                </Common.TextUltraLight14>
            </MainHeader>

            <StepCont>
                <StepHeader>
                    <StepHBtn color={Colors.blackColor} onPress={()=>navigation.navigate('salesList')}  >
                        <Common.TextSemiBold14 color={Colors.mainColor}>집 구하기</Common.TextSemiBold14>
                    </StepHBtn>
                    <StepHBtn  onPress={()=>navigation.navigate('registerContainer')}  >
                        <Common.TextSemiBold14>집 내놓기</Common.TextSemiBold14>
                    </StepHBtn>
                </StepHeader>

                <MainFlatList data={ZipStepData01}  />

            </StepCont>

        </MainTopWrap>

    )


    /*
    return(
        <MainTopWrap>
            <MainTopStyle/>
            <FlatList
				horizontal={true}
				contentContainerStyle={{ paddingHorizontal: 19 }}
				data={data} 
				renderItem ={ MainTopListItem } 
				keyExtractor={ item=> item.id }
			/>
        </MainTopWrap>
    );
    */

}

export default MainTop;


