
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../root/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import ListViewComponent from '../../components/ListView/ListViewComponent';
import { Appbar, Avatar, Button, Chip, Icon, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import AppBarHeaderComponent from '../../components/Common/AppBarHeader/AppBarHeaderComponent';
import { height, width } from '../../root/ResponsiveSize';
import { backgroundColor, grayBorderColor, primaryColor } from '../../root/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenAddToCollectionsDialog, setOpenCommentsDialog, setOpenUpPostingDialog } from '../../redux/State/Actions';
import AddingToCollectionComponent from '../../components/Dialog/AddingToCollectionComponent';
import PostingDialogComponent from '../../components/Dialog/PostingDialogComponent';
import { iconAvatarPostingSize, iconAvatarSize } from '../../root/Icon';
import { spanTextSize } from '../../root/Texts';
import CommentsDetailComponent from '../../components/Dialog/CommentsDetailDialogComponent';
import CommentsDetailDialogComponent from '../../components/Dialog/CommentsDetailDialogComponent';
import PostingDetailStyleScreen from './PostingDetailStyleScreen';


interface ListItem {
  id: string;
  title?: string;
  imgUrl?: any;
  description?: string;
}


const data = [
  {
    postID: '1',
    userID: {
      id: '1',
      imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
      userName: 'Nguyễn Minh Tú'
    },
    typeOfPost: 'Posting',
    hastash: ['#spring2024', '#hottrend', '#sports'],
    date: new Date(),
    comment: [
      {
        commentID: '1',
        userID: {
          userID: '2',
          userName: 'Nguyễn Minh Tú',
          imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
        },
        content: 'wowww, this is so crazy, I want to see more of your collection. see more of your collectionsee more of your collectionsee more of your collection',
        date: new Date(),
      },
      {
        commentID: '2',
        user: {
          userID: '3',
          userName: 'Nguyễn Minh Tú',
          imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
        },
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
      {
        commentID: '3',
        user: {
          userID: '4',
          userName: 'Nguyễn Minh Tú',
          imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
        },
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
      {
        commentID: '4',
        user: {
          userID: '2',
          userName: 'Nguyễn Minh Tú',
          imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
        },
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
      {
        commentID: '5',
        user: {
          userID: '2',
          userName: 'Nguyễn Minh Tú',
          imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
        },
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },
      {
        commentID: '6',
        user: {
          userID: '2',
          userName: 'Nguyễn Minh Tú',
          imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
        },
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: new Date(),
      },

    ],
    react: 1203,
    status: true,
    content: {
      imgUrl: 'https://thejulius.com.vn/wp-content/uploads/2021/06/thoi-trang-mua-he.jpg',
      content: 'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.'
    }
  }


];

const [commentsArray] = data



type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const PostingDetailScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [postingContent, setPostingContent] = useState('What are you thinking?');
  const [showFullContent, setShowFullContent] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [openCommentsDialogItemId, setOpenCommentsDialogItemId] = useState<{ [key: string]: boolean }>({});
  const [isOpenCommentsDialog, setIsOpenCommentsDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedComment, setSelectedComment] = useState('')



  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);
  const route = useRoute();
  const postID = (route.params as { postID?: string })?.postID || '';

  /*-----------------UseEffect-----------------*/
  React.useEffect(() => {
    console.log('detail: ', openCommentsDialog);
  }, []);

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    navigation.navigate('Social');
  }

  const handleSearch = () => {
    alert('search')
  }

  const handleMore = () => {
    alert('handleMore')
  }


  const handleOpenCommentsDialog = (postID: string) => {
    const selectedItem = data.find(item => item.postID === postID);
    if (selectedItem) {
      setSelectedItem(selectedItem.postID);
    }
    setIsOpenCommentsDialog(true);
    dispatch(setOpenCommentsDialog(true));
  }

  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const handleToggleComment = () => {
    setShowFullComment(!showFullComment);
  };


  const handleSetComment = (text: string, postID: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postID]: text,
    }));
  }

  const handleSendComment = (id: string) => {
    console.log('post: ', id, ' - ', comments);
  }

  /**
   * Comments group element
   * @returns ReactNode
   */
  const commentsGroup = () => {
    return (
      <></>
      // <View style={[PostingDetailStyleScreen.container_postingBar, { flexDirection: 'column' }]}>

      //   {commentsArray.comment.map((comment, key) => (
      //     <View key={comment.commentID} style={[PostingDetailStyleScreen.container_postingBar, { marginTop: 20 }]}>
      //       <View key={comment.commentID} style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}>
      //         <Avatar.Image
      //           size={iconAvatarPostingSize * 0.8}
      //           source={{ uri: comment.user.imgUrl }}
      //           style={{ marginLeft: 10 }} />
      //         <View key={comment.commentID} style={PostingDetailStyleScreen.commentContent}
      //         >
      //           <View key={comment.commentID} style={{ padding: 10 }}>
      //             <Text
      //               style=
      //               {
      //                 {
      //                   fontWeight: 'bold',
      //                   paddingTop: -iconAvatarPostingSize * 1
      //                 }
      //               }
      //             >
      //               Nguyen Minh Tu
      //             </Text>
      //             <Text style={{ fontSize: spanTextSize * 0.8 }}>{comment.date.toLocaleString()}</Text>
      //             <Text>

      //               {showFullComment ? comment.content : comment.content.substring(0, 100) + '...'}
      //               {comment.content.length > 100 && (
      //                 <Text
      //                   onPress={handleToggleComment}
      //                   style={{ color: 'black', fontSize: 13, textDecorationLine: 'underline', marginLeft: 10 }}
      //                 >
      //                   {showFullComment ? 'See less' : 'See more'}
      //                 </Text>
      //               )}
      //             </Text>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   ))}
      // </View>
    )
  }




  return (
    <View style={PostingDetailStyleScreen.container}>
      <AppBarHeaderComponent
        title='Posting detail'
        backAction={() => hanldeGoBack()}
        iconChild={
          <>
            <Appbar.Action icon={'magnify'} onPress={handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={handleMore} />
          </>
        }
      >
      </AppBarHeaderComponent>

      <ScrollView
        persistentScrollbar={false}
        style={PostingDetailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={PostingDetailStyleScreen.scrollViewContent}>

          {/* Regular FlatList */}
          <FlatList
            style={PostingDetailStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.postID}
            renderItem={({ item }) => (
              <ListViewComponent
                data={[{ id: item.postID, imgUrl: '', }]}
                extendImgUrl={item.content.imgUrl}
                cardStyleContainer={PostingDetailStyleScreen.container_cardContainer}
                cardStyleContent={PostingDetailStyleScreen.container_cardContent}
                extendHeaderChild={
                  <View style={[PostingDetailStyleScreen.container_postingBar, { marginTop: 25 }]}>
                    <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}>
                      <Avatar.Image
                        size={iconAvatarPostingSize}
                        source={{ uri: item.userID.imgUrl }}
                        style={{ marginLeft: 10 }} />
                      <View style=
                        {
                          {
                            marginLeft: 10,
                            marginTop: 5
                          }
                        }
                      >
                        <Text
                          style=
                          {
                            {
                              fontWeight: 'bold',
                              paddingTop: iconAvatarPostingSize * 0.05
                            }
                          }
                        >
                          Nguyen Minh Tu
                        </Text>
                        <Text style={{ fontSize: spanTextSize * 0.8 }}>{item.date.toLocaleString()}</Text>
                      </View>
                    </View>
                  </View>
                }
                extendChild={
                  <View style={{ flex: 1 }}>
                    <View style={PostingDetailStyleScreen.container_postingBar}>
                      <View style={{ flexDirection: 'row', width: 80 }}>
                        <IconButton
                          icon={'heart'}
                          iconColor={'black'}
                          size={25}
                          borderless
                        ></IconButton>
                        <View>
                          <Text style={{ color: 'black', fontSize: 15, marginLeft: -10, paddingTop: width * 0.04 }}>{item.react}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', width: 80 }}>
                        <IconButton
                          icon={'comment'}
                          iconColor={'black'}
                          size={25}
                          borderless
                          onPress={() => handleOpenCommentsDialog(item.postID)}
                        ></IconButton>
                        <View>
                          <Text
                            style={{ color: 'black', fontSize: 15, marginLeft: -10, paddingTop: width * 0.04 }}>{item.comment.length}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', width: 80 }}>
                        <IconButton
                          icon={'share'}
                          iconColor={'black'}
                          size={25}
                          borderless></IconButton>
                        <View>
                          <Text style={{ color: 'black', fontSize: 15, marginLeft: -10, paddingTop: width * 0.04 }}>{item.react}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={PostingDetailStyleScreen.container_postingBar}>
                      <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}>
                        {item.hastash.map((hastash, key) => (
                          <View key={key} style={{ marginLeft: 10, marginRight: 5 }}>
                            <Text style={{ color: 'black', fontSize: 15 }}>{hastash}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={PostingDetailStyleScreen.container_postingBar}>
                      <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', paddingTop: 10, paddingLeft: 10 }}>
                        <View>
                          <Text style={{ color: 'black', fontSize: 15 }}>
                            {showFullContent ? item.content.content : item.content.content.substring(0, 150) + '...'}
                            {item.content.content.length > 150 && (
                              <Text
                                onPress={handleToggleContent}
                                style={{ color: 'black', fontSize: 13, }}
                              >
                                {showFullContent ? ' See less' : ' See more'}
                              </Text>
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Comments */}
                    {/* {commentsGroup()} */}
                    <View style={[PostingDetailStyleScreen.container_postingBar, { flexDirection: 'column' }]}>

                      {commentsArray.comment.map((comment, key) => (
                        <View key={comment.commentID} style={[PostingDetailStyleScreen.container_postingBar, { marginTop: 20 }]}>
                          <View key={comment.commentID} style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}>
                            <Avatar.Image
                              size={iconAvatarPostingSize * 0.8}
                              source={{ uri: comment.user ? comment.user.imgUrl : '#' }}
                              style={{ marginLeft: 10 }} />
                            <View key={comment.commentID} style={PostingDetailStyleScreen.commentContent}
                            >
                              <View key={comment.commentID} style={{ padding: 10 }}>
                                <Text
                                  style=
                                  {
                                    {
                                      fontWeight: 'bold',
                                      paddingTop: -iconAvatarPostingSize * 1
                                    }
                                  }
                                >
                                  Nguyen Minh Tu
                                </Text>
                                <Text style={{ fontSize: spanTextSize * 0.8 }}>{comment.date.toLocaleString()}</Text>
                                <Text>

                                  {showFullComment ? comment.content : comment.content.substring(0, 100) + '...'}
                                  {comment.content.length > 100 && (
                                    <Text
                                      onPress={handleToggleComment}
                                      style={{ color: 'black', fontSize: 13, textDecorationLine: 'underline', marginLeft: 10 }}
                                    >
                                      {showFullComment ? 'See less' : 'See more'}
                                    </Text>
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto', paddingTop: 10, paddingLeft: 10 }}>
                      <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Comments</Text>
                    </View>
                    {commentsGroup()}
                    <View style={PostingDetailStyleScreen.container_postingBar}>
                      <View style={{ flexDirection: 'row', width: width * 0.8, height: 40, paddingTop: 10, paddingLeft: 10, }}>
                        <TextInput
                          value={comments[item.postID] || ''}
                          mode='outlined'
                          style={PostingDetailStyleScreen.commentInput}
                          onChangeText={(text: string) => handleSetComment(text, item.postID)}
                          outlineStyle={{ borderRadius: 30, borderColor: grayBorderColor, borderWidth: 1 }}
                          placeholder="Comment at here..."
                          right={
                            (
                              <TextInput.Icon
                                size={25}
                                style={{ paddingTop: 25 * 0 }}
                                icon={'send'}
                                color={primaryColor}
                                onPress={() => handleSendComment(item.postID)}
                              >
                              </TextInput.Icon>
                            )
                          }
                        />
                        {item.postID === selectedItem && (
                          <CommentsDetailDialogComponent postId={item.postID} comments={item.comment}></CommentsDetailDialogComponent>
                        )}


                      </View>
                    </View>

                  </View>
                }
              />
            )}
            contentContainerStyle={{ paddingRight: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />






        </View>
      </ScrollView >
    </View >

  );
};




export default PostingDetailScreen;
