export default function FormAdd({
  handleSubmit,
  categories,
  attributes,
  typeForm,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={attributes.concept}
        name="concept"
        placeholder="Concept"
        onChange={(e) => attributes.setConcept(e.target.value)}
        required="required"
      />
      <input
        type="number"
        value={attributes.amount}
        name="amount"
        placeholder="Amount"
        onChange={(e) => attributes.setAmount(e.target.value)}
        required="required"
      />
      <input
        type="date"
        value={attributes.date}
        name="date"
        onChange={(e) => attributes.setDate(e.target.value)}
        required="required"
      />

      {typeForm ? (
        <select
          name={attributes.type}
          value={attributes.type}
          onChange={(e) => attributes.setType(e.target.value)}
          required="required"
        >
          <option value="EXIT">Exit</option>
          <option value="ENTRY">Entry</option>
        </select>
      ) : (
        ""
      )}

      <select
        name={attributes.categoryId}
        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        defaultValue="Choose option"
        value={attributes.categoryId}
        onChange={(e) => attributes.setCategoryId(e.target.value)}
        required="required"
      >
        <option hidden>Choose option</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button
        className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
        type="submit"
      >
        {typeForm ? "Add Operation" : "Update"}
      </button>
    </form>
  );
}
