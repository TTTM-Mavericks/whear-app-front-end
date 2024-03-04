import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { backgroundColor } from '../../../root/Colors';
import { height, width } from '../../../root/ResponsiveSize';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../root/RootStackParams';
import { useNavigation } from '@react-navigation/native';

interface GroupChipComponentProps {
    chipData: string[];
}
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Route'>;
const SmallChipGroupComponent: React.FC<GroupChipComponentProps> = ({ chipData }) => {
    const navigation = useNavigation<ScreenNavigationProp>();
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: width * 0.7 }}>
            {chipData.map((chip, index) => (
                // <Chip
                //     key={index}
                //     mode='outlined'
                //     style={
                //         Platform.OS === 'ios'
                //             ?
                //             { margin: 4, maxWidth: 'auto', height: height * 0.03, borderRadius: 8, backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }
                //             :
                //             { margin: 4, maxWidth: 'auto', height: height * 0.03, borderRadius: 8, backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                // >
                //     <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                //         <Text
                //             style={Platform.OS === 'ios' ? { fontSize: 10, } : { fontSize: 10, }}
                //         >
                //             {chip}
                //         </Text>
                //     </View>
                // </Chip>

                <Chip
                    key={index}
                    mode='outlined'
                    style={{
                        margin: 4,
                        // height: height * 0.04,
                        borderRadius: 8,
                        backgroundColor: backgroundColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        const data = chip.replace('#', '')
                        navigation.navigate('SearchScreen', { keyWord:  data})
                    }}
                >
                    <Text style={{ fontSize: 10, marginTop: 0 }}>
                        {chip}
                    </Text>
                </Chip>

            ))}
        </View>
    );
};

export default SmallChipGroupComponent;
