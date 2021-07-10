import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const StepItemListActive = styled.TouchableOpacity`
    minWidth: 130;
    height: 62;
    borderRadius: 12;
    justifyContent: center;
    paddingHorizontal: 15;
    marginRight: 8;
    elevation: 4;
    shadowColor: #000;
    shadowOffset: { width: 0,height: 3, };
    shadowOpacity: 0.13;
    shadowRadius: 6;
    marginBottom: 23;
    backgroundColor: ${Colors.mainColor};
    borderWidth: 1;
    marginTop: 18;
`;


export const StepNumBox = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
    marginBottom: 4;
`;

export const StepNum = styled.Text`
    fontSize: 11;
`;

export const MoreViewIcon = styled.Image`
    width: 8;
    height: 8;
`;

export const BoldText = styled.Text`
    fontWeight: bold;
    ${Platform.select({
            android:{
                fontWeight: 'bold'
            }
        })
    }
`;

/*
export class MainTopListItem {
    item;
    constructor({item}) {
        console.log("main top list item=============================");
        console.log(item);
        this.item = item
    }
    
    render(){
        return (
            <StepItemListActive>
                <stepNumBox>
                    <Text style={styles.stepNum}>Step 0{this.item.id} </Text>
                </stepNumBox>
                <BoldText style={styles.stepTit}>{this.item.title}</BoldText>
            </StepItemListActive>
        )
    }

}

*/






