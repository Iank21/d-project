export default function CommonPoint({stress, overworking, burnout}: any) {

  let index = 'Значение не определено';

  if(stress > 0 && stress < 101 && overworking < 21 && burnout < 0.45) {
    index = 'Стабильное состояние'
  } else if(stress > 155 && stress < 201 && overworking > 40 && burnout > 0.65) {
    index = 'Выраженное напряжение'
  } else if(stress > 100 && stress < 156 && burnout){
    index = 'Умеренное напряжение'
  }

  return (
    <div className="text-base">
      <b>Общая оценка: </b><span className="text-red-700">{index === 'Выраженное напряжение' ? 'Выраженное напряжение' : ''}</span>
      <span className="text-orange-500">{index === 'Умеренное напряжение' ? 'Умеренное напряжение' : ''}</span>
      <span className="text-green-600">{index === 'Стабильное состояние' ? 'Стабильное состояние' : ''}</span>
      <span>{index === 'Значение не определено' ? 'Значение не определено' : ''}</span>
    </div>
  );
}