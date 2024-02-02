import { StyleSheet, Dimensions } from 'react-native';
import { backgroundColor } from '../../root/Colors';
import { ITEM_WIDTH } from '../../components/ListView/ListViewStyleComponent';
import { ITEM_HEIGHT } from '../../components/Common/AppBarHeader/AppBarHeaderStyleComponent';


const { width, height } = Dimensions.get('window');
const containerPadding = 16;

const SocailStyleScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: containerPadding,
    backgroundColor: backgroundColor
  },
  scrollView: {
    width: width,
    flex: 1,
    backgroundColor: backgroundColor,

  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  flatlist: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'row',

  },
  postingEditorContainer: {
    width: width,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  postingInput: {
    width: width * 0.9,
    backgroundColor: backgroundColor,
    height: 30,
    borderRadius: 8
  },
  container_cardContainer: {
    width: width,
    marginLeft: 0,
    borderRadius: 0,

  },
  container_cardContent: {
    width: width,
    borderRadius: 0,


  },
  container_postingBar: {
    width: width,
    flexDirection: 'row',
    backgroundColor: 'white',

  },
  commentInput: {
    width: width - containerPadding*2,
    backgroundColor: backgroundColor,
    height: 40,
    borderRadius: 50
  },
  post__content: {
    paddingHorizontal: containerPadding,
    paddingVertical: containerPadding - 10,
    borderBottomWidth: 4.5,
    borderColor: '#F7F7F7'
  },
  post__content_child : {
    flexDirection: 'row',
    marginVertical: 3,
    flexWrap: 'wrap',
    width: width - containerPadding
  },
  post__content_interaction: {
    flexDirection: 'row', 
    alignItems:'center', 
    marginRight: 20

  },
  interaction_icon: {
    paddingRight: 5,

  },
  interaction_number: {
    color: 'black', 
    fontSize: 15 
  },
  post__content_hashtag: {
    color: 'black', fontSize: 15,
    marginRight: 5
  },
  titlePage: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 12,
    height: ITEM_HEIGHT,
  },
  linearBackground: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
});

export default SocailStyleScreen;
