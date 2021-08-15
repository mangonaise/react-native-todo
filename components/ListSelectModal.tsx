import React from 'react';
import AppContext from '../react-helpers/appContext';
import ModalsContext from '../react-helpers/modalsContext';
import Modal from 'react-native-modal';
import List, { listColors } from '../logic/list';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';


const ListSelectModal = () => {
  const app = useContext(AppContext);
  const modalsHandler = useContext(ModalsContext);

  function hide() {
    modalsHandler.setShowListsModal(false);
  }

  function handleSelectList(list: List) {
    hide();
    app.setActiveList(list);
  }

  function handleEditList(list: List) {
    modalsHandler.setListBeingEdited(list);
    hide();
  }

  return (
    <Modal
      isVisible={modalsHandler.showListsModal}
      onDismiss={hide}
      onBackdropPress={hide}
      onSwipeComplete={hide}
      swipeDirection="down"
      swipeThreshold={50}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn="fadeInUp"
      animationOut='fadeOutDown'
      style={styles.modal}>
      <View style={styles.container}>
        {app.lists.map((list, index) => (
          <View key={index} style={styles.row}>
            <TouchableOpacity
              style={styles.selectListButton}
              onPress={() => handleSelectList(list)}
              activeOpacity={0.3}>
              <FontAwesomeIcon icon={faCircle} color={listColors[list.colorId]} />
              <Text style={styles.listName}>{list.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editListButton}
              onPress={() => handleEditList(list)}>
              <FontAwesomeIcon icon={faEllipsisH} color="#8a8a8a" />
            </TouchableOpacity>
          </View>
        ))}
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <TouchableOpacity
            onPress={() => handleEditList(new List(''))}
            style={styles.createListButton}
            activeOpacity={0.3}>
            <FontAwesomeIcon icon={faPlus} color="#4c9acf" />
            <Text style={styles.createListText}>
              Create new list
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    width: '100%',
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectListButton: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1
  },
  listName: {
    marginLeft: 15
  },
  editListButton: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  createListButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createListText: {
    color: '#4c9acf',
    marginLeft: 10,
    fontWeight: '700'
  }
});

export default observer(ListSelectModal);