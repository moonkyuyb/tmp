import styled from 'styled-components/native';
import Colors from '../../assets/colors';
import styleGuide from './styleGuide';
import { Dimensions } from 'react-native';

///////////////////////////////////
//////////////layout///////////////

//ZipandaSafeView // 모든페이지 wrap
export const ZipandaSafeView = styled.SafeAreaView` 
	flex: 100%;
	background-color: ${props => props.bgColor || Colors.whiteColor};
`

//container 
//scroll 있을 때
export const ScrollContainer = styled.ScrollView.attrs(props => ({
		contentContainerStyle: {
			paddingVertical: props.paddingN ? 0 : 24
		}
  	}))` 
	padding: ${props => props.paddingN ? 0 : '0px 20px'};
	flex: auto;
`
//상하 좌우 중앙정렬d
export const VerticalCenter = styled.View` 
	/* background-color: red; */
	width: 100%;
	flex: auto;
	justify-content: center;
	align-items: center;
	padding: ${props => props.paddingN ? 0 : '20px 24px'};

`
//
export const View = styled.View`
	margin-right: ${props => props.marginR || 0}px;
	margin-top: ${props => props.marginT || 0}px;
	margin-Bottom: ${props => props.marginB || 0}px;
	padding-left: ${props => props.paddingL || 0}px;
	padding-right: ${props => props.paddingR || 0}px;
`
//Flex
export const FlexRowBox = styled(View)`
	flex-direction: ${props => props.column ? 'column' : 'row'};
	align-items: ${props => props.ViewAlign || 'center'};
`
export const FlexBetweenBox = styled(FlexRowBox)`
	justify-content: space-between;
`
export const FlexCenter = styled(FlexRowBox)`
	justify-content: center;
`
//btn
export const FlexRowBtn = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-left: ${props => props.marginL || 0};
`
//FlexSpaceWrap ( -4 margin )
export const FlexSpaceWrap = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
	margin-left: -${styleGuide.Space};
`


///////////////////////////////////
///////////////////////////////////
//////////////btn//////////////////
export const TouchableOpacity = styled.TouchableOpacity`
	justify-content: center;
	margin-right: ${props => props.marginR || 0}px;
	margin-left: ${props => props.marginL || 0}px;
`
//Radius Btn
export const RadiusBtn = styled(TouchableOpacity)`	
	align-items: center;
	width: 100%;
	flex-direction: row;
	height: ${styleGuide.RadusBtnHeight};
	background-color: ${props => props.btnColor ? props.btnColor : Colors.mainColor };
	margin-Bottom: ${props => props.marginB ? props.marginB : 4 }px;
	border-radius: ${styleGuide.BlockRadius};
  	box-shadow: ${styleGuide.BoxShadow};
	border-color: ${props => props.color? props.color : Colors.blackColor };
	border-width: ${ props => props.border ? styleGuide.BorderLineWidth : 0};
`
//Small Btn
export const SmallBtn = styled(TouchableOpacity)`
	align-items: center;
	height: ${styleGuide.SmallHeight};
	min-width: ${styleGuide.SmallWidth};
	padding: 0 6px;
	border: ${styleGuide.BorderLineWidth} solid ${styleGuide.BtnLineColor};
  	border-radius: ${styleGuide.SmallBtnRadius};
	background-color: ${props => props.btnColor ? props.btnColor : Colors.whiteColor};
`
//
//bottom Btn
export const FloatBtn = styled.TouchableOpacity`
	bottom: 0;
	height: ${styleGuide.BtnHeight};
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.btnColor || Colors.mainColor};
`
//bottom btns box
export const FloatBtnBox = styled.View`
	bottom: 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
  	box-shadow: ${styleGuide.BoxShadow};
	/* border-top-width: ${props=> props.borderN ? 0 : styleGuide.BorderWidth}; */
	/* border-top-color: ${styleGuide.BorderColor}; */
`
export const FloatBtnsss = styled(FloatBtn)`
	flex: auto;
	border-width: ${props => props.btnBorder ? styleGuide.BorderLineWidth : 0 };
	border-color: ${props => props.btnBorder ? Colors.blackColor: 'rgba(0,0,0,0)' };
	border-right-width: ${props => props.btnBorderRN ? 0 : styleGuide.BorderLineWidth };
`

///////////////////////////////////
///////////////image///////////////
export const Image = styled.Image`
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	margin-right: ${props=> props.marginR || 0}px;
	margin-left: ${props=> props.marginL || 0}px;
	margin-bottom: ${props=> props.marginB || 0}px;
	margin-top: ${props=> props.marginT || 0}px;
`
// datepicker , selectPicker Icon
export const InputIconS = styled.Image`
	position: absolute;
	width: 24px;
	height: 24px;
	top: 6px;
	right: 8px;
	z-index: 99;
`

///////////////////////////////////
////////////////Text///////////////
// FlexView //박스 (텍스트가) 넘치지 않게 텍스트 감싸는 view
export const FlexView = styled.View` 
	flex: 1;
	margin-right: ${props => props.marginR || 0}px;
	padding-right: ${props => props.paddingR || 0}px;
	/* border: 1px solid red; */
`
//Text
export const Text = styled.Text`
	color: ${props => props.color || Colors.blackColor };
	margin-top: ${props => props.marginT || 0}px;
	margin-bottom: ${props => props.marginB || 0}px;
	margin-left: ${props => props.marginL || 0}px;
	margin-right: ${props => props.marginR || 0}px;
	text-align: ${props=> props.align || 'left'};
	padding: ${props=> props.lineHeight ? '2px 0' : 0};
`
//28
export const TextBold28 = styled(Text)`
	font-size: 28px;
	font-weight: ${styleGuide.Bold};
	line-height: ${props=> props.paragraph ? 32 : 28}px;
`
export const TextExtraBold28 = styled(TextBold28)`
	font-weight: ${styleGuide.ExtraBold};
`
//24
export const TextBold24 = styled(Text)`
	font-size: 24px;
	font-weight: ${styleGuide.Bold};
`
export const TextUltraLight24 = styled(TextBold24)`
	font-weight: ${styleGuide.UltraLight};
`
//22
export const TextUltraLight22 = styled(Text)`
	font-size: 22px;
	font-weight: ${styleGuide.UltraLight};
`
export const TextSemiBold22 = styled(TextUltraLight22)`
	font-weight: ${styleGuide.SemiBold};
`
//20
export const TextLight20 = styled(Text)`
	font-size: 20px;
	font-weight: ${styleGuide.Light};
	line-height: ${props=> props.paragraph ? 23 : 20}px;
`
export const TextSemiBold20 = styled(TextLight20)`
	font-weight: ${styleGuide.SemiBold};
`
export const TextUltraLight20 = styled(TextLight20)`
	font-weight: ${styleGuide.UltraLight};
`
export const TextBold20 = styled(TextLight20)`
	font-weight: ${styleGuide.Bold};
`
//18
export const TextSemiBold18 = styled(Text)`
	font-size: 18px;
	font-weight: ${styleGuide.SemiBold};
`
export const TextBold18 = styled(TextSemiBold18)`
	font-weight: ${styleGuide.Bold};
`
export const TextLight18 = styled(TextSemiBold18)`
font-weight: ${styleGuide.Light};
`
export const TextUltraLight18 = styled(TextSemiBold18)`
	font-weight: ${styleGuide.UltraLight};
`


//16
export const TextSemiBold16 = styled(Text)`
	font-size: 16px;
	font-weight: ${styleGuide.SemiBold};
	line-height: ${props=> props.paragraph ? 20 : 16}px;
`
export const TextBold16 = styled(TextSemiBold16)`
	font-weight: ${styleGuide.Bold};
`
export const TextMedium16 = styled(TextSemiBold16)`
	font-weight: ${styleGuide.Medium};
`
export const TextLight16 = styled(TextSemiBold16)`
	font-weight: ${styleGuide.Light};	
`
export const TextUltraLight16 = styled(TextSemiBold16)`
	font-weight: ${styleGuide.UltraLight};	
`
//15
export const TextMedium15 = styled(Text)`
	font-size: 15px;
	font-weight: ${styleGuide.Medium};
	line-height: ${props=> props.paragraph ? 19 : 15}px;
`
export const TextLight15 = styled(TextMedium15)`
	font-weight: ${styleGuide.Light};
`
export const TextSemiBold15 = styled(TextMedium15)`
	font-weight: ${styleGuide.SemiBold};
`
//14
export const TextLight14 = styled(Text)`
	font-size: 14px;
	font-weight: ${styleGuide.Light};
	line-height: ${props=> props.paragraph ? 18 : 14}px;
`
export const TextUltraLight14 = styled(Text)`
	font-weight: ${styleGuide.UltraLight};
`
export const TextMedium14 = styled(TextLight14)`
	font-weight: ${styleGuide.Medium};
`
export const TextSemiBold14 = styled(TextLight14)`
	font-weight: ${styleGuide.SemiBold};
`
export const TextBold14 = styled(TextLight14)`
	font-weight: ${styleGuide.Bold};
`

//13
export const TextSemiBold13 = styled(Text)`
	font-size: 13px;
	font-weight: ${styleGuide.SemiBold};
`
export const TextBold13 = styled(TextSemiBold13)`
font-weight: ${styleGuide.Bold};
`
export const TextLight13 = styled(TextSemiBold13)`
	font-size: 13px;
	font-weight: ${styleGuide.Light};
`
export const TextMedium13 = styled(TextSemiBold13)`
font-weight: ${styleGuide.Medium};
`

//12
export const TextLight12 = styled(Text)`
	font-size: 12px;
	font-weight: ${styleGuide.Light};
	line-height: ${props=> props.paragraph ? 16 : 12}px;
`
export const TextUltraLight12 = styled(TextLight12)`
	font-weight: ${styleGuide.UltraLight};
`
export const TextMedium12 = styled(TextLight12)`
	font-weight: ${styleGuide.Medium};
`
export const TextBold12 = styled(TextLight12)`
	font-weight: ${styleGuide.Bold};
`
export const TextSemiBold12 = styled(TextLight12)`
	font-weight: ${styleGuide.SemiBold};
`
//11
export const TextUltraLight11 = styled(Text)`
	font-size: 11px;
	font-weight: ${styleGuide.UltraLight};
	color: ${props => props.color ? props.color : Colors.blackColor };
`
export const TextSemiBold11 = styled(TextUltraLight11)`
	font-weight: ${styleGuide.SemiBold};
`
export const TextLight11 = styled(TextUltraLight11)`
	font-weight: ${styleGuide.Light};
`
export const TextBold11 = styled(TextUltraLight11)`
	font-weight: ${styleGuide.Bold};
`
export const TextMedium11 = styled(TextUltraLight11)`
	font-weight: ${styleGuide.Medium};
`
//10
export const TextMedium10 = styled(Text)`
	font-size: 10px;
	font-weight: ${styleGuide.Medium};
`

//title
export const TitleBox = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding-top: ${styleGuide.Space};
	padding-bottom: ${props => props.paddingBNone ? 0 : 3 }px;
	border-bottom-color: ${Colors.blackColor};
  	border-bottom-width: ${styleGuide.BorderLineWidth};
	margin-bottom: ${props => props.marginB || 0}px;
	margin-top: ${props => props.marginT || 0}px;
`;
export const Title = styled(TextSemiBold16)`
	line-height: 24px;
`;
export const SubTitle = styled(TextSemiBold14)`
	margin-bottom: ${props => props.marginBN ? 0 : 8}px;;
	margin-top: ${props => props.marginTN ? 0 : 18}px;
	margin-left: ${props => props.marginL || 0}px;
`;


////////////////Form///////////////
export const InputBorder = styled.TextInput`
	justify-content: ${ props => props.alignH || 'center'};
	font-size: 14px;
	font-weight: ${styleGuide.Light};
	width: 100%;
	height: ${styleGuide.FormHeight}; 
	border: ${styleGuide.FormLine};
	border-color: ${props => props.borderColor || Colors.textNonColors};
	padding: 0 12px;
	margin-bottom: ${props => props.marginBN ? 0 : styleGuide.FormMarginB};
	background-color: ${props => props.bgColor || Colors.whiteColor};
`
export const ViewBorder = styled.View`
	justify-content: ${ props => props.alignH || 'center'};
	width: 100%;
	height: ${styleGuide.FormHeight}; 
	border: ${styleGuide.FormLine};
	border-color: ${props => props.borderColor || Colors.textNonColors};
	padding: 0 9px;
	margin-bottom: ${props => props.marginBN ? 0 : styleGuide.FormMarginB};
	background-color: ${props => props.bgColor || Colors.whiteColor};
`
export const ViewBorderBtn = styled.TouchableOpacity`
	justify-content: ${ props => props.alignH || 'center'};
	width: 100%;
	height: ${styleGuide.FormHeight}; 
	border: ${styleGuide.FormLine};
	border-color: ${props => props.borderColor || Colors.textNonColors};
	align-items: flex-start;
	padding: 0 9px;
	background-color: ${props => props.bgColor || Colors.whiteColor};
	margin-bottom: ${props => props.marginBN ? 0 : styleGuide.FormMarginB};
`

const HalfBoxWidth = (Dimensions.get('window').width /2 - 22);
export const ViewBorderHalfBtn = styled(ViewBorderBtn)`

	width: ${HalfBoxWidth};
	margin-left: 4px;
`
export const InputBorderHalf = styled(InputBorder)`

	width: ${HalfBoxWidth};
	margin-left: 4px;
`
export const ViewBorderText = styled(TextLight14)`
	color: ${props => props.color || Colors.blackColor};
`

////////////////11///////////////
//cont faq, event, notice
export const PaddingH20 = styled.View`
	padding-left: 20px;
	padding-right: 20px;
`
//cont faq, event, notice
export const YellowBox20 = styled.View`
	background-color: ${Colors.mainColor};
	padding: 13px 20px 10px 20px;
	justify-content: center;
	min-height: 42px;
`;




//Go home
export const GohomeWrap = styled.View`
	margin-top: 20%;
`
export const GoHomeBox = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	height: 38px;
	margin-top: ${props => props.marginT ? props.marginT : '30%'};
	margin-bottom: ${props => props.marginT ? props.marginB : '20%'};
	padding-left: 18px;
	padding-right: 20px;
	border-radius: 50px;
	border-width: 0.5px;
	border-color: ${Colors.blackColor};
	background-color: ${Colors.whiteColor};
`
export const GoHomeText = styled(TextSemiBold14)`
	margin-left: 9px;
`










































export const ScrollView = styled.ScrollView``


//flexBox
export const FlexBox = styled.View`
	flex: auto;
`

export const CenterWrap = styled.View`
`
//flex size


//borderBottom 5
export const ContBorder = styled.View`
	/* padding-left: 20px;
	padding-right: 20px;
  	border-bottom-width: 5px;
	border-bottom-color: ${Colors.borderBottomColors}; */
`;

//yellow Box
// export const YellowBox24 = styled.View`
// 	flex-direction: row;
// 	justify-content: space-between;
// 	align-items: center;
// 	background-color: ${Colors.mainColor};
// 	padding: 8px 20px 6px 20px;
// `;



//YellowBtn small
export const YellowBtn = styled.TouchableOpacity`

`
//big
export const YellowBtnB = styled.TouchableOpacity`

`
//WhiteBtn small
export const WhiteBtn = styled.TouchableOpacity`

`




// //radio
// export const RadioTitleBox = styled.View`
// 	flex-direction: row;
// 	justify-content: space-between;
// 	align-items: center;
// 	margin-bottom: 10px;
// 	margin-top: 4px;
// `;
// export const RadioBox = styled.TouchableOpacity`
// 	flex-direction: row;
// 	align-items: center;
// 	margin-left: -4px;
// `;
// export const RadioLable = styled.Text`
// 	font-size: 12px;
// `;

//////////////////////////////////////////제거

// export const FlexHalf = styled.SafeAreaView`
// `
// export const FlexAThird = styled.SafeAreaView`
// `
// export const FlexQuarter = styled.SafeAreaView`
// `

// start 제거
// export const BtnWhiteText = styled.Text``
// export const BottomBtn3W = styled.TouchableOpacity``
// export const BottomBtn3Y = styled.TouchableOpacity``
// export const BottomBtn3B = styled.TouchableOpacity``


// export const Container = styled(ZipandaSafeView)``

// export const ScrollContainer20 = styled.View``
// export const ScrollContainerB = styled.View``
// export const ScrollContainer20B = styled.View``

// export const BottomBtnWrapper = styled.View``
// export const BottomBtn2Box = styled.View``
// export const BottomBtn3Box = styled.View``


// //Text Box
// export const TextBoxR = styled.View``
// export const TextBoxL = styled.View``

// //FloatBtns
// export const BottomBtn2 = styled.TouchableOpacity``
// export const BottomBtn3 = styled.TouchableOpacity``


// export const TextBold22 = styled.Text`
// 	font-size: 22px;
// 	font-weight: ${Platform.OS === 'android' ? 'bold' : 600 };
// `
//18



//15
// export const TextBold15 = styled.Text`
// 	font-size: 15px;
// 	font-weight: ${Platform.OS === 'android' ? 'bold' : 600 };
// `
// //14



//13



//11


 //10

// export const TextBold10 = styled.Text`
// 	font-size: 10px;
// 	line-height: 15px;
// 	font-weight: ${Platform.OS === 'android' ? 'bold' : 600 };
// 	color : ${props => props.whiteTit ? Colors.whiteColor : Colors.blackColor };
// `


// // image 제거
// export const Image48 = styled(Image)`
// 	width: 48px;
// 	height: 48px;
// `
// export const Image45 = styled(Image)`
// 	width: 45px;
// 	height: 45px;
// `
// export const Image40 = styled(Image)`
// 	width: 40px;
// 	height: 40px;
// `
// export const Image34 = styled(Image)`
// 	width: 34px;
// 	height: 34px;
// `
// export const Image32 = styled(Image)`
// 	width: 32px;
// 	height: 32px;
// `
// export const Image30 = styled.Image`
// 	width: 30px;
// 	height: 30px;
// `
// export const Image28 = styled.Image`
// 	width: 28px;
// 	height: 28px;
// `
// export const Image26 = styled.Image`
// 	width: 26px;
// 	height: 26px;
// `
 export const Image24 = styled.Image`
 	width: 24px;
 	height: 24px;
 `
// export const Image20 = styled.Image`
// 	width: 20px;
// 	height: 20px;
// `
// export const Image18 = styled.Image`
// 	width: 18px;
// 	height: 18 ;
// `
// export const Image16 = styled.Image`
// 	width: 16px;
// 	height: 16px;
// `
// export const Image15 = styled.Image`
// 	width: 15px;
// 	height: 15px;
// `
// export const Image14 = styled.Image`
// 	width: 14px;
// 	height: 14px;
// `
// export const Image12 = styled.Image`
// 	width: 12px;
// 	height: 12px;
// `

