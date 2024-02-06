import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice/contactsSlice.js';
import css from './ItemContact.module.css';

export const ContactItem = ({ id, name, number}) => {

const dispatch = useDispatch()

const handleDeleteContact = id => {
  const actions = deleteContact(id);
  dispatch(actions);
};

  return (
    <li className={css.contactItem} key={id} id={id}>
      <p className={css.contactName}>
        {name}: {number}
      </p>
      <button
        className={css.buttonDeleteNumber}
        type="button"
        onClick={() => handleDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};
