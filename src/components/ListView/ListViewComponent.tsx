import React, { ReactNode, useState } from 'react';
import { View, FlatList, Image, Text, ImageSourcePropType, StyleProp, ViewStyle, StyleSheet, Dimensions, Platform } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ListViewStylesComponent from './ListViewStyleComponent';
import { height, width } from '../../root/ResponsiveSize';

interface ListItem {
    id: string;
    title?: string;
    imgUrl: ImageSourcePropType | string;
    description?: string;
}

interface ListViewProps {
    data?: ListItem[];
    child?: ReactNode;
    cardStyleContent?: StyleProp<ViewStyle> | object;
    cardStyleContainer?: StyleProp<ViewStyle> | object;
    extendChild?: ReactNode
    extendImgUrl?: string;
    extendHeaderChild?: ReactNode,
    isHorizontal?: boolean,
    onPress?: () => void,
}

const ListViewComponent: React.FC<ListViewProps> = ({ data, child, cardStyleContent, cardStyleContainer, extendChild, extendImgUrl, extendHeaderChild, isHorizontal = false, onPress }) => {
    const styleContent = {
        ...(cardStyleContent as object),
    };

    const styleContainer = {
        ...(cardStyleContainer as object),
    };

    

    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const handleImageLoad = (event: any) => {
        const { width, height } = event.nativeEvent.source;
        setImageDimensions({ width, height });
    };

    const renderRow = ({ item }: { item: ListItem }) => (
        <View>
            {extendHeaderChild && (
                <View>
                    {extendHeaderChild}
                </View>
            )}
            <View style={[ListViewStylesComponent.cardRow, cardStyleContainer]}>
                <Card style={[ListViewStylesComponent.container, cardStyleContainer]} onPress={onPress}>
                    {extendImgUrl ? (
                        <View style={{ width: imageDimensions.width, height: height * 0.7 }}>
                            <Image
                                source={{ uri: extendImgUrl }}
                                style={{ width: width, height: '100%' }}
                                onLoad={handleImageLoad}
                            />
                        </View>
                    ) : (

                        <View>
                            <Image source={typeof (item.imgUrl) === 'string' ? { uri: item.imgUrl } : item.imgUrl} style={[ListViewStylesComponent.image, cardStyleContent]} />
                            {item.title && (
                                <Text style={ListViewStylesComponent.header}>{item.title}</Text>
                            )}
                            {item.description && (
                                <Text style={ListViewStylesComponent.body}>{item.description}</Text>
                            )}
                            {child}
                        </View>
                    )}
                </Card>
            </View>
            {extendChild && (
                <View>
                    {extendChild}
                </View>
            )}
        </View>

    );

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderRow}
                numColumns={isHorizontal ? 1 : 2}
                horizontal={isHorizontal}
            />
        </View>
    );
};


export default ListViewComponent;
