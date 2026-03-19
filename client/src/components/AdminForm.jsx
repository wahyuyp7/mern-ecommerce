const AdminForm = ({ onSubmit, submitText, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl bg-white rounded-xl shadow p-6 space-y-4"
    >
      {children}
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
      >
        {submitText}
      </button>
    </form>
  );
};

export default AdminForm;
