import UseMenu from '../context/MenuProvider';
import { handleEventSelect } from '../utils/handleEventSelect';

const EventSelect = () => {
   const { event, setEvent, setMenuStage, setIngredients } = UseMenu();
  
    return (
      <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl shadow-sm">
        <label className="text-sm font-medium text-gray-700">
          作成したいケーキのイベントを指定してください。
        </label>
  
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="例：誕生日、お正月、入学式"
          className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <button
          onClick={() =>
            handleEventSelect({ setMenuStage, event, setIngredients })
          }
        >
          決定
        </button>
      </div>
    );
  };

export default EventSelect
