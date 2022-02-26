import { NavLink } from "react-router-dom";

export default function FormAdd({
  handleSubmit,
  categories,
  attributes,
  typeForm,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className={
        typeForm ? "mt-4 mx-2 p-3" : "mt-4 mx-auto p-5 border md:w-3/5 w-4/5"
      }
    >
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={attributes.concept}
          name="concept"
          placeholder=" "
          onChange={(e) => attributes.setConcept(e.target.value)}
          required="required"
        />
        <label
          htmlFor="floating_email"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Concept
        </label>
      </div>

      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="number"
            value={attributes.amount}
            name="amount"
            id="amount"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => attributes.setAmount(e.target.value)}
            required="required"
          />
          <label
            htmlFor="amount"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Amount
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="date"
            value={attributes.date}
            name="date"
            id="date"
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => attributes.setDate(e.target.value)}
            required="required"
          />
          <label
            htmlFor="date"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Date
          </label>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 xl:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          {typeForm && (
            <select
              name={attributes.type}
              value={attributes.type}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => attributes.setType(e.target.value)}
              required="required"
            >
              <option value="EXIT">Exit</option>
              <option value="ENTRY">Entry</option>
            </select>
          )}
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <select
            name={attributes.categoryId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>
      </div>

      <div className="flex">
        <button
          className="text-center text-sm block border border-blue-500 rounded py-2 px-2 bg-blue-500 hover:bg-blue-700 text-white"
          type="submit"
        >
          {typeForm ? "Add Operation" : "Update"}
        </button>
        {!typeForm && (
          <NavLink to="/home">
            <button className="text-center text-sm block ml-3 border border-red-500 rounded py-2 px-2 bg-red-500 hover:bg-red-700 text-white">
              Cancel
            </button>
          </NavLink>
        )}
      </div>
    </form>
  );
}
