import React from 'react';

import { FlatList } from 'react-native';

/* COMMON COMPONENTS */
import * as Common from './../../styled/commonStyle';
import { StepItemListActive, StepNumBox, } from '../../styled/mainStyle/mainTopStyle'

import { useNavigation } from '@react-navigation/native';

const MoreViewIcon = () => (<Common.Image size={10} source={require('../../../assets/img/drawable-xhdpi/icon_arrow_b.png')}/>);
const ZipStepItem=({item})=>{

    return(
        <StepItemListActive>
            <StepNumBox>
                <Common.TextMedium10>Step 0{item.id} </Common.TextMedium10>
                <MoreViewIcon/> 
            </StepNumBox>
            <Common.TextBold16>{item.title}</Common.TextBold16>
        </StepItemListActive>
    );
}

const MainFlatList = (data) =>{
    return(
            <FlatList
                horizontal={true}
                contentContainerStyle={{ paddingHorizontal: 19 }}
                data={data.data} 
                renderItem ={ ZipStepItem } 
                keyExtractor={ item=> item.id }               
            />
        
    );
}

export default MainFlatList;
