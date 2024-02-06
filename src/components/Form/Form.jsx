import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { selectedContacts } from '../../redux/contactsSlice/contactsSelectors.js';
import { addContact } from '../../redux/contactsSlice/contactsSlice.js';

import css from './Form.module.css';

export const Form = ( ) => {

  const dispatch = useDispatch();
  const contacts  = useSelector(selectedContacts);

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

  const handelSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.number.value;

    const formData = {
      name,
      number,
    };
    handlerAddContact(formData);
    event.currentTarget.reset();

  };

  return (
    <form className={css.form} onSubmit={handelSubmit}>
      <label className={css.label}>
        <span className={css.spanLabel}>Name</span>
        <input className={css.formInput} type="text" name="name" required />
      </label>
      <label className={css.label}>
        <span className={css.spanLabel}>Number</span>
        <input className={css.formInput} type="tel" name="number" required />
      </label>
      <button className={css.buttonSubmit} type="submit">
        Add number{' '}
      </button>
    </form>
  );
};
