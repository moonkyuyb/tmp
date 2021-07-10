/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import { StyleSheet, Text, Platform } from 'react-native';
 
 export class ZipText extends Component {
     render() {
         return (
             <Text {...this.props} style={[styles.ZipText, this.props.style]}>{this.props.children}</Text>
         )
     }
 }
 
 const styles = StyleSheet.create({
     ZipText:{
         fontSize: 16,
         fontWeight: '600',
     }
 })
 
 export default ZipText;