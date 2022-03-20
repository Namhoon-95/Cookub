import React, { useEffect, useState } from 'react';
import QRcode from 'qrcode.react'
import axios from 'axios';
import style from './BoardDetail.module.css';
import Cookies from 'universal-cookie';
import img from '../assets/img/testfood.jpg';
import{TiLockClosed,TiPuzzle, TiStarFullOutline, TiStopwatch, TiTag} from 'react-icons/ti';

function BoardDetail() {

  const[recipe, setRecipe] = useState([]);

  const cookie = new Cookies();
  const token = cookie.get('token'); 
  const imgUrl = "https://s3-bucket-react-file-upload-test-5jo.s3.us-east-2.amazonaws.com/upload/"

  useEffect(()=>{
    const id = window.sessionStorage.getItem("detail_recipeId")

    axios
    .get(`http://localhost:8080/mypage/recipe/${id}`,{headers:{
      Authorization : `${token}`
    }})
    .then((res)=>{
      console.log(res);
      console.log(res.data);
      setRecipe(res.data);
    })
  },[]);

  return (
    /* <QRcode id="myqr" value={"https://github.com/Namhoon-95"} 
            size={320} includeMargin={true} /> --> QR 코드 생성코드 */

  <div >
    <div className={style.container}>
      <div className={style.empty}/>
      <div className={style.container2}>
        {/* 제목 */}
        <h1 className={style.title}>
          {recipe.title==null?"제목이 없습니다.":recipe.title}
          </h1>
        <div className={style.step_top}>
          <div className={style.top_cont}>
            <div className={style.top_img}>
              <img className={style.img} src={imgUrl+recipe.foodImage} alt="testimg" title="testimg" />
            </div>
            <div className={style.top_discription}>
              {/* 난이도, 키포인트, 공개여부, 조리시간, 키워드 */}
              <ul className={style.disc_list}>
                <li className={style.disc_item}>
                  <div className={style.disc_icon}><TiStarFullOutline/></div>
                  <span className={style.disc_text}>키포인트</span>
                  <p className={style.disc_text2}>
                    {recipe.keypoint==null?"내용이 없습니다.":recipe.keypoint}
                  </p>
                </li>
                <li className={style.disc_item}>
                  <div className={style.disc_icon}><TiLockClosed/></div>
                  <span className={style.disc_text}>공개여부</span>
                  <span className={style.disc_text2}>
                    {recipe.isOpenable==null?
                    "내용이 없습니다.":
                    recipe.isOpenable===1?"공개":"비공개"}
                  </span>
                </li>
                <li className={style.disc_item}>
                  <div className={style.disc_icon}><TiPuzzle/></div>
                  <span className={style.disc_text}>난이도</span>
                  <span className={style.disc_text2}>
                    &nbsp;&nbsp;&nbsp;{recipe.level==null?"내용이 없습니다.":recipe.level}
                  </span>
                </li>
                <li className={style.disc_item}>
                  <div className={style.disc_icon}><TiStopwatch/></div>
                  <span className={style.disc_text}>조리시간</span>
                  <span className={style.disc_text2}>
                    {recipe.cookingTime==null?"내용이 없습니다.":recipe.cookingTime}&nbsp;분
                  </span>
                </li>
                <li className={style.disc_item}>
                  <div className={style.disc_icon}><TiTag/></div>
                  <span className={style.disc_text}>키워드</span>
                  <span className={style.disc_text2}>
                    {recipe.keywordList==null?'':recipe.keywordList.map((v)=>("#"+v.keywordName +"  "))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 아래 코드는 재료목록 코드 */}
        <div className={style.ingre_cont}>
          <div className={style.ingreTitle}>
            <b className={style.ingreT1}>재료</b>
            <span className={style.ingreT2}>ingredients</span>
          </div>
          <div className={style.ingreBox}>
            <ul className={style.ingreList}>
              { recipe.ingredients==null?''
                :recipe.ingredients.map((v)=>(
                  <li className={style.ingre}>{v.ingredientName}
                    <span className={style.gram}>{v.amount+"  g"}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        
        {/* 아래 코드는 조리법 목록 코드 */}
        <div className={style.step_cont}>
          <div className={style.step_title}>
            <b className={style.step_T1}>조리순서</b>
            <span className={style.step_T2}>steps</span>
          </div>
          {   recipe.ingredients==null?''
              :recipe.cookMethods.map((v)=>(
              <div className={style.step_list}>
                <span className={style.numbering}>{v.step}</span>
                <div className={style.step_text}>{v.description}</div>
                <div className={style.step_img}>
                  {v.picture?<img className={style.img} src={v.picture} alt="testimg" title="testimg" />
                  :null}
                  
                </div>
              </div>
            ))
          } 
        </div>
      </div>
      <div className={style.empty2}/>
    </div>
    
  </div>
    
  );
}

export default BoardDetail;