/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';

export class ExtraBoldText extends Component {
	render() {
		return (
			<Text {...this.props} style={[styles.ExtraBoldText, this.props.style]}>{this.props.children}</Text>
		)
	}
}

const styles = StyleSheet.create({
	ExtraBoldText:{
		fontWeight: '900',
		...Platform.select({
			android:{
				fontWeight: 'bold'
			}
		})
	}
})

export default ExtraBoldText;