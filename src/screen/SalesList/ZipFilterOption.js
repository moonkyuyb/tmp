import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

/* COMMON COMPONENTS */
import Colors from './../../../assets/colors';
import { filter } from 'lodash';
import { CustomSliderMarkerLeft, CustomSliderMarkerRight, SaleDetailTitle, SaleDetailTitle2 } from '../../components/filter/filter'
import { Option, OptionActive, OptionArrow, OptionArrowActive } from './../../components/filter/filterOption';

import * as Common from './../../styled/commonStyle';
import { filterStyle } from './../../styled/sales/filterStyle';
import { FilterContainer, HeaderFilterTag, FilterList, FilterOptionBox, MultiSliderBox, SliderLabelCont, LabelBox, LabelBoxL, LabelBoxR, SliderBottomBar} from '../../styled/sales/filterStyle';
import { minRange, maxRange, minMonthRange, maxMonthRange, minAreaRange, maxAreaRange, minFloorRange, maxFloorRange, minMaintRange, maxMaintRange, 
	floorStr, amtDivide, amtMonthDivide, areaStr, maintStr, convertCodeToStr, convertCodeToTag, viewWidth} from '../../utils/common/filterFunctions';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const ZipFilterOption = (prop) => {

	const navigation = useNavigation();

	//console.log("filter=====================")
	//console.log(prop.filter.currentFilter)
	const filters = prop.filter;
	const handlers = prop.handler;

	const currentFilter = filters.currentFilter;


	const priceList = filters.priceList;
	const saleTypeList = filters.saleTypeList;
	const livingList = filters.livingList;
	const heatingList = filters.heatingList;
	const securityList = filters.securityList;
	const etcOptList = filters.etcOptList;
	const tagsList = filters.tagsList;



	const priceListSelected = filters.priceListSelected;
	const saleTypeSelected = filters.saleTypeSelected;
	const livingItemSelected = filters.livingItemSelected;
	const heatingItemSelected = filters.heatingItemSelected;
	const securityItemSelected = filters.securityItemSelected;
	const etcItemSelected = filters.etcItemSelected;
	const tagsItemSelected = filters.tagsItemSelected;

	// 기타 카운트
	const roomCnt = filters.roomCnt;
	const bathCnt = filters.bathCnt;
	const builtYear = filters.builtYear;
	const parkingCnt = filters.parkingCnt;

	// 바 게이지
	const depositAmtRange = filters.depositAmtRange;
	const monthAmtRange = filters.monthAmtRange;
	const saleAmtRange = filters.saleAmtRange;

	const areaSizeRange = filters.areaSizeRange;
	const maintenanceAmtRange = filters.maintenanceAmtRange;
	const floorRange = filters.floorRange;


	const [option01, setOption01] = useState(false)
	const [option02, setOption02] = useState(false)
	const [option03, setOption03] = useState(false)
	const [option04, setOption04] = useState(false)
	const [option05, setOption05] = useState(false)
	const [option06, setOption06] = useState(false)
	const [option07, setOption07] = useState(false)

	useEffect(() => {
		const handleEffect = async (props) => {

		}
		handleEffect()
	}, [])

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

	const BtnOptionArrow = (props) =>{
		if (filters.currentFilter == props.opt){
			return (
				<OptionArrowActive onPress={() => { handlers.handleSetCurrentFilter(props.opt) }} >
					{props.title}
				</OptionArrowActive>
			)
		}else {
			return (
				<OptionArrow onPress={() => { handlers.handleSetCurrentFilter(props.opt) }} >
					{props.title}
				</OptionArrow>
			)
		}
	}

	return (
		<FilterContainer>
			<HeaderFilterTag horizontal={true} contentContainerStyle={{ paddingRight: 52 }}>
				<BtnOptionArrow opt={"option01"} title={"거래 유형"}/>
				<BtnOptionArrow opt={"option02"} title={"매물 유형"}/>
				<BtnOptionArrow opt={"option03"} title={"전용면적"}/>
				<BtnOptionArrow opt={"option04"} title={"층수"}/>
				<BtnOptionArrow opt={"option05"} title={"방 개수"}/>
				<BtnOptionArrow opt={"option06"} title={"욕실 개수"}/>
				<BtnOptionArrow opt={"option07"} title={"준공연차"}/>
				<BtnOptionArrow opt={"option08"} title={"관리금"}/>
				<BtnOptionArrow opt={"option09"} title={"방 내부 시설"}/>
				<BtnOptionArrow opt={"option10"} title={"냉/난방 시설"}/>
			</HeaderFilterTag>

				<Common.View style={[filterStyle.filterItemBox, filters.currentFilter == "option01" ? filterStyle.displayFlex : filterStyle.displayNone]} >
					<FilterList>
						<SaleDetailTitle>거래 유형</SaleDetailTitle>
						<FilterOptionBox>
							{
								priceList.length > 0 &&
								priceList.map((el) => {
									if(priceListSelected.indexOf(el.code) >= 0){
										return ( <OptionActive onPress={() => { handlers.handleOnPriceListClick(el.code); }} >{el.string}</OptionActive> )
									}else{
										return ( <Option onPress={() => { handlers.handleOnPriceListClick(el.code); }} >{el.string}</Option> )
									}
								})
							}
						</FilterOptionBox>
					</FilterList>

					{(priceListSelected.indexOf('lease') >= 0 || priceListSelected.indexOf('monthly') >= 0 || priceListSelected.indexOf('short') >= 0) &&

						<FilterList borderT>
							<Common.FlexBetweenBox>
								<SaleDetailTitle2>보증금(전세금)</SaleDetailTitle2>
								<Common.TextSemiBold13>{amtDivide(depositAmtRange[0])}~{amtDivide(depositAmtRange[1])}</Common.TextSemiBold13>
							</Common.FlexBetweenBox>
							<Common.View>
								<MultiSliderBox
									onLayout={this.onLayout}
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
											handlers.handleOnBarChange(1, el)
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

					{(priceListSelected.indexOf('monthly') >= 0) &&

						<FilterList borderT>
							<Common.FlexBetweenBox>
								<SaleDetailTitle2>월세</SaleDetailTitle2>
								<Common.TextSemiBold13>{amtMonthDivide(monthAmtRange[0])}~{amtMonthDivide(monthAmtRange[1])}</Common.TextSemiBold13>
							</Common.FlexBetweenBox>
							<Common.View>
								<MultiSliderBox
									onLayout={this.onLayout}
								>
									<MultiSlider
										values={monthAmtRange}
										onValuesChangeStart={() => {
											this.disableScroll
										}}

										onValuesChangeFinish={(el) => {
											handlers.handleOnBarChange(2, el)
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

					{(priceListSelected.indexOf('sales') >= 0) &&
						<FilterList borderT>
							<Common.FlexBetweenBox>
								<SaleDetailTitle2>매매가</SaleDetailTitle2>
								<Common.TextSemiBold13>{amtDivide(saleAmtRange[0])}~{amtDivide(saleAmtRange[1])}</Common.TextSemiBold13>
							</Common.FlexBetweenBox>
							<Common.View>
								<MultiSliderBox
									onLayout={this.onLayout}
								>
									<MultiSlider
										values={saleAmtRange}
										onValuesChangeStart={() => {
											this.disableScroll
										}}

										onValuesChangeFinish={(el) => {
											handlers.handleOnBarChange(3, el)
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
				</Common.View>
				
				<FilterList style={[filters.currentFilter == "option02" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<SaleDetailTitle>매물 유형</SaleDetailTitle>
					<FilterOptionBox>
						{
							saleTypeList.length > 0 &&
							saleTypeList.map((el) => {
								if(saleTypeSelected.indexOf(el.code) >= 0){
									return ( <OptionActive onPress={() => { handlers.handleOnSaleTypeClick(el.code); }} >{el.string}</OptionActive> )
								}else{
									return ( <Option onPress={() => { handlers.handleOnSaleTypeClick(el.code); }} >{el.string}</Option> )
								}
							})
						}
					</FilterOptionBox>
				</FilterList>
				<FilterList style={[filters.currentFilter == "option03" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<Common.FlexBetweenBox>
						<SaleDetailTitle2>전용면적</SaleDetailTitle2>
						<Common.TextSemiBold13>{areaStr(areaSizeRange[0])}~{areaStr(areaSizeRange[1])}</Common.TextSemiBold13>
					</Common.FlexBetweenBox>
					<Common.View>
						<MultiSliderBox
							onLayout={this.onLayout}
						>
							<MultiSlider
								values={areaSizeRange}
								onValuesChangeStart={() => {
									this.disableScroll
								}}

								onValuesChangeFinish={(el) => {
									handleOnBarChange(4, el);
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
								<Common.TextLight12>33m²(10평)</Common.TextLight12>
							</LabelBox>
							<LabelBoxR>
								<SliderBottomBar/>
								<Common.TextLight12>무제한</Common.TextLight12>
							</LabelBoxR>
						</SliderLabelCont>
					</Common.View>
				</FilterList>
					{
						<FilterList style={[filters.currentFilter == "option04" ? filterStyle.displayFlex : filterStyle.displayNone]}>
							<Common.FlexBetweenBox>
								<SaleDetailTitle2>층수</SaleDetailTitle2>
								<Common.TextSemiBold13>{floorStr(floorRange)}</Common.TextSemiBold13>
							</Common.FlexBetweenBox>
							<Common.View>
								<MultiSliderBox
									onLayout={this.onLayout}
								>
									<MultiSlider
										values={floorRange}
										onValuesChangeStart={() => {
											this.disableScroll
										}}

										onValuesChangeFinish={(el) => {
											handlers.handleOnBarChange(6, el);
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
					}

				<FilterList style={[filters.currentFilter == "option05" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<SaleDetailTitle2>방개수</SaleDetailTitle2>
					<FilterOptionBox>
						<BtnOpt cnt={roomCnt} idx={1} handler={handlers.handleOnRoomCntClick} title={"1개"}/>
						<BtnOpt cnt={roomCnt} idx={2} handler={handlers.handleOnRoomCntClick} title={"2개"}/>
						<BtnOpt cnt={roomCnt} idx={3} handler={handlers.handleOnRoomCntClick} title={"3개"}/>
						<BtnOpt cnt={roomCnt} idx={4} handler={handlers.handleOnRoomCntClick} title={"4개 이상"}/>
					</FilterOptionBox>
				</FilterList>
				<FilterList style={[filters.currentFilter == "option06" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<SaleDetailTitle2>욕실</SaleDetailTitle2>
					<FilterOptionBox>
						<BtnOpt cnt={bathCnt} idx={1} handler={handlers.handleOnBathCntClick} title={"1개"}/>
						<BtnOpt cnt={bathCnt} idx={2} handler={handlers.handleOnBathCntClick} title={"2개"}/>
						<BtnOpt cnt={bathCnt} idx={3} handler={handlers.handleOnBathCntClick} title={"3개"}/>
						<BtnOpt cnt={bathCnt} idx={4} handler={handlers.handleOnBathCntClick} title={"4개 이상"}/>
					</FilterOptionBox>
				</FilterList>
				<FilterList style={[filters.currentFilter == "option07" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<SaleDetailTitle2>준공연차</SaleDetailTitle2>
					<FilterOptionBox>
						<BtnOpt cnt={builtYear} idx={1} handler={handlers.handleOnBuiltYearClick} title={"1년 이내"}/>
						<BtnOpt cnt={builtYear} idx={5} handler={handlers.handleOnBuiltYearClick} title={"5년 이내"}/>
						<BtnOpt cnt={builtYear} idx={10} handler={handlers.handleOnBuiltYearClick} title={"10년 이내"}/>
						<BtnOpt cnt={builtYear} idx={15} handler={handlers.handleOnBuiltYearClick} title={"15년 이내"}/>
						<BtnOpt cnt={builtYear} idx={16} handler={handlers.handleOnBuiltYearClick} title={"1년 이상"}/>
					</FilterOptionBox>
				</FilterList>
				<FilterList style={[filters.currentFilter == "option08" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<Common.FlexBetweenBox>
						<SaleDetailTitle2>관리금</SaleDetailTitle2>
						<Common.TextSemiBold13>{maintStr(maintenanceAmtRange[0])}~{maintStr(maintenanceAmtRange[1])}</Common.TextSemiBold13>
					</Common.FlexBetweenBox>
					<Common.View>
						<Common.View
							style={filterStyle.MultiSliderBox}
							onLayout={this.onLayout}
						>
							<MultiSlider
								values={[minMaintRange, maxMaintRange]}
								onValuesChangeStart={() => {
									this.disableScroll
								}}

								onValuesChangeFinish={(el) => {
									handlers.handleOnBarChange(5, el);
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
						</Common.View>
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
				<FilterList style={[filters.currentFilter == "option09" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<SaleDetailTitle>방 내부 시설</SaleDetailTitle>
					<FilterOptionBox>
						{
							livingList.length > 0 &&
							livingList.map((el) => {
								if(livingItemSelected.indexOf(el.code) >= 0){
									return ( <OptionActive onPress={() => { handlers.handleOnLivingItemClick(el.code); }} >{el.string}</OptionActive> )
								}else{
									return ( <Option onPress={() => { handlers.handleOnLivingItemClick(el.code); }} >{el.string}</Option> )
								}
							})

						}
					</FilterOptionBox>
				</FilterList>
				<FilterList style={[filters.currentFilter == "option10" ? filterStyle.displayFlex : filterStyle.displayNone]}>
					<SaleDetailTitle>난방방식/냉방시설</SaleDetailTitle>
					<FilterOptionBox>
						{
							heatingList.length > 0 &&
							heatingList.map((el) => {
								if(heatingItemSelected.indexOf(el.code) >= 0){
									return ( <OptionActive onPress={() => { handlers.handleOnHeatingItemClick(el.code); }} >{el.string}</OptionActive> )
								}else{
									return ( <Option onPress={() => { handlers.handleOnHeatingItemClick(el.code); }} >{el.string}</Option> )
								}
							})
						}
					</FilterOptionBox>
				</FilterList>

			{currentFilter != "" &&
				<Common.FloatBtnBox borderN>
					<Common.FloatBtnsss btnBorder btnBorderRN btnColor={Colors.bgColor}><Common.TextBold16>취소</Common.TextBold16></Common.FloatBtnsss>
					<Common.FloatBtnsss btnBorder style={[{backgroundColor: Colors.mainColor }]} onPress={() => { handlers.handleOnFilterCompleteClick(); }} >
						<Common.TextBold16>초기화</Common.TextBold16>
					</Common.FloatBtnsss>
				</Common.FloatBtnBox>
			}

		</FilterContainer>
	)
}

export default ZipFilterOption;