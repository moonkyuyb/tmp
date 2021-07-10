import React, { useEffect, useState } from 'react';
import * as Common from './../../styled/commonStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import Gallery from 'react-native-image-gallery';
import { API_URL } from "@env";

const SalesSliderImageView = (props) => {

	//GET ROUTE & NAVIGATION
	const route = useRoute(), navigation = useNavigation()
	const [salesImage, setSalesImage] = useState([])

	var imgs = [];

	//console.log(route.params.files)

	if (route.params.files.length > 0) {
		route.params.files.map((el)=>{
			
			imgs.push({source:{uri:API_URL+el.sf_unique_nm}})
		})
	}
	console.log(imgs);

	useEffect(()=>{
		const handleEffect = async (props) => {
			
			setSalesImage(imgs)
		}
		handleEffect()
	},[])
	
	const salesImageItem=({item})=>{
        return(
            <PreViewImg source={item.img}/>
        );
    }
	return(
		<Common.View style={{ height:'100%' }} >
			<Gallery
				style={{paddingBottom: 96}}
				images={salesImage}
			/>
			{/*route.params.files.length > 0 &&
			<PreView>
				<FlatList
					horizontal={true}
					contentContainerStyle={{ padding: 14 }}
					data={route.params.files} 
					renderItem ={ salesImageItem } 
					keyExtractor={ item=> item.id }
				/>
			</PreView>
			*/}
		</Common.View>
	)
}
export default SalesSliderImageView;


