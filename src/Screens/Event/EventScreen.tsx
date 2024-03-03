import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Appbar, Chip, Text } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { primaryColor, secondaryColor } from '../../root/Colors';
import EventStyleScreen from './EventStyleScreen';
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';

interface Event {
  id: string;
  type: string;
  eventImgUrl: string;
}

const EVENT_DATA: Event[] = [
  {
    id: '1',
    type: 'hot_sale',
    eventImgUrl:
      'https://images.squarespace-cdn.com/content/v1/58c880d7893fc0f2350b0bbd/1614885691504-36AD43N6X03P2LNKDE4A/Calvin%20Klein%20Sale%202021.png?format=1000w',
  },
  {
    id: '2',
    type: 'black_friday',
    eventImgUrl:
      'https://takashimaya-vn.com/wp-content/uploads/2022/10/1000x1000-800x800.png',
  },
  {
    id: '3',
    type: 'black_friday',
    eventImgUrl:
      'https://www.shutterstock.com/image-vector/black-friday-sale-event-template-600nw-2379289133.jpg',
  },
  {
    id: '4',
    type: 'grand_opening',
    eventImgUrl:
      'https://takashimaya-vn.com/wp-content/uploads/2022/10/1000x1000-800x800.png',
  },
  {
    id: '5',
    type: 'grand_opening',
    eventImgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ4Sx8ow4ulP3ZHqHy13MAR8z6huqSdyXpvw&usqp=CAU',
  },
  {
    id: '6',
    type: 'hot_sale',
    eventImgUrl:
      'https://vanhanhmall.com/wp-content/uploads/2022/10/For-My-Love-Instagram-Post-800x800.jpg',
  },
];

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Grand Opening', value: 'grand_opening' },
  { label: 'Hot Sale', value: 'hot_sale' },
  { label: 'Black Friday', value: 'black_friday' },
  { label: 'Flash salse', value: 'flash_sale' },
];


const EventScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterEvents, setFilterEvents] = useState(EVENT_DATA);
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleSelectFilter = (value: string) => {
    setSelectedFilter(value);
  };

  useEffect(() => {
    if (selectedFilter == 'all') {
      setFilterEvents(EVENT_DATA);
    } else {
      const filtData: Event[] = EVENT_DATA.filter(
        (event) => event.type == selectedFilter
      );
      setFilterEvents(filtData);
    }
  }, [selectedFilter]);


  function hanldeGoBack(): void {
    alert('back');
  }

  const handleSearch = () => {
    alert('search');
  };
  const handleScroll = (event: any) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;

    if (currentScrollPos > prevScrollPos) {
      setScrollUp(false);
    } else if (currentScrollPos < prevScrollPos) {
      setScrollUp(true);

    }

    setPrevScrollPos(currentScrollPos);
  };

  const FiltersBar = () => {
    return (
      <View
        style={[EventStyleScreen.chip__filter,]}
      >
        {filters.map((filter) => (
          <Chip
            mode='outlined'
            style={EventStyleScreen.chip}
            key={filter.value}
            showSelectedCheck={selectedFilter == filter.value ? true : false}
            onPress={() => handleSelectFilter(filter.value)}
          >
            {filter.label}
          </Chip>
        ))}
      </View>
    );
  };

  const renderRow = ({ item }: { item: Event }) => {
    return (
      <View style={EventStyleScreen.event__view}>
        <Image
          source={{ uri: item.eventImgUrl }}
          style={EventStyleScreen.envent__card}
        />
      </View>
    );
  };

  return (
    <View style={EventStyleScreen.container}>
      <AppBarHeaderComponent
        backAction={() => hanldeGoBack()}
        title={
          <View>
            <MaskedView
              maskElement={<Text style={EventStyleScreen.title}>Events</Text>}
            >
              <LinearGradient
                colors={[secondaryColor, primaryColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={EventStyleScreen.linearBackground}
              >
                <Text style={{ opacity: 0 }}>Events </Text>
              </LinearGradient>
            </MaskedView>
          </View>
        }

      ></AppBarHeaderComponent>

      <View style={EventStyleScreen.scroll__view}>
        <FlatList
          onScroll={(event) => handleScroll(event)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={filterEvents}
          ListHeaderComponent={FiltersBar}
          keyExtractor={(item) => item.id}
          renderItem={renderRow}
        />
      </View>
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'} ></AppBarFooterComponents>

    </View>
  );
};
export default EventScreen;
