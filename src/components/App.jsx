import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { ContactsList, Form, Filter } from 'components';
import {
  addContact,
  deleteContact,
} from '../redux/contactsSlice/contactsSlice.js';
import css from './App.module.css';
import { useMemo } from 'react';
import { filterContacts } from '../redux/filterSlice/filterSlice.js';

export const App = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(store => store.contacts);
  const { filter } = useSelector(store => store.filter);

  const handlerAddContact = formData => {
    const hasDuplicates = contacts.some(
      contact => contact.name === formData.name
    );
    if (hasDuplicates) {
      Notiflix.Notify.warning(
        'A contact with this name is already added to your contacts'
      );
      return;
    }
    const newContact = { ...formData, id: nanoid() };
    const action = addContact(newContact);
    dispatch(action);
  };

  const handleChangeFilter = event => {
    const value = event.target.value;
    const action = filterContacts(value);
    dispatch(action);
  };

  //   const filteredContacts = useMemo(() => {
  //     return contacts?.filter(contact =>
  //       contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  //     );
  //   };
  // )

  const filteredContacts = useMemo(
    () =>
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase())
      ),
    [filter, contacts]
  );
  const handleDeleteContact = id => {
    const actions = deleteContact(id);
    dispatch(actions);
  };

  return (
    <div className={css.phoneBookContainer}>
      <h1 className={css.phoneBookTitle}>Phone book</h1>
      <Form handlerAddContact={handlerAddContact} />
      <div className={css.contactsContainer}>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter handleChangeFilter={handleChangeFilter} />

        <ContactsList
          contacts={filteredContacts}
          handleDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
