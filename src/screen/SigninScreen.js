/* COMMON */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* REACT HOOK FORM */
import { Controller, useForm } from "react-hook-form";

/* UTILS & REDUCER */
import { setCentralState } from '../reducers/centralReducer';

/* UI COMPONENTS */
import Colors from '../../assets/colors';
import * as Common from '../styled/commonStyle';
import { AlertModal } from '../container/centralContainer';
import { SignInInputList, SignInInfoBox, SignInInput, SNSSignInBox, SNSSignInBtn } from '../styled/signStyle/signInStyle';
import FlexRowCheckBox from '../components/common/FlexRowCheckBox';
import { Button } from 'react-native';

// apple login 
import { appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
import { v4 as uuid } from 'uuid'

// naver login
import { NaverLogin, getProfile as getNaverProfile } from "@react-native-seoul/naver-login";

//google login
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
	//webClientId: '99960216884-rph7k3nnu9upib772f4b9gbop9gtfk91.apps.googleusercontent.com',
	webClientId: '190854026241-d8rcdc5bge3ghblhsq9bc4r4a2jji17t.apps.googleusercontent.com',
})
// kakao login
import KakaoSDK from '@actbase/react-kakaosdk';

/*import {
	KakaoOAuthToken,
	KakaoProfile,
	getProfile as getKakaoProfile,
	login,
	logout,
	unlink,
} from '@react-native-seoul/kakao-login';
*/
const SigninScreen = ({
	signinMail, token
}) => {

	//GET ROUTE & NAVIGATION & REDUX STATE
	const route = useRoute(), navigation = useNavigation()
	const { loading, needGoBack } = useSelector(state => state.centralReducer)
	const member = useSelector(state => state.memberReducer.member)
	const dispatch = useDispatch()

	//UI STATES

	//REACT HOOK FORM
	const { control, handleSubmit } = useForm()
	const onValid = async (data) => {
		dispatch(setCentralState({ loading: true }))
		signinMail(data)
	};
	const onInvalid = err => {
		console.log(`[💬SIGNIN SCREEN] VALIDATON FAIL`);
		const errList = ['m_auth_provider', 'm_username', 'm_password']
		for (let i = 0; i < errList.length; i++) {
			if (err[errList[i]]) {
				setCentralState({ alertMsg: err[errList[i]]['message'] }); break;
			} else if (i == errList.length - 1) {
				setCentralState({ alertMsg: `필수 입력 내용을 다시 확인해주세요` });
			}
		}
	}

	//HANDLE EFFECTS
	useEffect(() => {
		const handleEffect = async () => { /* ... */ }
		handleEffect()
	}, [])

	useEffect(() => {
		if (member) {
			dispatch(setCentralState({ needGoBack: 1 }))
		}
	}, [member])

	useEffect(() => {
		if (needGoBack) {
			const goBackCount = needGoBack + 0
			dispatch(setCentralState({ needGoBack: null }))
			navigation.dispatch(StackActions.pop(goBackCount))
		}
	}, [needGoBack])

	const iosKeys = {
		kConsumerKey: "ydMR8088OZqao1xIazzR",
		kConsumerSecret: "UxDK3HCgIl",
		kServiceAppName: "집판다",
		kServiceAppUrlScheme: "com.ybnet.zipanda" // only for iOS
	};

	const androidKeys = {
		kConsumerKey: "ydMR8088OZqao1xIazzR",
		kConsumerSecret: "UxDK3HCgIl",
		kServiceAppName: "집판다"
	};
	const initials = Platform.OS === "ios" ? iosKeys : androidKeys;
	const [naverToken, setNaverToken] = React.useState(null);


	const goSignInComplete = (data) => {

		//snsSignIn(data);
	}



	const naverLogin = props => {
		return new Promise((resolve, reject) => {
			NaverLogin.login(props, (err, token) => {
				//console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
				//console.log("naver login========================================================");
				//console.log(token);
				//setNaverToken(token);
				//getUserProfile();
				if (err) {
					reject(err);
					return;
				}
				resolve(token);
			});

		});
	};

	const naverLogout = () => {
		NaverLogin.logout();
		setNaverToken("");
	};




	useEffect(() => {
		// onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
		KakaoSDK.init("c2e55b6dbe7fdb19d1af5422eff956ce")
		if (Platform.OS == 'ios') {
			return appleAuth.onCredentialRevoked(async () => {
				console.warn('If this function executes, User Credentials have been Revoked');
			});
		}

	}, [])

	async function onAppleButtonPress() {

		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});

		const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

		// use credentialState response to ensure the user is authenticated
		if (credentialState === appleAuth.State.AUTHORIZED) {
			// user is authenticated
			console.log("===================appleAuthRequestResponse===================")
			console.log(appleAuthRequestResponse)
			const { email, email_verified, is_private_email, sub } = jwt_decode(appleAuthRequestResponse.identityToken)


			goSignInComplete({ provider: 'APPLE', id: appleAuthRequestResponse.identityToken, name: appleAuthRequestResponse.fullName.familyName == null ? "" : appleAuthRequestResponse.fullName.familyName + appleAuthRequestResponse.fullName.givenName == null ? "" : appleAuthRequestResponse.fullName.givenName, email: email, mobile: '' });

		}

	}

	function onAndroidAppleButtonPress() {
		// Generate secure, random values for state and nonce
		const rawNonce = uuid();
		const state = uuid();

		// Configure the request
		appleAuthAndroid.configure({
			// The Service ID you registered with Apple
			clientId: 'com.ybnet.zipanda',

			// Return URL added to your Apple dev console. We intercept this redirect, but it must still match
			// the URL you provided to Apple. It can be an empty route on your backend as it's never called.
			redirectUri: 'http://1.227.192.243:8000/data/html/appleLogin.html',

			// The type of response requested - code, id_token, or both.
			responseType: appleAuthAndroid.ResponseType.ALL,

			// The amount of user information requested from Apple.
			scope: appleAuthAndroid.Scope.ALL,

			// Random nonce value that will be SHA256 hashed before sending to Apple.
			nonce: rawNonce,

			// Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
			state,
		});

		// Open the browser window for user sign in
		appleAuthAndroid.signIn();
		console.log("===================appleAuthAndroid===================")
		appleAuthAndroid.signIn()
			.then((response) => {
				const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
				const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
				const user = response.user; // Present when user first logs in using appleId
				const state = response.state; // A copy of the state value that was passed to the initial request.
				const { email, email_verified, is_private_email, sub } = jwt_decode(id_token)

				goSignInComplete({ provider: 'APPLE', id: id_token, name: appleAuthRequestResponse.fullName.familyName == null ? "" : appleAuthRequestResponse.fullName.familyName + appleAuthRequestResponse.fullName.givenName == null ? "" : appleAuthRequestResponse.fullName.givenName, email: email, mobile: '' });

			})
			.catch((err) => {
				showAlertMessage("카카오에 로그인할 수 없습니다.");

			})
		/*
		console.log(response)
		*/
		// Send the authorization code to your backend for verification
	}


	const signInWithKakao = () => {
		
		KakaoSDK.login()
		.then((result)=>{
			console.log(result)
		})
		.catch((err)=>{
			console.log(err);
				showAlertMessage("카카오에 로그인할 수 없습니다.");
		})
	

/*
		login()
			.then((result) => {
				//console.log(result);

				getKakaoProfile(result.accessToken)
					.then((result) => {
						//console.log("profile==============================");
						//console.log(result);
						goSignInComplete({ provider: 'KAKAO', id: result.id, name: result.nickname, email: result.email, mobile: '' });

					})
			})
			.catch((err) => {
				console.log(err);
				showAlertMessage("카카오에 로그인할 수 없습니다.");
			})
*/

		};
/*
	const signOutWithKakao = async () => {
		const message = await logout();

		//setResult(message);
	};


	const unlinkKakao = async () => {
		const message = await unlink();

		//setResult(message);
	};
*/


	function handleGoogleSingin() {
		GoogleSignin.signIn()
			.then((result) => {

				console.log("google login success ======= ======= ======= ======= =======")
				//console.log(result.user);	

				goSignInComplete({ provider: 'GOOGLE', id: result.user.id, name: result.user.familyName + result.user.givenName, email: result.user.email, mobile: '' });
			})
			.catch((err) => {
				console.log("google login fail ======= ======= ======= ======= =======")
				console.log(err);
				showAlertMessage("구글에 로그인할 수 없습니다.");

			});


		//const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		//return auth().signInWithCredential(googleCredential);
	}
	async function handleSignout() {
		await GoogleSignin.signOut();
		auth().signOut()
	}
	return (<>
		<Common.ZipandaSafeView>
			{/* <Button title="TEST" onPress={()=>{console.log(token);}}/> */}
			<AlertModal />
			<Common.ScrollContainer>
				<Common.VerticalCenter>
					<Controller control={control} name="m_auth_provider" rules={{ required: true }} defaultValue={'AP_EMAIL'} render={() => (null)} />
					<SignInInputList>
						<Common.Image size={32} source={require('../../assets/img/drawable-xhdpi/icon_login_id.png')} />
						<Controller
							control={control} name="m_username" rules={{ required: { value: true, message: '아이디를 입력하세요' } }} defaultValue={'dev@ybnet.works'}
							render={({ field }) => (<SignInInput value={field.value} onChangeText={field.onChange} placeholder={'아이디(이메일)입력'} />)}
						/>
					</SignInInputList>
					<SignInInputList>
						<Common.Image size={32} source={require('../../assets/img/drawable-xhdpi/icon_login_pass.png')} />
						<Controller
							control={control} name="m_password" rules={{ required: { value: true, message: '비밀번호를 입력하세요' } }} defaultValue={'ybn2021!'}
							render={({ field }) => (<SignInInput value={field.value} onChangeText={field.onChange} placeholder={'패스워드 입력'} secureTextEntry={true} />)}
						/>
					</SignInInputList>
					<SignInInfoBox>
						<Controller
							control={control} name="keepSignin" defaultValue={false}
							render={({ field }) => (<FlexRowCheckBox value={field.value} onPress={() => { field.onChange(!field.value) }} title={'로그인 상태 유지'} />)}
						/>
						<Common.View>
							<Common.FlexRowBtn onPress={() => { navigation.navigate("findPW"); }}>
								<Common.TextSemiBold14>비밀번호를 잊으셨나요?</Common.TextSemiBold14>
								<Common.Image size={24} source={require('../../assets/img/drawable-xhdpi/bt_sub_back.png')} />
							</Common.FlexRowBtn>
						</Common.View>
					</SignInInfoBox>
					<Common.RadiusBtn btnColor={Colors.mainColor} onPress={handleSubmit(onValid, onInvalid)}>
						{loading ? (<ActivityIndicator size='small' color='#242424' />) : (<Common.TextBold18>로그인</Common.TextBold18>)}
					</Common.RadiusBtn>
					<Common.RadiusBtn btnColor={Colors.blackColor} onPress={() => { navigation.navigate('signup') }}>
						<Common.TextBold18 color={Colors.mainColor} signUp>회원가입</Common.TextBold18>
					</Common.RadiusBtn>
					<SNSSignInBox>
						<SNSSignInBtn onPress={() => { signInWithKakao(); }}>
							<Common.Image size={24} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_kakao.png')} />
							<Common.TextMedium14>카카오 계정으로{"\n"}시작하기</Common.TextMedium14>
						</SNSSignInBtn>
						<SNSSignInBtn SnsSignInR onPress={() => {

							naverLogin(initials)
								.then((result) => {
									getNaverProfile(result.accessToken)
										.then((result) => {
											//console.log("naver login ======= ======= ======= ======= =======")
											//console.log(result);
											var response = result.response;
											goSignInComplete({ provider: 'NAVER', id: response.id, name: response.name, email: response.email, mobile: response.mobile });

										})
										.catch((err) => {
											console.log("naver login fail ======= ======= ======= ======= =======")
											console.log(err);
											showAlertMessage("네이버에 로그인할 수 없습니다.");
										})
								})
						}}>
							<Common.Image size={24} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_naver.png')} />
							<Common.TextMedium14>네이버 계정으로{"\n"}시작하기</Common.TextMedium14>
						</SNSSignInBtn>
						<SNSSignInBtn onPress={() => { handleGoogleSingin(); }}>
							<Common.Image size={24} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_google.png')} />
							<Common.TextMedium14>구글 계정으로{"\n"}시작하기</Common.TextMedium14>
						</SNSSignInBtn>
						<SNSSignInBtn SnsSignInR onPress={() => { Platform.OS == 'android' ? onAndroidAppleButtonPress() : onAppleButtonPress()  }}>
							<Common.Image size={24} marginR={10} source={require('../../assets/img/drawable-xhdpi/icon_apple.png')} />
							<Common.TextMedium14>애플 계정으로{"\n"}시작하기</Common.TextMedium14>
						</SNSSignInBtn>
					</SNSSignInBox>
				</Common.VerticalCenter>
			</Common.ScrollContainer>
		</Common.ZipandaSafeView>
	</>)
}

export default SigninScreen