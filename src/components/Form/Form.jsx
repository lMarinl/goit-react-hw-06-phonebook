import css from './Form.module.css';

export const Form = ({ handlerAddContact }) => {
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
