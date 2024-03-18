import { View, Text,Image, Dimensions} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { data } from '../Data/carousel';
import { Screen } from 'react-native-screens';

const Carousels = () => {
     const width=Dimensions.get('screen').width
     const renderItem = ({item}) => {
      return (
        <View>
          <Image source={{uri:`${item.image}`}}  />
        </View>
      );
    };

  return (
      <View style={{height:200,width:"100%"}}>
       <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={500}
      />
    </View>
  )
}

export default Carousels