import "./Common.css";
import { Plan } from "./Home";

type Props = {
  plans: Plan[];
  plansCount: number | undefined;
};

const Result: React.FC<Props> = ({ plans, plansCount }) => {
  // 検索結果が０件の場合、アラートを表示
  if (plansCount === 0) {
    return (
      <div className='wrapper'>
        <div className='ui orange message'>
          <div className='header'>
            ゴルフ場が見つかりませんでした。条件を変更して再度検索してください。
          </div>
        </div>
      </div>
    );
  }
  // Resultコンポーネントは配列を受け取って、繰り返し処理で要素ごとHTMLを返す
  // React.FCってどんな型？インターフェースで定義？
  // plansの例: plans[{caption: "", course_name: "", …}, …]
  const result = plans.map((plan: Plan) => {
    // mapで配列を返す
    return (
      <div className='item' key={plan.plan_id}>
        <div className='image'>
          <img src={plan.image_url} alt={plan.course_name} />
        </div>

        <div className='content'>
          <div className='meta'>
            <span className='cinema'>{plan.course_name}</span>
            <div className='ui mini statistics'>
              <div className='statistic'>
                <div className='value'>
                  <i className='car icon'></i> {plan.duration + "分"}
                </div>
              </div>

              <div className='statistic'>
                <div className='value'>
                  <i className='yen sign icon'></i> {plan.price.toLocaleString()}
                </div>
              </div>

              <div className='statistic'>
                <div className='value'>
                  <i className='thumbs up outline icon'></i> {plan.evaluation}
                </div>
              </div>
            </div>
            <div className='ui star rating' data-rating='3'></div>
            <div className='extra'>
              <div className='ui label'>{plan.prefecture}</div>
              <div className='ui label'>{plan.plan_name}</div>
            </div>
          </div>

          <div className='description'>
            <p>{plan.caption}</p>
          </div>

          <div className='item-button'>
            <a href={plan.reserve_url_pc} target='_blank' rel='noopener noreferrer'>
              コースの予約はこちら
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <div>{result}</div>; // 最後に配列をdivタグで括ってエクスポート
};

export default Result;
