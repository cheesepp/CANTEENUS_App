import * as React from 'react';
import BillButton from '../BillButton';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function DetailScreen({ navigation, route }) {
    navigation.setOptions({
        title: 'Chi Tiết Hóa Đơn',
        headerStyle: { 
          backgroundColor: '#4554DC' 
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left', 
      });
    const { bill } = route.params
    // console.log(bill.item[0].bill_item.quantity)
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'column' , marginBottom: 20}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={{fontSize: 15, flex: 8}}>{item.name}</Text>
                <Text style={{fontSize: 15, marginLeft: 30, alignItems:'baseline', flex: 1}}>x{item.bill_item.quantity}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5}}>
                <Text style={{flex: 4}}>{item.price}</Text>
                <Text style={{flex: 1, marginLeft: 30}}>{item.price * item.bill_item.quantity}</Text>
            </View>
            
            {/* Add more views or components to display other properties of the item */}
        </View>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'top', flexDirection: 'column'}}>
            <View style={{ alignItems: 'center' }}>
                <BillButton bill={bill} onPress={{}} ></BillButton>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', alignItems: 'flex-start', paddingStart: 20 }}>Danh sách khẩu phần</Text>
            </View>

            <View style={{
                flex: 2,
                paddingTop: 35,
                paddingLeft: 30,
                paddingRight: 20,
                marginLeft: 5,
                marginTop: 20,
                marginBottom: 20,
                width: 400,
                height: 200,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 20
            }}  >
                <FlatList
                    data={bill.item}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>

            <View style={{ flexDirection: 'row', flex: 2, paddingLeft: 20, paddingRight: 20}}>
                <Text style={{flex: 4, fontSize: 20, fontWeight: 'bold', textDecorationLine:'underline'}}>Tổng cộng: </Text>
                <Text style={{flex: 2, fontSize: 20, fontWeight: 'bold'}}>{bill.totalPrice} VND</Text>
            </View>

        </View>
    );
}