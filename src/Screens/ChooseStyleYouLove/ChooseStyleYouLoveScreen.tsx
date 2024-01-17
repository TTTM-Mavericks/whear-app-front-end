import MaskedView from '@react-native-masked-view/masked-view';
import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import HomeStylesComponent from '../Home/HomeStyleScreen';
import ChooseStyleYouLoveStyleScreen from './ChooseStyleYouLoveStyleScreen';
import ButtonComponent from '../../components/Button/ButtonDefaultComponent';
import {
  buttonHeight,
  buttonWidth,
} from '../../components/Button/ButtonDefaultData';
import { primaryColor, secondaryColor } from '../../root/Colors';

const styleData = [
  {
    id: '1',
    title: 'Minimalism',
    description:
      'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_1.png'),
  },
  {
    id: '2',
    title: 'Girly',
    description:
      'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_2.png'),
  },
  {
    id: '3',
    title: 'Sporty',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_3.png'),
  },
  {
    id: '4',
    title: 'Vintage',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '5',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '6',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '7',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
  {
    id: '8',
    title: 'Manly',
    description:
      'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: require('../../assets/img/introduce_background/introduce_background_4.png'),
  },
];

const ChooseStyleYouLoveScreen = () => {
  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const handleSetSelectedItems = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  function hanldeGoBack(): void {
    alert('back');
  }

  const handleNext = () => {
    alert('next');
  };

  return (
    <SafeAreaView style={ChooseStyleYouLoveStyleScreen.container}>
      <ScrollView
        persistentScrollbar={false}
        style={ChooseStyleYouLoveStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={ChooseStyleYouLoveStyleScreen.scrollViewContent}>
          <View style={ChooseStyleYouLoveStyleScreen.titleView}>
            <MaskedView
              maskElement={
                <Text style={ChooseStyleYouLoveStyleScreen.title}>
                  Choose the style you love
                </Text>
              }
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={ChooseStyleYouLoveStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Choose the style you love</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={ChooseStyleYouLoveStyleScreen.subTitle}>
              At least 3 pieces
            </Text>
          </View>

          <FlatList
            style={HomeStylesComponent.flatlist}
            data={styleData}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ListViewComponent
                data={[{ id: item.id, imgUrl: item.imgUrl }]}
                cardStyleContent={
                  ChooseStyleYouLoveStyleScreen.cardStyleContainer
                }
                child={
                  <View>
                    <View style={ChooseStyleYouLoveStyleScreen.cardTextView}>
                      <Text style={ChooseStyleYouLoveStyleScreen.cardText}>
                        {item.title}
                      </Text>
                    </View>
                    <IconFA
                      name={
                        selectedItems.includes(item.id)
                          ? 'check-circle'
                          : 'circle-thin'
                      }
                      size={30}
                      color={primaryColor}
                      onPress={() => handleSetSelectedItems(item.id)}
                      style={[ChooseStyleYouLoveStyleScreen.iconCard, {}]}
                    />
                  </View>
                }
              />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          <View style={ChooseStyleYouLoveStyleScreen.buttonView}>
            <ButtonComponent
              title='Next'
              onPress={handleNext}
              width={buttonWidth}
              height={buttonHeight}
              backgroundColor={primaryColor}
              textColor='black'
              mode='contained'
              style={{ marginBottom: 0, color: 'black' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ChooseStyleYouLoveScreen;
