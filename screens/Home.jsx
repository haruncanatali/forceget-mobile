import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const itemsPerPage = 3;
  const [totalPages, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offers, setOffers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigator = useNavigation()

  useEffect(() => {
    fetchData();
  }, [ currentPage,]);

  async function fetchData() {
    setRefreshing(true);
    try {
        axios.get(API_URL + `/Offers?page=${currentPage}&pageSize=${itemsPerPage}`)
        .then((response) => {
            setTotalpages(response.data.data.total / itemsPerPage);
            let data = response.data.data.offers;
            setOffers(data);
            setTotalpages(response.data.data.pageCount)
            setRefreshing(false);
        })
      
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  }

  const handlePageClick = (p) => setCurrentPage(p);

  const renderItem = (offer) => {
    return (
        <DataTable.Row>
            <DataTable.Cell>{offer.item.modeType}</DataTable.Cell>
            <DataTable.Cell>{offer.item.currencyType}</DataTable.Cell>
            <DataTable.Cell>{offer.item.country}</DataTable.Cell>
            <DataTable.Cell>{offer.item.city}</DataTable.Cell>
            <DataTable.Cell>
                <TouchableOpacity onPress={() => {
                    navigator.navigate('detailPage', {offer:offer.item})
                }}>
                    <Text style={styles.infoBtn}>Info</Text>
                </TouchableOpacity>
            </DataTable.Cell>
        </DataTable.Row>
    )
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleEmpty = () => {
    return <Text> No offers!</Text>;
  };

  const renderPaginationButtons = () => {
    const maxButtonsToShow = Infinity;
    let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(0, endPage - maxButtonsToShow + 1);
    }

    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageClick(i)}
          style={[
            styles.paginationButton,
            i === currentPage ? styles.activeButton : null,
          ]}>
          <Text style={{color: 'white'}}>{i}</Text>
        </TouchableOpacity>,
      );
    }

    return buttons;
  };

  return (
    <SafeAreaView style={styles.container}>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Mode Type</DataTable.Title>
                <DataTable.Title>Currency</DataTable.Title>
                <DataTable.Title>Country</DataTable.Title>
                <DataTable.Title>City</DataTable.Title>
                <DataTable.Title>
                <TouchableOpacity style={{ borderRadius:6, height:25}} onPress={() => {
                        navigator.navigate('createPage')
                      }}>
                        <Text style={{color:'green'}}>Create</Text>
                      </TouchableOpacity>
                </DataTable.Title>
            </DataTable.Header>
            
            <FlatList
                data={offers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={handleEmpty}
                windowSize={10}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
        </DataTable>  
      
      <View style={styles.paginationContainer}>
        {renderPaginationButtons()}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'gray',
  },
  activeButton: {
    backgroundColor: '#22c55d',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
  },
  infoBtn: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});