import React from 'react';
import { Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { backgroundColor } from '../../../root/Colors';
import { height, width } from '../../../root/ResponsiveSize';

interface GroupChipComponentProps {
    chipData: string[];
}

const SmallChipGroupComponent: React.FC<GroupChipComponentProps> = ({ chipData }) => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: width*0.7 }}>
            {chipData.map((chip, index) => (
                <Chip
                    key={index}
                    mode='outlined'
                    onPress={() => console.log('Pressed', chip)}
                    style={{ margin: 4, maxWidth: 'auto', height: height*0.03, borderRadius: 8, backgroundColor: backgroundColor  }}
                >
                    <View style={{   justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
                        <Text
                            style={{ fontSize: 10, marginTop: 4}}
                        >
                            {chip}
                        </Text>
                    </View>
                </Chip>
            ))}
        </View>
    );
};

export default SmallChipGroupComponent;
