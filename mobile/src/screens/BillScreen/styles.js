import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#4554DC',
        marginVertical: 5,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'top',
        alignItems: 'left',
        height: 100,
        width: 330,
    },
    textIdPrintDate: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 3, // Add spacing between text components
    },
    textPrice: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 5, // Add spacing between text components
    },
});