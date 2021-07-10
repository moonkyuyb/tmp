/* COMMON */
import React, { useEffect, useState } from 'react';
import { Button, Text, FlatList, View, ActivityIndicator  } from 'react-native';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

/* ENVIRONMENTS */
import { ADMIN_URL } from "@env";

/* UTILS & REDUCER */
import _ from "lodash";
import { handleAuthorization } from '../reducers/authReducer';
import { setCentralState } from '../reducers/centralReducer';

/* UI COMPONENTS */
import Colors from '../../assets/colors';
import * as Common from './../styled/commonStyle';
import { AlertModal } from '../container/centralContainer';
import { MypageHeader,EmailBox,MypageYellowBox,YellowBtn,MypageListBox,ListItem,} from '../styled/mypageStyle/mypageStyle';
import { ArrowIcon } from '../components/common/ArrowIcon';
import PointText from '../components/common/PointText'

const MemberInfoScreen = ({getMemberInfo, memberInfo}) => {

	//GET ROUTE & NAVIGATION & REDUX STATE
	const route = useRoute(), navigation = useNavigation()
	const {loading, needGoBack} = useSelector(state=>state.centralReducer)
    const member = useSelector(state=>state.memberReducer.member)
	const dispatch = useDispatch()

	//HANDLE EFFECTS
	useEffect(()=>{
		const handleEffect = async () => {
		    if(!member) dispatch(handleAuthorization())
        }
		handleEffect()
	},[])

    useEffect(()=>{
        getMemberInfo({m_id: member?.m_id})
    },[member])

	//RENDER SCREEN
	return(<>
		<Common.ZipandaSafeView>
			<AlertModal/>
            <Common.ScrollContainer>
			    {/* <Button title="TEST" onPress={()=>{console.log(needGoBack);}}/> */}
				<MypageHeader>
					<PointText>
						<Common.TextSemiBold22>{member?.m_name||''}</Common.TextSemiBold22>
						<Common.TextUltraLight22>님, 안녕하세요</Common.TextUltraLight22>
					</PointText>
					<EmailBox><Common.TextMedium16>{member?.m_username||''}</Common.TextMedium16></EmailBox>
				</MypageHeader>
				<MypageYellowBox>
					<YellowBtn onPress={() => { navigation.navigate('zzimSaleList') }} >
						<Common.FlexRowBox>
							<Common.Image size={24} marginR={5} source={require('../../assets/img/drawable-xhdpi/icon_mypage_attention.png')}/>
							<Common.TextMedium16>관심 매물 ・ 단지</Common.TextMedium16>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<Common.TextBold16>{memberInfo?.like_cnt||0}개 ･ {memberInfo?.like_danji_cnt||0}개</Common.TextBold16><ArrowIcon/>
						</Common.FlexRowBox>
					</YellowBtn>
					<YellowBtn onPress={() => { navigation.navigate('mySaleContainer') }} >
						<Common.FlexRowBox>
							<Common.Image size={24} marginR={5} source={require('../../assets/img/drawable-xhdpi/icon_mypage_add.png')}/>
							<Common.TextMedium16>등록매물</Common.TextMedium16>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<Common.TextBold16>{memberInfo?.sales_cnt||0}개</Common.TextBold16><ArrowIcon/>
						</Common.FlexRowBox>
					</YellowBtn>
					<YellowBtn onPress={()=>{ navigation.navigate('transactionStatus') }}>
						<Common.FlexRowBox>
							<Common.Image size={24} marginR={5} source={require('../../assets/img/drawable-xhdpi/icon_mypage_deal.png')}/>
							<Common.TextMedium16>거래 현황</Common.TextMedium16>
						</Common.FlexRowBox>
						<Common.FlexRowBox>
							<Common.TextBold16>{memberInfo?.contract_cnt||0}개</Common.TextBold16><ArrowIcon/>
						</Common.FlexRowBox>
					</YellowBtn>
				</MypageYellowBox>
				<MypageListBox>
					<ListItem onPress={() => navigation.navigate('account')} >
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_managment.png')}/>
							<Common.TextMedium16>계정관리</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
					<ListItem onPress={() => navigation.navigate('push')}>
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_push.png')}/>
							<Common.TextMedium16>PUSH 설정</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
					<ListItem borderN onPress={() => navigation.navigate('appVersion')}>
						<Common.FlexRowBox>
							<Common.Image size={20} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_vision.png')}/>
							<Common.TextMedium16>버전정보</Common.TextMedium16>
						</Common.FlexRowBox>
						<ArrowIcon/>
					</ListItem>
				</MypageListBox>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	</>)
}

export default MemberInfoScreen;