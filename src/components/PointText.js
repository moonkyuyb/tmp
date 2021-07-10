/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Colors from '../../assets/colors';

export class PointText extends Component {
	render() {
		return (
			<View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
				<View style={styles.pointText}>
					<View style={styles.line}></View>
					<Text {...this.props} style={[styles.pointTit, this.props.style]}>{this.props.children}</Text>
				</View>
			</View>
			
		)
	}
}

const styles = StyleSheet.create({
	pointText:{
		backgroundColor: Colors.mainColor,
	},
	line:{
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '60%',
		backgroundColor: Colors.whiteColor,
	},
	pointTit:{
		fontWeight: '700',
	}
})

export default PointText;