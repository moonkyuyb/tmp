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

	// ??? ????????? ??????
	handleOnBarChange,


    //get inserted data
    priceListSelected,
    saleTypeSelected,
    livingItemSelected,
    heatingItemSelected,
    securityItemSelected,
    etcItemSelected,
	tagsItemSelected,

	// ?????? ?????????
	roomCnt,
	bathCnt,
	builtYear,
	parkingCnt,

	// ??? ?????????
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
						<OptionArrowActive>#{"????????? "+amtDivide(depositAmtRange[0])+"~"+amtDivide(depositAmtRange[1]) }</OptionArrowActive>
					}
					{ ( priceListSelected.indexOf('monthly')>=0 ) &&
						<OptionArrowActive>#{"?????? "+amtMonthDivide(monthAmtRange[0])+"~"+amtMonthDivide(monthAmtRange[1]) }</OptionArrowActive>
					}
					{( priceListSelected.indexOf('sales')>=0 ) &&
						<OptionArrowActive>#{"????????? "+amtDivide(saleAmtRange[0])+"~"+amtDivide(saleAmtRange[1]) }</OptionArrowActive>
					}
					<OptionArrowActive>#????????? {maintStr(maintenanceAmtRange[0])}~{maintStr(maintenanceAmtRange[1])}</OptionArrowActive>
					
					{heatingItemSelected.length > 0 &&
					<OptionArrowActive>{convertCodeToStr(heatingList, heatingItemSelected)}</OptionArrowActive>
					}
					{parkingCnt > 0 &&
					<OptionArrowActive>#?????? {parkingCnt+"???"}</OptionArrowActive>
					}
					{tagsItemSelected.length > 0 &&
					<OptionArrowActive>#{convertCodeToTag(tagsList, tagsItemSelected)}</OptionArrowActive>
					}
					{etcItemSelected.length > 0 &&
					<OptionArrowActive>#{convertCodeToStr(etcOptList, etcItemSelected)}</OptionArrowActive>
					}

					<OptionArrowActive>#???????????? {areaStr(areaSizeRange[0])}~{areaStr(areaSizeRange[1])}</OptionArrowActive>

					<OptionArrowActive>#?????? {floorStr(floorRange)}</OptionArrowActive>
					{roomCnt > 0 &&	
					<OptionArrowActive>#????????? {roomCnt}</OptionArrowActive>
					}
					{bathCnt > 0 &&	
					<OptionArrowActive>#?????? {bathCnt}</OptionArrowActive>
					}
					
					{builtYear > 0 &&	
					<OptionArrowActive>#???????????? {builtYear <16 ? builtYear+"??? ??????": "15??? ??????" }</OptionArrowActive>
					}

					{livingItemSelected.length > 0 &&
					<OptionArrowActive>#??????????????? {convertCodeToStr(livingList, livingItemSelected)}</OptionArrowActive>
					}

					{heatingItemSelected.length > 0 &&
					<OptionArrowActive>#???/???????????? {convertCodeToStr(heatingList, heatingItemSelected)}</OptionArrowActive>
					}

					{securityItemSelected.length > 0 &&
					<OptionArrowActive>#???????????? {convertCodeToStr(securityList, securityItemSelected)}</OptionArrowActive>
					}

				</HeaderFilterTag>
			</HeaderFilterTagWrap>
			<Common.ScrollContainer paddingN>	
					<FilterList>
						<SaleDetailTitle>?????? ??????</SaleDetailTitle>
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
							<SaleDetailTitle2>?????????(?????????)</SaleDetailTitle2>
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
								//????????? ?????? ???
								selectedStyle={{
									height: 4,
									backgroundColor: Colors.mainColor,
								}}
								//?????? ???????????? ???
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
									<Common.TextLight12>5??????</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>?????????</Common.TextLight12>
								</LabelBoxR>
								
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					}
					{ ( priceListSelected.indexOf('monthly')>=0 )&&

					<FilterList paddingTN>
						<Common.FlexBetweenBox>
							<SaleDetailTitle2>??????</SaleDetailTitle2>
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
								//????????? ?????? ???
								selectedStyle={{
									height:4,
									backgroundColor: Colors.mainColor,
								}}
								//?????? ???????????? ???
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
									<Common.TextLight12>5?????????</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>?????????</Common.TextLight12>
								</LabelBoxR>
								
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					}

					{ ( priceListSelected.indexOf('sales')>=0 )&&
					<FilterList paddingTN>
						<Common.FlexBetweenBox>
							<SaleDetailTitle2>?????????</SaleDetailTitle2>
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
								//????????? ?????? ???
								selectedStyle={{
									height:4,
									backgroundColor: Colors.mainColor,
								}}
								//?????? ???????????? ???
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
									<Common.TextLight12>5??????</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>?????????</Common.TextLight12>
								</LabelBoxR>
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					}
					<FilterList borderT>
						<SaleDetailTitle>?????? ??????</SaleDetailTitle>
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
							<SaleDetailTitle2>????????????</SaleDetailTitle2>
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
								//????????? ?????? ???
								selectedStyle={{
									height:4,
									backgroundColor: Colors.mainColor,
								}}
								//?????? ???????????? ???
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
									<Common.TextLight12>33m??(10???)</Common.TextLight12>
								</LabelBox>
								<LabelBoxR>
									<SliderBottomBar/>
									<Common.TextLight12>?????????</Common.TextLight12>
								</LabelBoxR>
							</SliderLabelCont>
						</Common.View>
					</FilterList>
					<BorderTopView>
						<Collapse onToggle={(collapsed)=>{setCollapseList01(collapsed)}} isCollapsed={true}>
							<CollapseHeader style={ CollapseList01 ? filterStyle.CollapseTitleActive : filterStyle.CollapseTitle} >
								{CollapseList01 ? 
									<CollapseTitleActive><Common.TextSemiBold14>?????? ??????</Common.TextSemiBold14><CollapseIconActive /></CollapseTitleActive>
									:     <CollapseTitle><Common.TextSemiBold14>?????? ??????</Common.TextSemiBold14><CollapseIcon /></CollapseTitle>
								}
							</CollapseHeader>
							<CollapseBody>
								<FilterList>
									<Common.FlexBetweenBox>
										<SaleDetailTitle2>??????</SaleDetailTitle2>
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
											//????????? ?????? ???
											selectedStyle={{
												height:4,
												backgroundColor: Colors.mainColor,
											}}
											//?????? ???????????? ???
											trackStyle={{
												height:4,
												backgroundColor: Colors.textNonColors,
											}}
										/>
									</MultiSliderBox>
										<SliderLabelCont>
											<LabelBoxL>
												<SliderBottomBar/>
												<Common.TextLight12>?????????</Common.TextLight12>
											</LabelBoxL>
											<LabelBox>
												<SliderBottomBar/>
												<Common.TextLight12>7??? ??????</Common.TextLight12>
											</LabelBox>
											<LabelBoxR>
												<SliderBottomBar/>
												<Common.TextLight12>??????</Common.TextLight12>
											</LabelBoxR>
										</SliderLabelCont>
									</Common.View>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>?????????</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={roomCnt} idx={1} handler={handleOnRoomCntClick} title={"1???"}/>
										<BtnOpt cnt={roomCnt} idx={2} handler={handleOnRoomCntClick} title={"2???"}/>
										<BtnOpt cnt={roomCnt} idx={3} handler={handleOnRoomCntClick} title={"3???"}/>
										<BtnOpt cnt={roomCnt} idx={4} handler={handleOnRoomCntClick} title={"4??? ??????"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>??????</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={bathCnt} idx={1} handler={handleOnBathCntClick} title={"1???"}/>
										<BtnOpt cnt={bathCnt} idx={2} handler={handleOnBathCntClick} title={"2???"}/>
										<BtnOpt cnt={bathCnt} idx={3} handler={handleOnBathCntClick} title={"3???"}/>
										<BtnOpt cnt={bathCnt} idx={4} handler={handleOnBathCntClick} title={"4??? ??????"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>????????????</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={builtYear} idx={1} handler={handleOnBuiltYearClick} title={"1??? ??????"}/>
										<BtnOpt cnt={builtYear} idx={5} handler={handleOnBuiltYearClick} title={"5??? ??????"}/>
										<BtnOpt cnt={builtYear} idx={10} handler={handleOnBuiltYearClick} title={"10??? ??????"}/>
										<BtnOpt cnt={builtYear} idx={15} handler={handleOnBuiltYearClick} title={"15??? ??????"}/>
										<BtnOpt cnt={builtYear} idx={16} handler={handleOnBuiltYearClick} title={"1??? ??????"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<Common.FlexBetweenBox>
										<SaleDetailTitle2>?????????</SaleDetailTitle2>
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
												//????????? ?????? ???
												selectedStyle={{
													height:4,
													backgroundColor: Colors.mainColor,
												}}
												//?????? ???????????? ???
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
												<Common.TextLight12>16??????</Common.TextLight12>
											</LabelBox>
											<LabelBoxR>
												<SliderBottomBar/>
												<Common.TextLight12>?????????</Common.TextLight12>
											</LabelBoxR>
											</SliderLabelCont>
									</Common.View>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle>??? ?????? ??????</SaleDetailTitle>
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
									<SaleDetailTitle>????????????/????????????</SaleDetailTitle>
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
									<CollapseTitleActive><Common.TextSemiBold14>?????? ??? ?????? ??????</Common.TextSemiBold14><CollapseIconActive /></CollapseTitleActive>
									:     <CollapseTitle><Common.TextSemiBold14>?????? ??? ?????? ??????</Common.TextSemiBold14><CollapseIcon /></CollapseTitle>
								}
							</CollapseHeader>
							<CollapseBody>
								<FilterList>
									<Common.FlexBetweenBox>
										<SaleDetailTitle2>?????? ??????</SaleDetailTitle2>
										<Common.TextLight13>cctv, ????????????, ????????????, ???????????????...</Common.TextLight13>
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
									<SaleDetailTitle2>??????</SaleDetailTitle2>
									<FilterOptionBox>
										<BtnOpt cnt={parkingCnt} idx={1} handler={handleOnParkingCntClick} title={"????????????"}/>
										<BtnOpt cnt={parkingCnt} idx={2} handler={handleOnParkingCntClick} title={"????????? 1??? ??????"}/>
										<BtnOpt cnt={parkingCnt} idx={3} handler={handleOnParkingCntClick} title={"????????? 1.5??? ??????"}/>
									</FilterOptionBox>
								</FilterList>
								<FilterList paddingTN>
									<SaleDetailTitle2>?????? ??????</SaleDetailTitle2>
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
									<CollapseTitleActive><Common.TextSemiBold14>?????? ?????? #</Common.TextSemiBold14><CollapseIconActive /></CollapseTitleActive>
									:     <CollapseTitle><Common.TextSemiBold14>?????? ?????? #</Common.TextSemiBold14><CollapseIcon /></CollapseTitle>
								}
							</CollapseHeader>
							<CollapseBody>
								<FilterList>
									<SaleDetailTitle2>?????? ??????#</SaleDetailTitle2>
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
					<Common.TextLight14><Common.TextSemiBold14>?????? ????????? ??????</Common.TextSemiBold14>????????? ?????? ????????? ??????{"\n"}?????? ????????? ???????????? ???????????????.</Common.TextLight14>
				</FilterSaveInfoBox>
			</Common.ScrollContainer>
			<Common.FloatBtnBox>
				<Common.FloatBtnsss btnColor={Colors.whiteColor} onPress={()=>{handleInitFilter()} } ><Common.TextBold16>?????????</Common.TextBold16></Common.FloatBtnsss>		
				<Common.FloatBtnsss  onPress={()=>{ handleOnFilterCompleteClick(); navigation.navigate('salesList'); }} ><Common.TextBold16>?????? ??????</Common.TextBold16></Common.FloatBtnsss>
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
					<Common.TextBold16 style={{color:Colors.whiteColor,}}>?????? ??????</Common.TextBold16>
				</TouchableOpacity>
					*/}
			</Common.FloatBtnBox>
		</Common.ZipandaSafeView>
	)
}


export default ZipFilter;