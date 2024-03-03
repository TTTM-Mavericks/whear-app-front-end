import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { backgroundColor } from '../../../root/Colors';
import { height, width } from '../../../root/ResponsiveSize';

interface GroupChipComponentProps {
    chipData: string[];
}

const SmallChipGroupComponent: React.FC<GroupChipComponentProps> = ({ chipData }) => {
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
