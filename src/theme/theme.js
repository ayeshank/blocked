import {Dimensions, StyleSheet} from 'react-native';

export const splash = require('../../assets/Splash/splash.png');
export const screen1logo = require('../../assets/Screen1/screen1logo.png');
export const screen1round = require('../../assets/Screen1/screen1round.png');
export const triangleIcon = require('../../assets/Screen1/triangleIcon.png');
export const welcomeText = require('../../assets/Screen1/welcomeText.png');
export const screen2round = require('../../assets/Screen2AccountType/screen2round.png');
export const welcomeText1 = require('../../assets/Screen2AccountType/welcomeText1.png');
export const welcomeText2 = require('../../assets/Screen2AccountType/welcomeText2.png');
export const circle = require('../../assets/Screen5b/circle.png');
export const tick = require('../../assets/Screen5b/tick.png');
export const passwordIcon = require('../../assets/Screen5b/passwordIcon.png');
export const arrow = require('../../assets/Screen7b/arrow.png');
export const dots = require('../../assets/Screen7b/dots.png');
export const sendIcon = require('../../assets/Screen7b/sendIcon.png');
export const micIcon = require('../../assets/Screen7b/mic.png');
export const paperClip = require('../../assets/Screen7b/paperClip.png');
export const facebook = require('../../assets/Screen7b/facebook.png');
export const youtube = require('../../assets/Screen7b/youtube.png');
export const google = require('../../assets/Screen7b/google.png');
export const instagram = require('../../assets/Screen7b/instagram.png');
export const QRCode = require('../../assets/Screen8.5/QRCode.png');
export const algebraCourseLogo = require('../../assets/Screen8.5/algebraCourseLogo.png');
export const addToCart = require('../../assets/Screen8.5/addToCart.png');
export const algebraCourseLogo2 = require('../../assets/Screen9/algebraCourseLogo.png');
export const mathCourseLogo = require('../../assets/Screen9/mathCourseLogo.png');
export const uploadIcon = require('../../assets/Screen9/uploadIcon.png');
export const dropdown2 = require('../../assets/Screen9/dropdown.png');
export const uploadAdHereIcon = require('../../assets/Screen46/uploadAdHereIcon.png');
export const algebraCourseLogo3 = require('../../assets/Screen18/algebraCourseLogo.png');
export const mathCourseLogo2 = require('../../assets/Screen18/mathCourseLogo.png');
export const pythonCourseLogo = require('../../assets/Screen18/pythonCourseLogo.png');
export const physicsCourseLogo = require('../../assets/Screen18/physicsCourseLogo.png');

export const megaphone = require('../../assets/drawer/megaphone.png');
export const coupon = require('../../assets/drawer/coupon.png');
export const add = require('../../assets/drawer/add.png');
export const book = require('../../assets/drawer/bookicon.png');
export const motocross = require('../../assets/drawer/motocross.png');
export const payment = require('../../assets/drawer/payment.png');
export const coin = require('../../assets/drawer/coin.png');
export const coins = require('../../assets/drawer/coins.png');
export const email = require('../../assets/drawer/email.png');
export const user = require('../../assets/drawer/user.png');
export const logout = require('../../assets/drawer/logout.png');
export const medal = require('../../assets/ScreenMenu/medal.png');
export const Upload = require('../../assets/ScreenMenu/upload.png');
export const dropdown = require('../../assets/ScreenMenu/dropdown.png');
export const backarrow = require('../../assets/ScreenMenu/arrow.png');

export const p1 = require('../../assets/ScreenMenu/p1.png');
export const p2 = require('../../assets/ScreenMenu/p2.png');
export const p3 = require('../../assets/ScreenMenu/p3.png');
export const p4 = require('../../assets/ScreenMenu/p4.png');
export const p5 = require('../../assets/ScreenMenu/p5.png');
export const p6 = require('../../assets/ScreenMenu/p6.png');
export const p7 = require('../../assets/ScreenMenu/p7.png');
export const p8 = require('../../assets/ScreenMenu/p8.png');
export const mic = require('../../assets/ScreenMenu/mic.png');
export const verifyIcon = require('../../assets/verifyIcon.png');
export const docIcon = require('../../assets/docIcon.png');
export const searchIcon = require('../../assets/searchIcon.png');
export const microphoneIcon = require('../../assets/microphoneIcon.png');
export const userIcon = require('../../assets/userIcon.png');

const WidthDimension = Dimensions.get('window').width;
const HeightDimension = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCustom: {
    marginHorizontal: WidthDimension * 0.05,
    marginTop: HeightDimension * 0,
  },
  headerIconLeft: {
    marginHorizontal: 15,
  },
  headerIconRight: {
    marginHorizontal: 15,
  },
  languageDropdowncontainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    // marginRight: 5,
    zIndex: 1,
  },
  languageDropdownView: {
    marginTop: 'auto',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    fontSize: 15,
    padding: 20,
    color: 'white',
  },
  policyText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Sansation_Regular',
  },
  roundImage: {
    // width: WidthDimension * 0.4,
    // height: HeightDimension * 0.3,
    margin: HeightDimension * 0.04,
    marginLeft: WidthDimension * 0.12,
  },
  welcomeTextImage: {
    margin: HeightDimension * 0.02,
    // marginLeft: WidthDimension * 0.15,
  },
  languages: {
    textAlign: 'right',
    color: 'black',
    fontFamily: 'Sansation_Bold',
    marginVertical: WidthDimension * 0.04,
    fontSize: 14,
    marginHorizontal: WidthDimension * 0.05,
  },
  languageContainer: {
    width: WidthDimension * 0.5,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    top: HeightDimension * 0.06,
    right: 0,
  },
  language: {
    textAlign: 'left',
    color: '#4D4D4D',
    fontFamily: 'Sansation_Bold',
    marginVertical: WidthDimension * 0.02,
    fontSize: 18,
    marginHorizontal: WidthDimension * 0.03,
  },
  buttonHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(225,33,96,100)',
    borderRadius: 5,
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.08,
    height: 52,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Sansation_Regular',
    color: 'white',
  },
  imageButtonHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageButtonContainer: {
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.1,
    height: 52,
    backgroundColor: '#212332',
    justifyContent: 'center',
    borderRadius: 5,
  },
  imageButton: {
    flexDirection: 'row',
    left: 20,
    alignItems: 'center',
  },
  imageButtonImage: {
    width: 30,
    height: 30,
  },
  imageButtonText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Sansation_Regular',
    left: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'Sansation_Regular',
    fontSize: 15,
  },
  subText: {
    color: 'white',
    fontFamily: 'Sansation_Regular',
    textAlign: 'center',
    marginVertical: 15,
  },
  globalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HeightDimension * 0.08,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputContainerSignup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: WidthDimension * 0.9,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  mobileNumberText: {
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: HeightDimension * 0.05,
  },
  mobileNumberSubText: {
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    color: 'black',
    fontSize: 16,
    marginTop: HeightDimension * 0.01,
    marginHorizontal: WidthDimension * 0.09,
  },
  phoneNumberField: {
    marginVertical: HeightDimension * 0.05,
  },
  bottomFixedComponent: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: HeightDimension * 0.02,
  },
  forgotText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Sansation_Regaular',
  },
  resend: {
    color: 'white',
    textAlign: 'center',
  },
  textResend: {
    color: '#4267B2',
  },
  verificationImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HeightDimension * 0.07,
  },
  verificationButton: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  passwordText: {
    fontFamily: 'Sansation_Regular',
    color: '#E12161',
    padding: 20,
    fontSize: 13,
    textAlign: 'center',
  },
  terms: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  termsText: {
    fontFamily: 'Sansation_Regular',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#212332',
    borderRadius: 5,
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.08,
    height: 52,
    marginVertical: 10,
  },
  selectHeadertrue: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#212332',
    borderRadius: 5,
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.08,
    height: 52,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectText: {
    fontSize: 15,
    fontFamily: 'Sansation_Regular',
    color: 'white',
  },
  datePickerContianer: {
    marginStart: 10,
  },
  date: {
    backgroundColor: 'white',
    width: WidthDimension * 0.9,
    height: 50,
    color: 'black',
    elevation: 3,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 10,
    borderRadius: 0,
  },
  signUpheading: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Sansation_Bold',
    textAlign: 'center',
    marginVertical: 20,
    marginBottom: 35,
  },
  signUpSubText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Sansation_Bold',
    textAlign: 'center',
    marginHorizontal: WidthDimension * 0.1,
  },
  signUpSelect: {
    marginVertical: 20,
  },
  signUpSelectText: {
    fontFamily: 'Sansation_Bold',
    color: 'black',
    fontSize: 15,
    marginVertical: HeightDimension * 0.018,
  },
  inputTextHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputTextContainer: {
    backgroundColor: '#212332',
    width: WidthDimension * 0.9,
    borderRadius: 5,
    elevation: 5,
  },
  inputText: {
    color: 'black',
    fontWeight: '700',
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 10,
  },
  signUp2SelectText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Sansation_Bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  notification: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  setting: {
    color: '#767676',
    fontSize: 16,
    fontFamily: 'Sansation_Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  pushNotification: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Sansation_Bold',
    fontWeight: '700',
    textAlign: 'center',
  },
  profileTitle: {
    fontSize: 18,
    fontFamily: 'Sansation_Bold',
    fontWeight: '700',
    color: '#010169',
    textAlign: 'center',
    paddingBottom: 15,
  },
  landingTitle1: {
    fontSize: 21,
    fontFamily: 'Sansation_Bold',
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    paddingBottom: 0,
  },
  landingTitle2: {
    fontSize: 21,
    fontFamily: 'Sansation_Bold',
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    paddingBottom: 15,
  },
  signupOptionTitle1: {
    fontSize: 16,
    fontFamily: 'Sansation_Bold',
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
  },
  signupOptionTitle2: {
    fontSize: 16,
    fontFamily: 'Sansation_Bold',
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    paddingBottom: 15,
  },
  profileSubText: {
    color: 'black',
    fontSize: 15,
    left: 20,
    fontFamily: 'Sansation_Bold',
    marginVertical: HeightDimension * 0.015,
  },
  textBoxContianer: {
    backgroundColor: '#212332',
    width: WidthDimension * 0.9,
  },
  socialButtonContainerv: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButton: {
    width: 40,
    height: 40,
    backgroundColor: '#3FB65F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  navbarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  skip: {
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    top: HeightDimension * 0.15,
  },
  skipText: {
    color: 'black',
    fontSize: 18,
  },
  qr: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  menus: {
    padding: 12,
    flexDirection: 'row',
    marginVertical: 7,
    marginHorizontal: 5,
    borderRadius: 25,
    color: '#4D4D4D',
  },
  sideMarginContainer: {
    marginHorizontal: WidthDimension * 0.05,
  },
  signupQuestions: {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: 'Sansation_Regular',
  },
  selectHeaderHorizontal: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: WidthDimension * 0.9,
    height: 52,
    marginVertical: 10,
    elevation: 3,
  },
  selectHeaderHorizontaltrue: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3FB65F',
    borderRadius: 5,
    width: WidthDimension * 0.9,
    height: 52,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#3FB65F',
    elevation: 3,
  },
  selectTextHorizontal: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    color: 'black',
    marginTop: 5,
  },
  selectTextHorizontaltrue: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Sansation_Regular',
    color: 'white',
    marginTop: 5,
  },
});

import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: black;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: 'Lato-Regular';
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;
