import { Link } from "react-router-dom";

export default function Operation({
  id,
  categoryId,
  concept,
  amount,
  date,
  type,
  handleRemove,
  categories,
}) {
  const dateFormat = date.split("T", 1)[0];
  const category = categories.find((category) => category.id === categoryId);
  let typeClass =
    type === "ENTRY"
      ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
      : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800";

  return (
    <tr className="hover:bg-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">{id}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{concept}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {category.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {dateFormat}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={typeClass}>{type}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex ">
          <Link to={"/details/" + id}>
            <button className="border border-teal-600 text-white rounded bg-teal-600 font-medium p-1 mx-2">
              Modificar
            </button>
          </Link>
          <button
            className="border border-red-600 text-white rounded bg-red-600 font-medium p-1"
            onClick={(e) => handleRemove(id, e)}
          >
            Borrar
          </button>
        </div>
      </td>
    </tr>
  );
}
