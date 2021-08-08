import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import AppContext from '../logic/appContext';
import List from '../logic/list';

interface Props {
  isOpen: boolean,
  onEditList: (list: List) => void,
  onClose: () => void
}

const ListSelectModal = ({ isOpen, onEditList, onClose }: Props) => {
  const app = useContext(AppContext);
  const modalRef = useRef<Modalize>(null);

  function handleSelectList(list: List) {
    app.setActiveList(list);
    closeModal();
  }

  function closeModal() {
    modalRef.current?.close();
  }

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.open();
    }
  }, [isOpen])

  return (
    <Modalize onClose={onClose} ref={modalRef} adjustToContentHeight>
      <View style={styles.container}>
        {app.lists.map((list, index) => (
          <View key={index} style={styles.row}>
            <TouchableOpacity
              style={styles.selectListButton}
              onPress={() => handleSelectList(list)}
              activeOpacity={0.6}>
              <Text>{list.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Modalize>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#d9d9d9'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectListButton: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexGrow: 1
  }
});

export default ListSelectModal;