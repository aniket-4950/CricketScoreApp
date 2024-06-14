import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions , TouchableOpacity, RefreshControl, Modal, Button , StatusBar, Image, ImageBackground} from 'react-native';
import axios from 'axios';





const LiveScores = ({onLogout}) => {
  const [matches, setMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scorecard, setScorecard] = useState(null);

  const fetchScores = async () => {
    try {
      const response = await axios.get('https://api.cricapi.com/v1/cricScore', {
        params: {
          apikey: 'f16b935c-65b7-46b3-88bf-8427830c835a'
        },
      });
      console.log('API Response:', response.data); 
      if (response.data && response.data.data && response.data.data.length > 0) {
        setMatches(response.data.data); 
      } else {
        console.error('Error fetching live scores: Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching live scores:', error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchScores();
    setRefreshing(false);
  };

  const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;
console.log(windowHeight)
console.log(windowWidth)

  const handleMatchPress = async (match) => {
    setSelectedMatch(match);
      const response = await axios.get('https://api.cricapi.com/v1/match_scorecard?apikey=4d5f9744-0ddf-4b71-a8f6-b360877cedcf&id=08f7acf8-7266-4c4a-a64c-12e77f65fedc' , {
        params: {
          apikey: 'f16b935c-65b7-46b3-88bf-8427830c835a',
          unique_id: match.id 
        },
    });
    setModalVisible(true);
  }

  
  

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    
    <View style={[styles.container , {width: windowWidth > 1000 ? 1280 : "100%"}]}>
      <Text style={styles.title}>Live Cricket Scores</Text>
      <Button title="Logout" style = {{borderColor : 'grey' , borderWidth : 3}} onPress={onLogout}/>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {matches.map((match) => (
          <TouchableOpacity 
            key={match.id} 
            style={[styles.matchContainer , {width: windowWidth > 600 ? 700 : "100%"}]}
            onPress={() => handleMatchPress(match)}
          >
            
            
            <Text style = {styles.firstLine}>{match.matchType} : {match.series}</Text>


            <Text style={styles.teams}>
              <Image source = {{uri : match.t1img}} style = {{height : 40 , width : 40}}/>  
               {match.t1}    {match.t1s}
            </Text>

            <Text style={styles.teams}>
              <Image source = {{uri : match.t2img}} style = {{height : 40 , width : 40}}/>  
               {match.t2}    {match.t2s}
            </Text>


            <Text style={styles.matchStatus}>{match.status}</Text>
            
          </TouchableOpacity>
        ))}
        
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedMatch?.name}</Text>
            <Text style={styles.modalText}>{selectedMatch?.status}</Text>

            {scorecard ? (
              scorecard.innings.map((inning, index) => (
                <View key={index}>
                  <Text style={styles.modalText}>{inning.bATTING_team}</Text>
                  <Text style={styles.modalText}>{inning.score}</Text>
                  <Text style={styles.modalText}>{inning.fOW}</Text>
                  <Text style={styles.modalText}>{inning.bATTING_desc}</Text>
                  <Text style={styles.modalText}>{inning.bOWLING_desc}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.modalText}>Oops! No detailed scorecard available</Text>
            )}

            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#b8bbc6",
    paddingTop : StatusBar.currentHeight + 10,
    width : "100%",
    height : "100"
  },
  firstLine : {
    color : "#a4a6b0",
  },
  teams : {
    color : "white",
    fontWeight : "bold",
    paddingBottom : 10,
    paddingTop : 10,
    letterSpacing : 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color : "white",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchContainer: {
    
    paddingVertical: 15,
    paddingHorizontal: 25,
    paddingBottom : 15,
    paddingTop : 30,
    marginBottom: 30,
    marginTop : 20,
    borderWidth: 3,
    borderColor: 'cyan',
    borderRadius: 10,
    backgroundColor: '#231f20',
    shadowColor: 'pink',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 5,
  },
  matchStatus: {
    fontSize: 16,
    fontStyle: 'italic',
    color : "#a4a6b0",
    paddingTop : 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#b8bbc6',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontStyle : "italic",
    fontSize : 15,
    fontWeight : 'bold'
  },
  logout : {
    borderWidth : 3,
    borderColor : "cyan"
  }
});

export default LiveScores;
