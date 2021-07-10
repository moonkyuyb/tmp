/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, Platform } from 'react-native';

export class SemiBoldText extends Component {
	render() {
		return (
			<Text {...this.props} style={[styles.SemiBoldText, this.props.style]}>{this.props.children}</Text>
		)
	}
}

const styles = StyleSheet.create({
	SemiBoldText:{
		fontWeight: '600',
		...Platform.select({
			android:{
				fontWeight: 'bold'
			}
		})
	}
})

export default SemiBoldText;