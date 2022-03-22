import React, { Key } from "react";
import "./Common.css";

import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import axios from "axios";

//components
import Result from "./Result";

// Plan型を定義し、Resultコンポーネントでも使えるようエクスポート
export type Plan = {
  plan_id: Key;
  image_url: string;
  course_name: string;
  duration: string;
  price: string;
  evaluation: string;
  prefecture: string;
  plan_name: string;
  caption: string;
  reserve_url_pc: string;
};

const Home = () => {
  const Today = new Date();
  const [date, setDate] = React.useState<Date>(Today);
  const [budget, setBudget] = React.useState<number>(8000);
  const [departure, setDeparture] = React.useState<number>(1);
  const [duration, setDuration] = React.useState<number>(60);
  const [plans, setPlans] = React.useState<Plan[]>([]); // Planの後の[]はなに？
  const [plansCount, setPlansCount] = React.useState<number | undefined>(undefined);
  registerLocale("ja", ja);

  // formタグでbuttonをクリックするとデフォルトでonSubmitイベントが走る
  // event.preventDefaultでonSubmitイベントをキャンセルしている
  const onFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const url =
      "https://l1kwik11ne.execute-api.ap-northeast-1.amazonaws.com/production/golf-courses";
    const response = await axios.get(url, {
      params: {
        date: addDays(date, 14),
        budget: budget,
        departure: departure,
        duration: duration,
      },
    });
    setPlans(response.data.plans);
    setPlansCount(response.data.count); // plansCountとなっていたが、countではないか？
    console.log(response.data.count); // #デバッグ用
    console.log(date, budget, departure, duration); // #デバッグ用
    console.log(response); // #デバッグ用
  };

  return (
    <div className='ui container' id='container'>
      <div className='Search__Form'>
        <form className='ui form segment' onSubmit={onFormSubmit}>
          <div className='field'>
            <label>
              <i className='calendar alternate outline icon'></i>プレー日
            </label>
            <DatePicker
              dateFormat='yyyy/MM/dd'
              locale='ja'
              selected={date}
              onChange={(selectedDate) => {
                setDate(selectedDate || Today);
              }}
              minDate={Today}
            />
          </div>

          <div className='field'>
            <label>
              <i className='yen sign icon'></i>上限金額
            </label>
            <select
              className='ui dropdown'
              name='dropdown'
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))} // e.target.valueはStringでくるためNumberに変換
            >
              <option value='8000'>8,000円</option>
              <option value='12000'>12,000円</option>
              <option value='16000'>16,000円</option>
            </select>
          </div>

          <div className='field'>
            <label>
              <i className='map pin icon'></i>
              移動時間計算の出発地点（自宅から近い地点をお選びください）
            </label>
            <select
              className='ui dropdown'
              name='dropdown'
              value={departure}
              onChange={(e) => setDeparture(Number(e.target.value))}
            >
              <option value='1'>東京駅</option>
              <option value='2'>横浜駅</option>
            </select>
          </div>

          <div className='field'>
            <label>
              <i className='car icon'></i>車での移動時間の上限
            </label>
            <select
              className='ui dropdown'
              name='dropdown'
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value='60'>60分</option>
              <option value='90'>90分</option>
              <option value='120'>120分</option>
            </select>
          </div>

          <div className='Search__Button'>
            <button type='submit' className='Search__Button__Design'>
              <i className='search icon'></i>ゴルフ場を検索する
            </button>
          </div>
        </form>
        <Result plans={plans} plansCount={plansCount} />
      </div>
    </div>
  );
};

export default Home;
