
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import SocailStyleScreen from './SocailStyleScreen';
import { useNavigation } from '@react-navigation/native';
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
import AppBarFooterComponents from '../../components/Common/AppBarFooter/AppBarFooterComponents';

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
  },
  {
    postID: '2',
    userID: {
      id: '1',
      imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
      userName: 'Nguyễn Minh Tú'
    },
    typeOfPost: 'Posting',
    hastash: ['#spring2024', '#hottrend', '#sports'],
    date: '01/04/2024',
    comment: [
      {
        userID: 'U2',
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: new Date()
      },
      {
        userID: 'U2',
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: '01/04/2024'
      },
      {
        userID: 'U2',
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: '01/04/2024'
      },
      {
        userID: 'U2',
        content: 'wowww, this is so crazy, I want to see more of your collection',
        date: '01/04/2024'
      },

    ],
    react: 1203,
    status: true,
    content: {
      imgUrl: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2023/04/12232307/top-10-mon-do-thoi-trang-khong-the-thieu-trong-tu-do-mua-he-cua-nang1681291387.jpg',
      content: 'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.'
    }
  },
  {
    postID: '3',
    userID: {
      id: '1',
      imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
      userName: 'Nguyễn Minh Tú'
    },
    typeOfPost: 'Posting',
    hastash: ['#spring2024', '#hottrend', '#sports'],
    date: '01/04/2024',
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
      imgUrl: 'https://i.pinimg.com/564x/f2/ff/10/f2ff108f6d63a595a4d9553971c293c1.jpg',
      content: 'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.'
    }
  },
  {
    postID: '4',
    userID: {
      id: '1',
      imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
      userName: 'Nguyễn Minh Tú'
    },
    typeOfPost: 'Posting',
    hastash: ['#spring2024', '#hottrend', '#sports'],
    date: '01/04/2024',
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
      imgUrl: 'https://i.pinimg.com/736x/34/c7/67/34c767a2c369dd4fdce12d3829b3f457.jpg',
      content: 'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.'
    }
  },
  {
    postID: '5',
    userID: {
      id: '1',
      imgUrl: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/411970383_4067132546846769_7576527316672886889_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFdH0Zl_x8UG__6xk9JqkvOTkdekksELqhOR16SSwQuqPp3MbXMtwIjMDfbg_FqItxdVm9YuwNtmnQDyMQUjHAn&_nc_ohc=L7I68-6qhyAAX-5tuGQ&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfA1o72hPWbzg8h2O5RgMax4bXfv7tJRC-Y_aJ_gYse9Hw&oe=6599FDA5',
      userName: 'Nguyễn Minh Tú'
    },
    typeOfPost: 'Posting',
    hastash: ['#spring2024', '#hottrend', '#sports'],
    date: '01/04/2024',
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
      imgUrl: 'https://stability-images-upload.s3.amazonaws.com/v1_txt2img_cf79b0de-50af-42f1-abf3-0792b5f6b8fa.png',
      content: 'Ngày 3/1, cư dân mạng bất ngờ phát hiện Khả Như đã bỏ theo dõi Puka trên Instagram cá nhân. Hành động này của nữ diễn viên khiến netizen nhận định rằng tình bạn của cả hai đã chính thức "toang" và không còn hàn gắn được.'
    }
  },

];



type NavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const SocialScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  /*-----------------UseState variable-----------------*/
  const [colorIconAdded, setColorIconAdded] = useState('#C90801');
  const [addItemToCollection, setAddItemToCollection] = useState(true);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [postingContent, setPostingContent] = useState('What are you thinking?');
  const [showFullContent, setShowFullContent] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [openCommentsDialogItemId, setOpenCommentsDialogItemId] = useState<{ [key: string]: boolean }>({});
  const [isOpenCommentsDialog, setIsOpenCommentsDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);


  /*-----------------Usable variable-----------------*/
  const dispatch = useDispatch();
  const openCommentsDialog = useSelector((state: any) => state.store.isOpenCommentsDialog);

  /*-----------------UseEffect-----------------*/
  // useEffect(() => {
  //   dispatch(setOpenCommentsDialog(true));
  //   console.log(selectedItem);
  // }, [selectedItem])

  /*-----------------Function handler-----------------*/
  function hanldeGoBack(): void {
    alert('back')
  }

  const handleSearch = () => {
    alert('search')
  }

  const handleMore = () => {
    alert('handleMore')
  }

  const handleOpenPostingForm = () => {
    dispatch(setOpenUpPostingDialog(true));
    setIsOpenCommentsDialog(true);
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



  const handleSetComment = (text: string, postID: string) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postID]: text,
    }));
  }

  const handleSendComment = (id: string) => {
    console.log('post: ', id, ' - ', comments);
  }

  const handleMoveToPostingDetail = (postID: string) => {
    navigation.navigate('PostingDetail', { postID });
  }



  const handleScroll = (event: any) => {
    const currentScrollPos = event.nativeEvent.contentOffset.y;

    if (currentScrollPos > prevScrollPos) {
      setScrollUp(false);
    } else if (currentScrollPos < prevScrollPos) {
      setScrollUp(true);

    }

    // Update the previous scroll position
    setPrevScrollPos(currentScrollPos);
  };

  return (
    <View style={SocailStyleScreen.container}>
      <AppBarHeaderComponent
        title='Social'
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
        style={SocailStyleScreen.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16} 
      >
        <View style={SocailStyleScreen.scrollViewContent}>
          <View style={SocailStyleScreen.postingEditorContainer}>
            <View style={{ marginTop: 20 }}>
              <TextInput
                value="What are you thinking?"
                mode='outlined'
                style={SocailStyleScreen.postingInput}
                contentStyle={{}}
                onPressIn={handleOpenPostingForm}
                right={
                  (
                    <TextInput.Icon icon={'image'} color={primaryColor}>

                    </TextInput.Icon>
                  )
                }
              />
            </View>
          </View>

          {/* Regular FlatList */}
          <FlatList
            style={SocailStyleScreen.flatlist}
            data={data.slice(0, 10)}
            keyExtractor={(item) => item.postID}
            renderItem={({ item }) => (
              <ListViewComponent
                data={[{ id: item.postID, imgUrl: '', }]}
                extendImgUrl={item.content.imgUrl}
                cardStyleContainer={SocailStyleScreen.container_cardContainer}
                cardStyleContent={SocailStyleScreen.container_cardContent}
                onPress={()=> handleMoveToPostingDetail(item.postID)}
                extendHeaderChild={
                  <View style={[SocailStyleScreen.container_postingBar, { marginTop: 25 }]}>
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
                        >Nguyen Minh Tu</Text>
                        <Text style={{ fontSize: spanTextSize * 0.8 }}>{item.date.toLocaleString()}</Text>
                      </View>
                    </View>
                  </View>
                }
                extendChild={
                  <View>
                    <View style={SocailStyleScreen.container_postingBar}>
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
                    <View style={SocailStyleScreen.container_postingBar}>
                      <View style={{ flexDirection: 'row', width: width * 0.8, height: 'auto' }}>
                        {item.hastash.map((hastash, key) => (
                          <View key={key} style={{ marginLeft: 10, marginRight: 5 }}>
                            <Text style={{ color: 'black', fontSize: 15 }}>{hastash}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={SocailStyleScreen.container_postingBar}>
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
                    <View style={SocailStyleScreen.container_postingBar}>
                      <View style={{ flexDirection: 'row', width: width * 0.8, height: 40, paddingTop: 10, paddingLeft: 10 }}>
                        <TextInput
                          value={comments[item.postID] || ''}
                          mode='outlined'
                          style={SocailStyleScreen.commentInput}
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


          <PostingDialogComponent></PostingDialogComponent>


        </View>
      </ScrollView >
      <AppBarFooterComponents isHide={scrollUp} centerIcon={'plus'}></AppBarFooterComponents>

    </View >

  );
};


export default SocialScreen;
