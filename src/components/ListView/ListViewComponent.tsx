import React, { ReactNode } from 'react';
import { View, FlatList, Image, Text, ImageSourcePropType, StyleProp, ViewStyle, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ListViewStylesComponent from './ListViewStyleComponent';

interface ListItem {
    id: string;
    title?: string;
    imgUrl: ImageSourcePropType;
    description?: string;
}

interface ListViewProps {
    data?: ListItem[];
    child?: ReactNode;
    cardStyleContent?: StyleProp<ViewStyle> | object;
    cardStyleContainer?: StyleProp<ViewStyle> | object;
}

const ListViewComponent: React.FC<ListViewProps> = ({ data, child, cardStyleContent, cardStyleContainer }) => {
    const styleContent = {
        ...(cardStyleContent as object),
    };

    const styleContainer = {
        ...(cardStyleContainer as object),
    };

    const renderRow = ({ item }: { item: ListItem }) => (
        <View style={[ListViewStylesComponent.cardRow, cardStyleContainer]}>
            <Card style={[ListViewStylesComponent.container, cardStyleContainer]}>
                <View >
                    <Image source={item.imgUrl} style={[ListViewStylesComponent.image, cardStyleContent]} />
                    {item.title && (
                        <Text style={ListViewStylesComponent.header}>{item.title}</Text>
                    )}
                    {item.description && (
                        <Text style={ListViewStylesComponent.body}>{item.description}</Text>
                    )}
                    {child}
                </View>
            </Card>
        </View>
    );

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderRow}
                numColumns={2}
            />
        </View>
    );
};


export default ListViewComponent;
