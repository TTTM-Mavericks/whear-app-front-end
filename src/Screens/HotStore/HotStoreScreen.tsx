import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { Appbar } from 'react-native-paper';
import HotStoreStyleScreen from './HotStoreStyleScreen';


const HOST_STORE_DATA = [
    {
        brandId: '1',
        brandImgURL: '',
        brandName: 'Zara',
        clothes: [
            {  clothesID: '1.1',
            clothesImgURL: ''   
            },
            {  clothesID: '1.2',
            clothesImgURL: ''   
            },

        ]
    }
]

const HotStoreScreen =  () => {

    function hanldeGoBack(): void {
        alert('back')
      }
    
      const handleSearch = () => {
        alert('search')
      }
    
      const handleMore = () => {
        alert('handleMore')
      }
    return(
        <View style={HotStoreStyleScreen.container}>
        {/* <AppBarHeaderComponent
          backAction={() => hanldeGoBack()}
          iconChild={
            <>
              <Appbar.Action icon={'magnify'} onPress={handleSearch} />
              <Appbar.Action icon='dots-vertical' onPress={handleMore} />
            </>
          }
        ></AppBarHeaderComponent> */}
  
        <ScrollView
          persistentScrollbar={false}
          style={HotStoreStyleScreen.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={HotStoreStyleScreen.scrollViewContent}>


          </View>
        </ScrollView>
        </View>

    )
}
export default HotStoreScreen;