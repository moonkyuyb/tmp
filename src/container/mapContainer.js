import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../reducers/mapReducer'

import ZipMap from '../screen/Map/zipMap'


const mapStateToProps = (state, props) => {
    return {
        zipCount:state.mapReducer.zipCntData,
        isInit:state.mapReducer.isInit,
        props:props
    };
}

const mapDispatchToProps = (dispatch) => {
    return ({
        handleGetSalesList:(filter)=>{ 

            dispatch( actions.getSalesList(filter) )
        },
        handleCurrentLocation: () => { },
        handleMapClick:(geoData, leftTop, rightTop, rightBottom, leftBottom ) => {
            // 지도 클릭시 핸들러
            //console.log("map click!!!====================================================");
            //console.log(`lat:${lat}, lng:${lng}, latDelta: ${latDelta}, lngDelta:${lngDelta}`);
            dispatch( actions.onMapClick(geoData, leftTop, rightTop, rightBottom, leftBottom ) );

        },
        handleSetFilterComplete: (isComplete) =>{
            dispatch(actions.setFilterComplete(isComplete));
        },
        handleMapInit: (lat, lng, zoom) => { 
  
            actions
            .fetchZipCount(lat, lng, zoom)
            .then((response) => {
                dispatch( actions.setMapZipCnt(response.data.sales) );
            })
            .catch((err)=> {

            })
            
        },

        handleMapMove : () =>  { 
            dispatch(actions.onMapMove)
         },
        handleMapZoom : () => {
            dispatch(actions.onMapZoom)
        },
        handleMyLocation : () => {
            dispatch(actions.onMyLocation)
        },
        handleTest:()=>{
            console.log("handle test!!!");
        },

        handleInit:(isInit) => {
            dispatch(actions.setInit(isInit));  
        }

    })

}

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(ZipMap)


export default MapContainer;
