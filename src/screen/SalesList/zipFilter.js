import React, {useEffect, useState} from 'react';
import { View, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_URL, API_URL_KYU, ADMIN_URL} from "@env";

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Collapse,CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

/* COMMON COMPONENTS */
import Colors from './../../../assets/colors';
import * as Common from './../../styled/commonStyle';

import { ceil, fromPairs } from 'lodash';
import { floor } from 'react-native-reanimated';

import { CustomSliderMarkerLeft, CustomSliderMarkerRight, SaleDetailTitle, SaleDetailTitle2} from '../../components/filter/filter'
import { Option, OptionActive, OptionArrow, OptionArrowActive } from './../../components/filter/filterOption';
import { filterStyle } from './../../styled/sales/filterStyle';
import { HeaderFilterTagWrap, FilterContainer, HeaderFilterTag, FilterList, FilterOptionBox, MultiSliderBox, SliderLabelCont, LabelBox, LabelBoxL, 
	LabelBoxR, SliderBottomBar, FilterIconOptionBox, BorderTopView, IconOptionBtn, IconOptionActive, IconOption, FilterSaveInfoBox, CollapseTitleActive, CollapseTitle} from '../../styled/sales/filterStyle';

import {minRange, maxRange, minMonthRange, maxMonthRange, minAreaRange, maxAreaRange, maxMaintRange, minMaintRange, minFloorRange, maxFloorRange, 
		floorStr, amtDivide, amtMonthDivide, areaStr, maintStr, convertCodeToStr, convertCodeToTag} from '../../utils/common/filterFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('screen');
const SliderWidth = (Dimensions.get('window').width - 58);

const ZipFilter = ({
    //request data
    handleGetPriceList, 
    handleGetSaleTypeList,
    handleGetLivingList,
    handleGetHeatingList,
    handleGetSecurityList,
    handleGetEtcList,
	handleGetTagsList,
	handleSaveFilter,
	handleInitFilter,
    // get data list
    priceList,
    saleTypeList,
    livingList,
    heatingList,
    securityList,
    etcOptList,
	tagsList,

    // select items
    handleOnSaleTypeClick,
    handleOnPriceListClick, 
    handleOnLivingItemClick,
    handleOnHeatingItemClick,
    handleOnSecurityItemClick,
    handleOnEtcItemClick,
	handleOnTagItemClick,

	handleOnRoomCntClick,
	handleOnBathCntClick,
	handleOnParkingCntClick,
	handleOnBuiltYearClick,
	handleOnFilterCompleteClick,

	// 바 게이지 액션
	handleOnBarChange,


    //get inserted data
    priceListSelected,
    saleTypeSelected,
    livingItemSelected,
    heatingItemSelected,
    securityItemSelected,
    etcItemSelected,
	tagsItemSelected,

	// 기타 카운트
	roomCnt,
	bathCnt,
	builtYear,
	parkingCnt,

	// 바 게이지
	depositAmtRange,
	monthAmtRange,
	saleAmtRange,

	areaSizeRange,
	maintenanceAmtRange,
	floorRange,


}) => {
	/*
    console.log("monthAmtRange ======================================================================");
    console.log(monthAmtRange);
    
	console.log("tag selected: "+tagsItemSelected);
    
    console.log("=================================================================================");
	console.log("        ");
	*/

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
    

	const [CollapseList01, setCollapseList01] = useState(false)
	const [CollapseList02, setCollapseList02] = useState(false)
	const [CollapseList03, setCollapseList03] = useState(false)
	const [CollapseList04, setCollapseList04] = useState(false)


	const [viewWidth, setViewWidth] = useState(SliderWidth)

	onLayout = (event) => {
		// if (this.state.dimensions) return // layout was already called
		var {width, height} = event.nativeEvent.layout
		setViewWidth(width-24);
	}

	useEffect((props)=>{
	    handleGetPriceList();
        handleGetSaleTypeList();
        handleGetLivingList();
        handleGetHeatingList();
        handleGetSecurityList();
        handleGetEtcList();
        handleGetTagsList();
    	const handleEffect = async (props) => {
			//...
		}
		
		handleEffect()
	},[])

	const CollapseIconActive = () 		=> (<Common.Image size={24}  source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_sub_up.png')}/>)
	const CollapseIcon = () 			=> (<Common.Image size={24}  source={require('./../../../assets/img/drawable-xhdpi/bt_arrow_sub_down.png')}/>)

	// const CustomSliderMarkerLeft = () 	=> (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_panda_face.png')} />)
	// const CustomSliderMarkerRight = ()	=> (<Common.Image size={24} source={require('./../../../assets/img/drawable-xhdpi/icon_panda_face.png')} />)
    

	
	const [mID, setMID] = useState("");
	_getToken = async () => {
		
		try {
		  const value = await AsyncStorage.getItem('mID');
		  if (value !== null) {
			// We have data!!
			setMID(value);
		  }
		} catch (error) {
			console.log(err)
		  // Error retrieving data
		}
	  };
	_getToken();
	
	const BtnOpt = (props) =>{
		if (props.cnt.indexOf(props.idx) >=0 ){
			return (
				<OptionActive onPress={()=>{props.handler(props.idx)} }>
					{props.title}
				</OptionActive>
			)
		}else {
			return (
				<Option onPress={()=>{props.handler(props.idx)} }> 
					{props.title}
				</Option>
			)
		}
	}

	
	

	return(
		<Common.ZipandaSafeView>
			<HeaderFilterTagWrap>
				<HeaderFilterTag horizontal={true}>
					{saleTypeSelected.length > 0 &&
						<OptionArrowActive>#{ convertCodeToStr(saleTypeList, saleTypeSelected) }</OptionArrowActive>
					}
					{priceListSelected.length > 0 &&
						<OptionArrowActive>#{ convertCodeToStr(priceList, priceListSelected) }</OptionArrowActive>
					}
					{ ( priceListSelected.indexOf('lease')>=0 ||  priceListSelected.indexOf('monthly')>=0 || priceListSelected.indexOf('short')>=0  ) &&
						<OptionArrowActive>#{"보증금 "+amtDivide(depositAmtRange[0])+"~"+amtDivide(depositAmtRange[1]) }</OptionArrowActive>
					}
					{ ( priceListSelected.indexOf('monthly')>=0 ) &&
						<OptionArrowActive>#{"월세 "+amtMonthDivide(monthAmtRange[0])+"~"+amtMonthDivide(monthAmtRange[1]) }</OptionArrowActive>
					}
					{( priceListSelected.indexOf('sales')>=0 ) &&
						<OptionArrowActive>#{"매매가 "+amtDivide(saleAmtRange[0])+"~"+amtDivide(saleAmtRange[1]) }</OptionArrowActive>
					}
					<OptionArrowActive>#관리비 {maintStr(maintenanceAmtRange[0])}~{maintStr(maintenanceAmtRange[1])}</OptionArrowActive>
					
					{heatingItemSelected.length > 0 &&
					<OptionArrowActive>{convertCodeToStr(heatingList, heatingItemSelected)}</OptionArrowActive>
					}
					{parkingCnt > 0 &&
					<OptionArrowActive>#주차 {parkingCnt+"대"}</OptionArrowActive>
					}
					{tagsItemSelected.length > 0 &&
					<OptionArrowActive>#{convertCodeToTag(tagsList, tagsItemSelected)}</OptionArrowActive>
					}
					{etcItemSelected.length > 0 &&
					<OptionArrowActive>#{convertCodeToStr(etcOptList, etcItemSelected)}</OptionArrowActive>
					}

					<OptionArrowActive>#전용면적 {areaStr(areaSizeRange[0])}~{areaStr(areaSizeRange[1])}</OptionArrowActive>

					<OptionArrowActive>#층수 {floorStr(floorRange)}</OptionArrowActive>
					{roomCnt > 0 &&	
					<OptionArrowActive>#방개수 {roomCnt}</OptionArrowActive>
					}
					{bathCnt > 0 &&	
					<OptionArrowActive>#욕실 {bathCnt}</OptionArrowActive>
					}
					
					{builtYear > 0 &&	
					<OptionArrowActive>#준공연차 {builtYear <16 ? builtYear+"년 이내": "15년 이상" }</OptionArrowActive>
					}

					{livingItemSelected.length > 0 &&
					<OptionArrowActive>#방내부시설 {convertCodeToStr(livingList, livingItemSelected)}</OptionArrowActive>
					}

					{heatingItemSelected.length > 0 &&
					<OptionArrowActive>#냉/난방방식 {convertCodeToStr(heatingList, heatingItemSelected)}</OptionArrowActive>
					}

					{securityItemSelected.length > 0 &&
					<OptionArrowActive>#보안시설 {convertCodeToStr(securityList, securityItemSelected)}</OptionArrowActive>
					}

				</HeaderFilterTag>
			</HeaderFilterTagWrap>
			<Common.ScrollContainer paddingN>	
					<FilterList>
						<SaleDetailTitle>거래 유형</SaleDetailTitle>
						<FilterOptionBox>
                            {
                                priceList.length > 0 &&
                                priceList.map((el)=>{
										if(priceListSelected.indexOf(el.code) >= 0){
											return ( <OptionActive onPress={() => { handleOnPriceListClick(el.code); }} >{el.string}</OptionActive> )
										}else{
											return ( <Option onPress={() => { handleOnPriceListClick(el.code); }} >{el.string}</Option> )
										}
                                })
                            }
                        </FilterOptionBox>
					</FilterList>
					{ ( priceListSelected.indexOf('lease')>=0 ||  priceListSelected.indexOf('monthly')>=0 || priceListSelected.indexOf('short')>=0  )&&

					<FilterList paddingTN>
						<Common.FlexBetweenBox>
							<SaleDetailTitle2>보증금(전세금)</SaleDetailTitle2>
							<Common.TextSemiBold13>{ amtDivide(depositAmtRange[0]) }~{amtDivide(depositAmtRange[1]) }</Common.TextSemiBold13>
						</Common.FlexBetweenBox>
						<Common.View>
							<MultiSliderBox
								onLayout = {this.onLayout}
							>
							<MultiSlider
								values={depositAmtRange}
								onValuesChangeStart={() => {
									navigation.setOptions({
										gestureEnabled: false
									})
									this.disableScroll
								}}
								onValuesChangeFinish={(el) => {
									handleOnBarChange(1, el)
									navigation.setOptions({
										gestureEnabled: true
									})
									this.enableScroll
								}}
								isMarkersSeparated={true}
								min={minRange}
								max={maxRange}
								sliderLength={viewWidth}
								showStepMarkers={true}
								showStepLabels={true}
								allowOverlap={false}
								customMarkerLeft={(e) => {
									return (<CustomSliderMarkerLeft
										currentValue={e.currentValue} />)
								}}
								customMarkerRight={(e) => {
									return (<CustomSliderMarkerRight
										currentValue={e.currentValue} />)
								}}
								//선택된 부분 색
								selectedStyle={{
									height: 4,
									backgroundColor: Colors.mainColor,
								}}
								//선택 안된부분 색
								trackStyle={{
									height: 4,
									backgroundColor: Colors.textNonColors,
								}}
							/>
						</MultiSliderBox>
							<SliderLabelCont>
								<LabelBoxL>
									<SliderBottomBar/>
									<Common.TextLight12>0</Common.TextLight12>
								</LabelBoxL>
								<LabelBox>
									<SliderBottomBar/>
									<Common.TextLight12>5억원</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>무제한</Common.TextLight12>
								</LabelBoxR>
								
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					}
					{ ( priceListSelected.indexOf('monthly')>=0 )&&

					<FilterList paddingTN>
						<Common.FlexBetweenBox>
							<SaleDetailTitle2>월세</SaleDetailTitle2>
							<Common.TextSemiBold13>{ amtMonthDivide(monthAmtRange[0]) }~{amtMonthDivide(monthAmtRange[1]) }</Common.TextSemiBold13>
						</Common.FlexBetweenBox>
						<Common.View>
							<MultiSliderBox
							onLayout = {this.onLayout}
						>
							<MultiSlider
								values={monthAmtRange}
								onValuesChangeStart={()=>{
									this.disableScroll
								}}
								
								onValuesChangeFinish={(el) =>{
									handleOnBarChange(2, el)
									this.enableScroll
								}
								}
								isMarkersSeparated={true}
								min={minMonthRange}
								max={maxMonthRange}
								sliderLength={viewWidth}
								showStepMarkers={true}
								showStepLabels={true}
								allowOverlap={false}
								customMarkerLeft={(e) => {
									return (<CustomSliderMarkerLeft
										currentValue={e.currentValue}/>)
								}}
								customMarkerRight={(e) => {
									return (<CustomSliderMarkerRight
									currentValue={e.currentValue}/>)
								}}
								//선택된 부분 색
								selectedStyle={{
									height:4,
									backgroundColor: Colors.mainColor,
								}}
								//선택 안된부분 색
								trackStyle={{
									height:4,
									backgroundColor: Colors.textNonColors,
								}}
							/>
						</MultiSliderBox>
							<SliderLabelCont>
								<LabelBoxL>
									<SliderBottomBar/>
									<Common.TextLight12>0</Common.TextLight12>
								</LabelBoxL>
								<LabelBox>
									<SliderBottomBar/>
									<Common.TextLight12>5천만원</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>무제한</Common.TextLight12>
								</LabelBoxR>
								
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					}

					{ ( priceListSelected.indexOf('sales')>=0 )&&
					<FilterList paddingTN>
						<Common.FlexBetweenBox>
							<SaleDetailTitle2>매매가</SaleDetailTitle2>
							<Common.TextSemiBold13>{ amtDivide(saleAmtRange[0]) }~{amtDivide(saleAmtRange[1]) }</Common.TextSemiBold13>
						</Common.FlexBetweenBox>
						<Common.View>
							<MultiSliderBox
							onLayout = {this.onLayout}
						>
							<MultiSlider
								onValuesChangeStart={()=>{
									this.disableScroll
								}}
								
								onValuesChangeFinish={(el) =>{
									handleOnBarChange(3, el)
									this.enableScroll
								}}
								isMarkersSeparated={true}
								min={minRange}
								max={maxRange}
								sliderLength={viewWidth}
								showStepMarkers={true}
								showStepLabels={true}
								allowOverlap={false}
								customMarkerLeft={(e) => {
									return (<CustomSliderMarkerLeft
										currentValue={e.currentValue}/>)
								}}
								customMarkerRight={(e) => {
									return (<CustomSliderMarkerRight
									currentValue={e.currentValue}/>)
								}}
								//선택된 부분 색
								selectedStyle={{
									height:4,
									backgroundColor: Colors.mainColor,
								}}
								//선택 안된부분 색
								trackStyle={{
									height:4,
									backgroundColor: Colors.textNonColors,
								}}
							/>
						</MultiSliderBox>
							<SliderLabelCont>
								<LabelBoxL>
									<SliderBottomBar/>
									<Common.TextLight12>0</Common.TextLight12>
								</LabelBoxL>
								<LabelBox>
									<SliderBottomBar/>
									<Common.TextLight12>5억원</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>무제한</Common.TextLight12>
								</LabelBoxR>
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					}
					<FilterList borderT>
						<SaleDetailTitle>매물 유형</SaleDetailTitle>
						<FilterOptionBox>
                            {
                                saleTypeList.length >0 &&
                                saleTypeList.map((el) =>{
                                    if(saleTypeSelected.indexOf(el.code) >= 0){
										return ( <OptionActive onPress={() => { handleOnSaleTypeClick(el.code); }} >{el.string}</OptionActive> )
									}else{
										return ( <Option onPress={() => { handleOnSaleTypeClick(el.code); }} >{el.string}</Option> )
									}
                                })
                            }
						</FilterOptionBox>
					</FilterList>
					<FilterList borderT>
						<Common.FlexBetweenBox>
							<SaleDetailTitle2>전용면적</SaleDetailTitle2>
							<Common.TextSemiBold13>{areaStr(areaSizeRange[0])}~{areaStr(areaSizeRange[1])}</Common.TextSemiBold13>
						</Common.FlexBetweenBox>
						<Common.View>
							<MultiSliderBox
							onLayout = {this.onLayout}
						>
							<MultiSlider
								values={areaSizeRange}
								onValuesChangeStart={()=>{
									this.disableScroll
								}}
								
								onValuesChangeFinish={(el)=>{
									handleOnBarChange(4,el);
									this.enableScroll
								}
								}
								isMarkersSeparated={true}
								min={minAreaRange}
								max={maxAreaRange}
								sliderLength={viewWidth}
								showStepMarkers={true}
								showStepLabels={true}
								allowOverlap={false}
								customMarkerLeft={(e) => {
									return (<CustomSliderMarkerLeft
										currentValue={e.currentValue}/>)
								}}
								customMarkerRight={(e) => {
									return (<CustomSliderMarkerRight
									currentValue={e.currentValue}/>)
								}}
								//선택된 부분 색
								selectedStyle={{
									height:4,
									backgroundColor: Colors.mainColor,
								}}
								//선택 안된부분 색
								trackStyle={{
									height:4,
									backgroundColor: Colors.textNonColors,
								}}
							/>
						</MultiSliderBox>
							<SliderLabelCont>
								<LabelBoxL>
									<SliderBottomBar/>
									<Common.TextLight12>0</Common.TextLight12>
								</LabelBoxL>
								<LabelBox>
									<SliderBottomBar/>
									<Common.TextLight12>33m²(10평)</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>무제한</Common.TextLight12>
								</LabelBoxR>
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					<BorderTopView>
						<Collapse onToggle={(collapsed)=>{setCollapseList01(collapsed)}} isCollapsed={true}>
							<CollapseHeader style={ CollapseList01 ? filterStyle.CollapseTitleActive : filterStyle.CollapseTitle} >
								{CollapseList01 ? 
									<CollapseTitleActive><Common.TextSemiBold14>매물 특징</Common.TextSemiBold14><CollapseIconActive /></CollapseTitleActive>
									:     <CollapseTitle><Common.TextSemiBold14>매물 특징</Common.TextSemiBold14><CollapseIcon /></CollapseTitle>
								}
							</CollapseHeader>
							<CollapseBody>
								<FilterList>
									<Common.FlexBetweenBox>
										<SaleDetailTitle2>층수</SaleDetailTitle2>
										<Common.TextSemiBold13>{floorStr(floorRange)}</Common.TextSemiBold13>
									</Common.FlexBetweenBox>
									<Common.View>
										<MultiSliderBox
										onLayout = {this.onLayout}
									>
										<MultiSlider
											values={floorRange}
											onValuesChangeStart={()=>{
												this.disableScroll
											}}
											
											onValuesChangeFinish={(el) => {
												handleOnBarChange(6, el);
												this.enableScroll
											}}
											isMarkersSeparated={true}
											min={minFloorRange}
											max={maxFloorRange}
											sliderLength={viewWidth}
											showStepMarkers={true}
											showStepLabels={true}
											allowOverlap={false}
											customMarkerLeft={(e) => {
												return (<CustomSliderMarkerLeft
													currentValue={e.currentValue}/>)
											}}
											customMarkerRight={(e) => {
												return (<CustomSliderMarkerRight
												currentValue={e.currentValue}/>)
											}}
											//선택된 부분 색
											selectedStyle={{
												height:4,
												backgroundColor: Colors.mainColor,
											}}
											//선택 안된부분 색
											trackStyle={{
												height:4,
												backgroundColor: Colors.textNonColors,
											}}
										/>
									</MultiSliderBox>
										<SliderLabelCont>
											<LabelBoxL>
												<SliderBottomBar/>
												<Common.TextLight12>반지층</Common.TextLight12>
											</LabelBoxL>
											<LabelBox>
												<SliderBottomBar/>
												<Common.TextLight12>7층 이상</Common.TextLight12>
											</LabelBox>
											<LabelBoxR>
												<SliderBottomBar/>
												<Common.TextLight12>옥탑</Common.TextLight12>
											</LabelBoxR>
										</SliderLabelCont>
									</Common.View>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>방개수</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={roomCnt} idx={1} handler={handleOnRoomCntClick} title={"1개"}/>
										<BtnOpt cnt={roomCnt} idx={2} handler={handleOnRoomCntClick} title={"2개"}/>
										<BtnOpt cnt={roomCnt} idx={3} handler={handleOnRoomCntClick} title={"3개"}/>
										<BtnOpt cnt={roomCnt} idx={4} handler={handleOnRoomCntClick} title={"4개 이상"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>욕실</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={bathCnt} idx={1} handler={handleOnBathCntClick} title={"1개"}/>
										<BtnOpt cnt={bathCnt} idx={2} handler={handleOnBathCntClick} title={"2개"}/>
										<BtnOpt cnt={bathCnt} idx={3} handler={handleOnBathCntClick} title={"3개"}/>
										<BtnOpt cnt={bathCnt} idx={4} handler={handleOnBathCntClick} title={"4개 이상"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>준공연차</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={builtYear} idx={1} handler={handleOnBuiltYearClick} title={"1년 이내"}/>
										<BtnOpt cnt={builtYear} idx={5} handler={handleOnBuiltYearClick} title={"5년 이내"}/>
										<BtnOpt cnt={builtYear} idx={10} handler={handleOnBuiltYearClick} title={"10년 이내"}/>
										<BtnOpt cnt={builtYear} idx={15} handler={handleOnBuiltYearClick} title={"15년 이내"}/>
										<BtnOpt cnt={builtYear} idx={16} handler={handleOnBuiltYearClick} title={"1년 이상"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<Common.FlexBetweenBox>
										<SaleDetailTitle2>관리금</SaleDetailTitle2>
										<Common.TextSemiBold13>{maintStr(maintenanceAmtRange[0])}~{maintStr(maintenanceAmtRange[1])}</Common.TextSemiBold13>
									</Common.FlexBetweenBox>
									<Common.View>
										<MultiSliderBox
											onLayout = {this.onLayout}
										>
											<MultiSlider
												values={[minMaintRange, maxMaintRange]}
												onValuesChangeStart={()=>{
													this.disableScroll
												}}
												
												onValuesChangeFinish={(el) =>{
													handleOnBarChange(5, el);
													this.enableScroll
												}
												}
												isMarkersSeparated={true}
												min={minMaintRange}
												max={maxMaintRange}
												sliderLength={viewWidth}
												showStepMarkers={true}
												showStepLabels={true}
												allowOverlap={false}
												customMarkerLeft={(e) => {
													return (<CustomSliderMarkerLeft
														currentValue={e.currentValue}/>)
												}}
												customMarkerRight={(e) => {
													return (<CustomSliderMarkerRight
													currentValue={e.currentValue}/>)
												}}
												//선택된 부분 색
												selectedStyle={{
													height:4,
													backgroundColor: Colors.mainColor,
												}}
												//선택 안된부분 색
												trackStyle={{
													height:4,
													backgroundColor: Colors.textNonColors,
												}}
											/>
										</MultiSliderBox>
										<SliderLabelCont>
											<LabelBoxL>
												<SliderBottomBar/>
												<Common.TextLight12>0</Common.TextLight12>
											</LabelBoxL>
											<LabelBox>
												<SliderBottomBar/>
												<Common.TextLight12>16만원</Common.TextLight12>
											</LabelBox>
											<LabelBoxR>
												<SliderBottomBar/>
												<Common.TextLight12>무제한</Common.TextLight12>
											</LabelBoxR>
											</SliderLabelCont>
									</Common.View>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle>방 내부 시설</SaleDetailTitle>
									<FilterOptionBox>
									{
										livingList.length > 0 &&
										livingList.map((el) => {
											if(livingItemSelected.indexOf(el.code) >= 0){
												return ( <OptionActive  onPress={()=>{handleOnLivingItemClick(el.code);}} >{el.string}</OptionActive> )
											}else{
												return ( <Option  onPress={()=>{handleOnLivingItemClick(el.code);}} >{el.string}</Option>	)
											}
										})
									}
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle>난방방식/냉방시설</SaleDetailTitle>
									<FilterOptionBox>
									{
										heatingList.length > 0 &&
										heatingList.map((el) => {
											if(heatingItemSelected.indexOf(el.code) >= 0){
												return ( <OptionActive  onPress={()=>{handleOnHeatingItemClick(el.code);}} >{el.string}</OptionActive> )
											}else{
												return ( <Option  onPress={()=>{handleOnHeatingItemClick(el.code);}} >{el.string}</Option>	)
											}
										})
									}
									</FilterOptionBox>
								</FilterList>
							</CollapseBody>
						</Collapse>
					</BorderTopView>
					<BorderTopView>
						<Collapse onToggle={(collapsed)=>{setCollapseList02(collapsed)}} isCollapsed={true}>
							<CollapseHeader style={ CollapseList02 ? filterStyle.CollapseTitleActive : filterStyle.CollapseTitle} >
								{CollapseList02 ? 
									<CollapseTitleActive><Common.TextSemiBold14>보안 및 시설 정보</Common.TextSemiBold14><CollapseIconActive /></CollapseTitleActive>
									:     <CollapseTitle><Common.TextSemiBold14>보안 및 시설 정보</Common.TextSemiBold14><CollapseIcon /></CollapseTitle>
								}
							</CollapseHeader>
							<CollapseBody>
								<FilterList>
									<Common.FlexBetweenBox>
										<SaleDetailTitle2>보안 시설</SaleDetailTitle2>
										<Common.TextLight13>cctv, 비디오폰, 현관보안, 무인택배함...</Common.TextLight13>
									</Common.FlexBetweenBox>
									<FilterIconOptionBox>
										{
											securityList.length > 0 &&
											securityList.map((el)=>{
												if(securityItemSelected.indexOf(el.code) >=0){
													return( 
														<IconOptionBtn onPress={()=>{handleOnSecurityItemClick(el.code);}}>
															<IconOptionActive><Common.Image size={45} source={{uri:API_URL+el.icon_url}} /></IconOptionActive>
															<Common.TextLight12 align={'center'}>{el.string}</Common.TextLight12>
														</IconOptionBtn> 
														); 
												}else{
													return( 
														<IconOptionBtn onPress={()=>{handleOnSecurityItemClick(el.code);}}>
															<IconOption><Common.Image size={45} source={{uri:API_URL+el.icon_url}} /></IconOption>
															<Common.TextLight12 align={'center'}>{el.string}</Common.TextLight12>
														</IconOptionBtn> 
														); 
												}	
											})
										}
									</FilterIconOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>주차</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={parkingCnt} idx={1} handler={handleOnParkingCntClick} title={"주차가능"}/>
										<BtnOpt cnt={parkingCnt} idx={2} handler={handleOnParkingCntClick} title={"세대당 1대 이상"}/>
										<BtnOpt cnt={parkingCnt} idx={3} handler={handleOnParkingCntClick} title={"세대당 1.5대 이상"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>기타 옵션</SaleDetailTitle2>
									<FilterOptionBox>
										{
											etcOptList.length > 0 &&
											etcOptList.map((el) => {
												if(etcItemSelected.indexOf(el.code) >=0){
													return ( <OptionActive onPress={ ()=>{handleOnEtcItemClick(el.code);} } >{el.string}</OptionActive> )
												}else{
													return ( <Option onPress={ ()=>{handleOnEtcItemClick(el.code);} } >{el.string}</Option> )
												}
											})
										}
									</FilterOptionBox>
								</FilterList>
							</CollapseBody>
						</Collapse>
					</BorderTopView>
					<BorderTopView>
						<Collapse onToggle={(collapsed)=>{setCollapseList03(collapsed)}} isCollapsed={true}>
							<CollapseHeader style={ CollapseList03 ? filterStyle.CollapseTitleActive : filterStyle.CollapseTitle} >
								{CollapseList03 ? 
									<CollapseTitleActive><Common.TextSemiBold14>기타 태그 #</Common.TextSemiBold14><CollapseIconActive /></CollapseTitleActive>
									:     <CollapseTitle><Common.TextSemiBold14>기타 태그 #</Common.TextSemiBold14><CollapseIcon /></CollapseTitle>
								}
							</CollapseHeader>
							<CollapseBody>
								<FilterList>
									<SaleDetailTitle2>기타 태그#</SaleDetailTitle2>
									<FilterOptionBox>
										{tagsList.length > 0 &&

											tagsList.map((el)=>{
												if(tagsItemSelected.indexOf(el.st_id)>=0){
													return ( <OptionActive onPress={ ()=>{handleOnTagItemClick(el.st_id);} } >{el.st_title}</OptionActive> )
												}else{
													return ( <Option onPress={ ()=>{handleOnTagItemClick(el.st_id);} } >{el.st_title}</Option> )
												}
											})
										}
									</FilterOptionBox>
								</FilterList>
							</CollapseBody>
						</Collapse>
					</BorderTopView>
				<FilterSaveInfoBox>
					<Common.Image size={32} marginR={14} source={require('./../../../assets/img/drawable-xhdpi/icon_guide_filter_save.png')} />
					<Common.TextLight14><Common.TextSemiBold14>필터 내용을 저장</Common.TextSemiBold14>하시면 필터 조건에 맞는{"\n"}매물 정보가 알림으로 전달됩니다.</Common.TextLight14>
				</FilterSaveInfoBox>
			</Common.ScrollContainer>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss btnColor={Colors.whiteColor} onPress={()=>{handleInitFilter()} } ><Common.TextBold16>초기화</Common.TextBold16></Common.FloatBtnsss>		
				<Common.FloatBtnsss  onPress={()=>{ handleOnFilterCompleteClick(); navigation.navigate('salesList'); }} ><Common.TextBold16>필터 적용</Common.TextBold16></Common.FloatBtnsss>
				{/*mID!="" &&
				<TouchableOpacity style={[filterStyle.filterSaveBtn,{backgroundColor:Colors.blackColor}]} 
						onPress={()=>{	
							if (mID == "") {

							}else {
								handleSaveFilter({
								priceListSelected:			priceListSelected,
								saleTypeSelected:			saleTypeSelected,
								livingItemSelected:			livingItemSelected,
								heatingItemSelected:		heatingItemSelected,
								securityItemSelected:		securityItemSelected,
								etcItemSelected:			etcItemSelected,
								tagsItemSelected:			tagsItemSelected,
								roomCnt:					roomCnt,
								bathCnt:					bathCnt,	
								builtYear:					builtYear,
								parkingCnt:					parkingCnt,
								depositAmtRange:			depositAmtRange,
								monthAmtRange:				monthAmtRange,
								saleAmtRange:				saleAmtRange,
								areaSizeRange:				areaSizeRange,
								maintenanceAmtRange:		maintenanceAmtRange,
								floorRange:				floorRange,
								mID: mID
							});
						}
						}} 
				>
					<Common.TextBold16 style={{color:Colors.whiteColor,}}>필터 저장</Common.TextBold16>
				</TouchableOpacity>
					*/}
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	)
}


export default ZipFilter;