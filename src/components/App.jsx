import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import css from './App.module.css';

import { Form } from './Form/Form';
import { ContactsList } from './ListContacts/ListContacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleChangeFilter = event => {
    const value = event.target.value;
    setFilter(value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  const handleDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.phoneBookContainer}>
      <h1 className={css.phoneBookTitle}>Phone book</h1>
      <Form handlerAddContact={handlerAddContact} />
      <div className={css.contactsContainer}>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter filter={filter} handleChangeFilter={handleChangeFilter} />

        <ContactsList
          contacts={filterContacts()}
          handleDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
