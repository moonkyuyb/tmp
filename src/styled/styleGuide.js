
import { Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styleGuide = {

	// fontWeight style
	UltraLight: 200,
	Light: 300,
	Medium: 400,
	SemiBold: Platform.OS === 'android' ? 'bold' : 500,
	Bold: Platform.OS === 'android' ? 'bold' : 600,
	ExtraBold: Platform.OS === 'android' ? 'bold' : 800,

	//space (button's Bottom, Right ... space)
	Space: '4px',

	//border width
	BorderLineWidth: '0.5px',
	BorderWidth: '5px',
	BorderColor: '#f3f3f3',

	//btn
	BoxShadow: '0px 0px 4px rgba(0,0,0,0.12)',
	BlockRadius: '22px',
	
	//RadusBtnHeight
	RadusBtnHeight: '44px',
	
	//floatBtn
	BtnHeight: '48px',

	//smallBtn
	BtnRadius: '22px',
	BtnLineColor: '#000000',
	SmallBtnRadius: '3px',
	SmallHeight: '26px',
	SmallWidth: '60px',
	
	//form (input, select) style
	FormHeight: '38px',
	FormLine: '0.5px solid #929292',//textNonColors

	FormMarginB: prop=>prop.MarginNone ? 0 : '4px',



}
export default styleGuide;