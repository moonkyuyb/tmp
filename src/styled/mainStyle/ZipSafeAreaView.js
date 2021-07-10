/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, Platform, SafeAreaView, View } from 'react-native';

/* COMMON COMPONENTS */
import Colors from '../../../assets/colors';

export class BoldText extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View {...this.props} style={[styles.ZipSafeAreaView, this.props.style]}>
					{this.props.children}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		alignItems: 'center',
		flex: 1,
	},
	ZipSafeAreaView:{
		width: '100%',
		maxWidth: 800,
		backgroundColor: Colors.whiteColor,
		flex: 1,
	}
})

export default BoldText;