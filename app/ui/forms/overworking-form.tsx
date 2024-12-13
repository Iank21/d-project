import { OverWorking } from "@/app/features/actions/overworksubmit";

export default function OverworkingForm() {
  return (
    <form action={OverWorking} className={"max-w-sm"}>
      <div className="mb-5">
        <label htmlFor="hours" className="block mb-2 text-sm font-medium text-gray-900">Часы</label>
        <input name="hours" type="number" id="hours" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <div className="mb-5">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">День</label>
        <input name="date" type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Отправить</button>
    </form>
    );
}